<script lang="ts">
	import Particle from '$lib/models/Particle';
	import { getRandomIntInclusive } from '$lib/utility/utils';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// color iterpolation endpoints
		const COLOR_FAR = { r: 142, g: 197, b: 255 };
		const COLOR_NEAR = { r: 20, g: 71, b: 230 };

		// prevents particles from disappearing
		const MIN_ALPHA = 80;

		const MIN_RADIUS = 2;
		const MAX_RADIUS = 3;
		const PARTICLES_AMOUNT = 250;

		// maximum distance in pixels between two particles for a connection to be drawn.
		// precomputed squared value to avoid Math.sqrt in the render loop
		const MAX_CONN_DIST = 100;
		const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

		// probability [0,1] that any two particles will have a connection between them.
		// applied once at initialization, not every frame.
		const CONNECTION_PROBABILITY = 0.2;

		const particles: Particle[] = [];

		// current position of the gravitational attractor (it follows the mouse)
		let attractorX = canvas.width / 2;
		let attractorY = canvas.height / 2;

		// stores a pending click impulse to be applied on the next frame.
		// null means no imput is pending
		let impulse: { x: number; y: number } | null = null;

		// drawing uses the pixel buffer, which is much faster than ctx.arc()
		let imageData = ctx.createImageData(canvas.width, canvas.height);
		let data = imageData.data;

		// initializes the particles
		for (let p = 0; p < PARTICLES_AMOUNT; p++) {
			const radius = getRandomIntInclusive(MIN_RADIUS, MAX_RADIUS);
			const x = getRandomIntInclusive(0, canvas.width);
			const y = getRandomIntInclusive(0, canvas.height);
			particles.push(new Particle(x, y, radius, attractorX, attractorY));
		}

		// pre-compute which particle pairs are connected.
		// done once at init so the render loop only iterates over this fixed list
		// instead of checking all possible pairs
		const connections: [number, number][] = [];
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				if (Math.random() < CONNECTION_PROBABILITY) {
					connections.push([i, j]);
				}
			}
		}

		let animationId: number;

		const loop = () => {
			animationId = requestAnimationFrame(loop);

			// resets the pixel buffer to fully transparent every frame
			data.fill(0);

			for (const particle of particles) {
				particle.updatePosition(attractorX, attractorY, impulse?.x, impulse?.y);

				// t = 0 when particle is at MAX_RAND_DIST or beyond (light coloring)
				// t = 1 when particle is next to the attractor (dark coloring)
				const t =
					1 - Math.min(particle.distFromAttractor, Particle.MAX_RAND_DIST) / Particle.MAX_RAND_DIST;
				// interpolate alpha between distances
				const alpha = Math.floor(MIN_ALPHA + (255 - MIN_ALPHA) * t);
				const px = Math.round(particle.x);
				const py = Math.round(particle.y);
				const r = particle.radius;

				// rasterizes the circle by iterating over its bounding box
				for (let dy = -r; dy <= r; dy++) {
					for (let dx = -r; dx <= r; dx++) {
						const dist = Math.sqrt(dx * dx + dy * dy);
						// skips pixels outside the circle
						if (dist > r) continue;

						const x = px + dx;
						const y = py + dy;
						// skips pixels outside the canvas
						if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

						// anti-alising: smoothly fade the particles outermost pixels
						const edgeAlpha = dist > r - 1 ? 1 - (dist - (r - 1)) : 1;
						const i = (y * canvas.width + x) * 4;

						// interpolates the RGB color
						data[i] = Math.floor(COLOR_FAR.r + (COLOR_NEAR.r - COLOR_FAR.r) * t);
						data[i + 1] = Math.floor(COLOR_FAR.g + (COLOR_NEAR.g - COLOR_FAR.g) * t);
						data[i + 2] = Math.floor(COLOR_FAR.b + (COLOR_NEAR.b - COLOR_FAR.b) * t);
						data[i + 3] = Math.floor(alpha * edgeAlpha);
					}
				}
			}

			impulse = null;
			ctx.putImageData(imageData, 0, 0);

			// draws connections on top of the pixel buffer
			ctx.strokeStyle = 'rgba(20, 71, 230, 0.3)';
			ctx.lineWidth = 0.5;
			ctx.beginPath();

			for (const [i, j] of connections) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;

				// only draw if withing the range
				if (dx * dx + dy * dy > MAX_CONN_DIST_SQ) continue;

				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
			}

			ctx.stroke();
		};

		animationId = requestAnimationFrame(loop);

		// sets the attractor's coordinates
		const handleMouseMove = (e: MouseEvent) => {
			attractorX = e.clientX;
			attractorY = e.clientY;
		};

		// update internal canvas resolution to match the new window size
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			imageData = ctx.createImageData(canvas.width, canvas.height);
			data = imageData.data;
		};

		// store the click position as a pending impulse
		const handleClick = (e: MouseEvent) => {
			impulse = { x: e.clientX, y: e.clientY };
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);
		window.addEventListener('click', handleClick);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', handleClick);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed top-0 left-0 z-0 h-full w-full bg-slate-50"
></canvas>

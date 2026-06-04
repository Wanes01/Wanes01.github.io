<script lang="ts">
	import Particle from '$lib/models/Particle';
	import { theme } from '$lib/stores/themes.svelte';
	import { getRandomIntInclusive } from '$lib/utility/utils';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	// color iterpolation endpoints
	// uses different colors for light and dark mode
	let COLOR_FAR = $derived(!theme.dark ? { r: 242, g: 100, b: 25 } : { r: 245, g: 140, b: 80 });

	let COLOR_NEAR = $derived(!theme.dark ? { r: 0, g: 102, b: 204 } : { r: 77, g: 157, b: 224 });

	let EDGE_COLOR = $derived(
		!theme.dark ? { r: 20, g: 71, b: 230, a: 0.3 } : { r: 77, g: 157, b: 224, a: 0.38 }
	);

	onMount(() => {
		const dpr = window.devicePixelRatio || 1;
		const isOnMobile = window.innerWidth < 768;

		ctx = canvas.getContext('2d')!;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;

		ctx.scale(dpr, dpr);

		// prevents particles from disappearing
		const MIN_ALPHA = 80;

		const MIN_RADIUS = 2;
		const MAX_RADIUS = 3;

		// minimum and maximum orbit from attractor
		// values on mobile : values on desktop
		const MIN_ORBIT = isOnMobile ? 80 : 120;
		const MAX_ORBIT = isOnMobile ? 270 : 900;
		const PARTICLES_AMOUNT = isOnMobile ? 75 : 200;

		// maximum distance in pixels between two particles for a connection to be drawn.
		// precomputed squared value to avoid Math.sqrt in the render loop
		const MAX_CONN_DIST = 100;
		const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

		// probability [0,1] that any two particles will have a connection between them.
		// applied once at initialization, not every frame.
		const CONNECTION_PROBABILITY = isOnMobile ? 0.25 : 0.4;

		// cursor attraction pulse rings amount
		const RINGS = 3;
		const PULSE_SPEED = 0.007;
		const PULSE_RADIUS_FACTOR = 30;

		// how many times the draw function is invoked per frame
		const BUCKET_COUNT = 16;

		const particles: Particle[] = [];

		// current position of the gravitational attractor (it follows the mouse)
		let attractorX = window.innerWidth / 2;
		let attractorY = window.innerHeight / 2;

		// stores a pending click impulse to be applied on the next frame.
		// null means no imput is pending
		let impulse: { x: number; y: number } | null = null;

		// takes track of the current
		let pulseTime = 0;

		const distStep = (MAX_ORBIT - MIN_ORBIT) / PARTICLES_AMOUNT;
		// initializes the particles
		for (let p = 0; p < PARTICLES_AMOUNT; p++) {
			const radius = getRandomIntInclusive(MIN_RADIUS, MAX_RADIUS);
			const x = getRandomIntInclusive(0, canvas.width);
			const y = getRandomIntInclusive(0, canvas.height);
			// particles get spread at different orbits
			particles.push(new Particle(x, y, radius, attractorX, attractorY, MIN_ORBIT + p * distStep));
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

		// pre computers the color of each draw call
		const bucketColors: string[] = Array.from({ length: BUCKET_COUNT }, (_, b) => {
			const t = (b + 0.5) / BUCKET_COUNT;
			const alpha = (MIN_ALPHA / 255 + (1 - MIN_ALPHA / 255) * t).toFixed(3);
			const r = Math.floor(COLOR_FAR.r + (COLOR_NEAR.r - COLOR_FAR.r) * t);
			const g = Math.floor(COLOR_FAR.g + (COLOR_NEAR.g - COLOR_FAR.g) * t);
			const bv = Math.floor(COLOR_FAR.b + (COLOR_NEAR.b - COLOR_FAR.b) * t);
			return `rgba(${r},${g},${bv},${alpha})`;
		});

		const colorBuckets: Particle[][] = Array.from({ length: BUCKET_COUNT }, () => []);

		const loop = () => {
			animationId = requestAnimationFrame(loop);
			// clears the canvas for a new frame
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			// empties the color buckets without reallocating them
			for (const bucket of colorBuckets) bucket.length = 0;

			// position update andd bucket distribution
			for (const particle of particles) {
				particle.updatePosition(attractorX, attractorY, impulse?.x, impulse?.y);

				const t = 1 - Math.min(particle.distFromAttractor, MAX_ORBIT) / MAX_ORBIT;
				const bucketIdx = Math.min(Math.floor(t * BUCKET_COUNT), BUCKET_COUNT - 1);
				colorBuckets[bucketIdx].push(particle);
			}

			// max BUCKERT_COUNT draw calls for performance reason
			// (or manual rasterization)
			for (let b = 0; b < BUCKET_COUNT; b++) {
				if (colorBuckets[b].length === 0) continue;

				ctx.fillStyle = bucketColors[b];
				ctx.beginPath();

				for (const p of colorBuckets[b]) {
					ctx.moveTo(p.x + p.radius, p.y);
					ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				}

				ctx.fill();
			}

			impulse = null;

			ctx.strokeStyle = `rgba(${EDGE_COLOR.r}, ${EDGE_COLOR.g}, ${EDGE_COLOR.b}, ${EDGE_COLOR.a})`;
			ctx.lineWidth = 0.5;
			ctx.beginPath();

			// draws the precomputed connections
			for (const [i, j] of connections) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				if (dx * dx + dy * dy > MAX_CONN_DIST_SQ) continue;
				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
			}

			ctx.stroke();

			// pulse indicator, dekstop only
			if (!isOnMobile) {
				pulseTime = (pulseTime + PULSE_SPEED) % 1;

				for (let i = 0; i < RINGS; i++) {
					// every ring has a different phase
					const phase = (pulseTime + i / RINGS) % 1;

					const radius = (1 - phase) * PULSE_RADIUS_FACTOR;
					const alpha = phase * 0.4;

					ctx.beginPath();
					ctx.arc(attractorX, attractorY, radius, 0, Math.PI * 2);
					ctx.strokeStyle = `rgba(${COLOR_FAR.r}, ${COLOR_FAR.g}, ${COLOR_FAR.b}, ${alpha})`;
					ctx.lineWidth = 1;
					ctx.stroke();
				}

				// fixed central point
				ctx.beginPath();
				ctx.arc(attractorX, attractorY, 3, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${COLOR_FAR.r}, ${COLOR_FAR.g}, ${COLOR_FAR.b}, 0.8)`;
				ctx.fill();
			}
		};

		animationId = requestAnimationFrame(loop);

		// sets the attractor's coordinates
		const handleMouseMove = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// ignores clicks from the navbar or his children
			if (target.closest('nav') && isOnMobile) return;
			attractorX = e.clientX;
			attractorY = e.clientY;
		};

		// update internal canvas resolution to match the new window size
		let resizeTimeout: ReturnType<typeof setTimeout>;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const dpr = window.devicePixelRatio || 1;
				canvas.width = window.innerWidth * dpr;
				canvas.height = window.innerHeight * dpr;
				ctx.scale(dpr, dpr);
			}, 100);
		};

		// store the click position as a pending impulse
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// ignores clicks from the navbar or his children on mobile
			if (target.closest('nav') && isOnMobile) return;
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
	class="pointer-events-none fixed top-0 left-0 z-0 h-full w-full bg-slate-50 dark:bg-paper-dark"
></canvas>

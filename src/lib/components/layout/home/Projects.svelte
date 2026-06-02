<script lang="ts">
	import HomeSection from '../HomeSection.svelte';
	import laptopFrame from '$lib/imgs/misc/laptop_frame.png';
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';

	const NEXT_PROJECT_DELAY = 5000;
	let projectIndex = $state(0);
	let project = $derived(projects[projectIndex]);
	let container = $state<HTMLElement>();

	// alternatig images
	let imgA = $state<HTMLElement>();
	let imgB = $state<HTMLElement>();
	let imgAIndex = $state(0);
	let imgBIndex = $state(1);

	let infoEl = $state<HTMLElement>();

	let aIsTop = $state(true); // if A is on top of image B

	$effect(() => {
		const interval = setInterval(() => {
			const nextIndex = (projectIndex + 1) % projects.length;

			if (aIsTop) {
				// B enters, A leaves
				imgBIndex = nextIndex;
				if (imgB) animate(imgB, { opacity: [0, 1] }, { duration: 0.6, ease: 'easeInOut' });
				if (imgA) animate(imgA, { opacity: [1, 0] }, { duration: 0.6, ease: 'easeInOut' });
			} else {
				imgAIndex = nextIndex;
				if (imgA) animate(imgA, { opacity: [0, 1] }, { duration: 0.6, ease: 'easeInOut' });
				if (imgB) animate(imgB, { opacity: [1, 0] }, { duration: 0.6, ease: 'easeInOut' });
			}

			if (infoEl) {
				animate(infoEl, { opacity: 0, x: -20 }, { duration: 0.2, ease: 'easeIn' }).then(() => {
					projectIndex = nextIndex;
					animate(infoEl!, { opacity: [0, 1], x: [40, 0] }, { duration: 0.4, ease: 'easeOut' });
				});
			} else {
				projectIndex = nextIndex;
			}

			aIsTop = !aIsTop;
		}, NEXT_PROJECT_DELAY);

		return () => clearInterval(interval);
	});

	onMount(() => {
		if (!container) return;
		inView(
			container,
			() => {
				animate(
					container,
					{ opacity: [0, 1], y: [30, 0] },
					{ duration: 0.5, delay: 0.1, ease: 'easeOut' }
				);
			},
			{ amount: 0.3 }
		);
	});
</script>

<HomeSection title="Projects" titleId="projects">
	<div bind:this={container} class="flex flex-col items-center gap-8 opacity-0 lg:flex-row">
		<div class="relative w-full lg:basis-2/3">
			<div class="lg:overflow-visible">
				<img
					src={laptopFrame}
					alt=""
					class="block w-full origin-top scale-[1.25] md:scale-[1.1] lg:scale-100"
				/>
				<!-- laptop screen -->
				<a href={project.link || '#projects'}>
					<div class="screen-overlay absolute overflow-hidden bg-[#303030]">
						<!-- image A -->
						<img
							bind:this={imgA}
							src={`/screens/${projects[imgAIndex].img}.png`}
							alt={projects[imgAIndex].title}
							class="absolute w-full"
						/>
						<!-- image B (initially invisible) -->
						<img
							bind:this={imgB}
							src={`/screens/${projects[imgBIndex].img}.png`}
							alt={projects[imgBIndex].title}
							class="absolute inset-0 w-full opacity-0"
						/>
					</div>
				</a>
			</div>
		</div>

		<!-- project info -->
		<div class="info flex w-full cursor-default flex-col gap-6 bg-slate-50/60 lg:basis-1/3">
			<div bind:this={infoEl} class="flex min-h-110 flex-col gap-2 lg:min-h-0">
				<p class="font-fira text-sm text-slate-500 underline underline-offset-4">
					{String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
				</p>
				<h3 class="text-2xl font-bold text-carbon">{project.title}</h3>
				<p class="text-lg leading-relaxed">{project.desc}</p>
				<p class="font-fira text-sm text-slate-500">some of the skills used:</p>
				<ul class="flex flex-row flex-wrap gap-2">
					{#each project.skills as skill}
						<li class="rounded-xl bg-white p-1.5 shadow shadow-slate-200">
							<img src={`/skills/${skill.icon}.png`} alt={skill.name} class="h-8 lg:h-7" />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</HomeSection>

<style>
	/* laptop screen fit on mobile */
	.screen-overlay {
		top: 5%;
		left: -3.2%;
		width: 106.5%;
		height: 111%;
	}

	.info {
		margin-top: clamp(0px, 15vw, 5rem);
	}

	/* laptop screen fit on tablets */
	@media (min-width: 768px) and (max-width: 1023px) {
		.screen-overlay {
			top: 4.4%;
			left: 3.2%;
			width: 93.5%;
			height: 98%;
		}
	}

	/* laptop screen fit on desktop */
	@media (min-width: 1024px) {
		.screen-overlay {
			top: 4.1%;
			left: 7.5%;
			width: 85%;
			height: 89%;
		}

		.info {
			margin-top: 0;
		}
	}
</style>

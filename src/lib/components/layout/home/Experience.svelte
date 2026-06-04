<script lang="ts">
	import { experienceData } from '$lib/data/experience';
	import HomeSection from '../HomeSection.svelte';
	import { onMount } from 'svelte';
	import TimelineColumn from './TimelineColumn.svelte';
	import { animate, inView } from 'motion';
	import isDarkMode from '$lib/stores/themes.svelte';

	// referred to compute the blaze dot position
	let container = $state<HTMLElement>();

	// vertical position of the blaze dot in pixels for each timeline
	let blazeMobileY = $state(0);
	let mobileLine = $state<HTMLElement>();
	let mobileContainer = $state<HTMLElement>();

	// nodes visited by the blaze dot
	let activeMobileNodes = $state<Set<number>>(new Set());

	const mobileNodeEls: HTMLElement[] = [];

	function mobileNode(el: HTMLElement, i: number) {
		mobileNodeEls[i] = el;
	}

	onMount(() => {
		inView(
			mobileContainer,
			() => {
				animate(
					mobileContainer,
					{ opacity: [0, 1], y: [30, 0] },
					{ duration: 0.5, ease: 'easeOut' }
				);
			},
			{ amount: 0.3 }
		);

		let ticking = false;

		const onScroll = () => {
			// throttle: skip if a frame is already queued
			if (ticking) return;
			ticking = true;

			requestAnimationFrame(() => {
				if (!container) {
					ticking = false;
					return;
				}

				const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
				const rect = container.getBoundingClientRect();
				const viewportMid = viewportHeight / 2;
				const relY = viewportMid - rect.top;

				if (mobileLine) {
					const lineRect = mobileLine.getBoundingClientRect();
					const lineTop = lineRect.top - rect.top;
					blazeMobileY = Math.max(0, Math.min(lineRect.height, relY - lineTop));

					const absoluteBlazeY = lineRect.top + blazeMobileY;
					const next = new Set<number>();

					mobileNodeEls.forEach((el, i) => {
						if (!el) return;
						const nr = el.getBoundingClientRect();
						// activate node if its centre has been passed by the blaze dot
						if (nr.top + nr.height / 2 <= absoluteBlazeY) next.add(i);
					});

					activeMobileNodes = next;
				}

				ticking = false;
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<HomeSection
	title={experienceData.sectionTitle.toString()}
	titleId="experience"
	doodle={`/doodles${isDarkMode() ? '_dark' : ''}/exp.svg`}
>
	<div bind:this={container} class="w-full">
		<!-- desktop version (two distinct lines) -->
		<div class="hidden lg:grid lg:grid-cols-2 lg:gap-16">
			<TimelineColumn
				title={`[${experienceData.eduTitle}]`}
				items={experienceData.education}
				justifyEvenly
			/>
			<TimelineColumn
				title={`[${experienceData.workTitle}]`}
				items={experienceData.work}
				justifyEvenly
			/>
		</div>

		<!-- mobile -->
		<div bind:this={mobileContainer} class="flex flex-col opacity-0 lg:hidden">
			<div class="relative">
				<!-- single timeline with all the events -->
				<div
					bind:this={mobileLine}
					class="absolute top-0 left-1.75 h-full w-0.5 rounded-full bg-ocean/40 dark:bg-ocean-dark/60"
				></div>
				<!-- active part of the timeline -->
				<div
					class="absolute top-0 left-1.75 w-0.5 rounded-full bg-orange-300 transition-none dark:bg-orange-200"
					style="height: {blazeMobileY}px"
				></div>
				<!-- blaze pointer -->
				<div
					class="pointer-events-none absolute left-0.75 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blaze dark:bg-blaze-dark"
					style="top: {blazeMobileY}px"
				></div>

				{#each experienceData.allLifeEvents as item, i}
					{@const icon = `/icons${isDarkMode() ? '_dark' : ''}/${item.type === 'work' ? 'work' : 'study'}.svg`}
					<div class="relative flex flex-col gap-1 pb-10 pl-8">
						<div
							use:mobileNode={i}
							class="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 transition-colors duration-300 {activeMobileNodes.has(
								i
							)
								? 'border-blaze bg-orange-300 dark:border-blaze-dark dark:bg-orange-200'
								: 'border-slate-500 bg-slate-200 dark:border-slate-400 dark:bg-slate-100'}"
						></div>
						<p class="flex cursor-auto flex-col gap-1 bg-slate-50/70 dark:bg-paper-dark/70">
							<span class="flex items-center gap-1.5 font-fira text-ash dark:text-slate-400">
								<img src={icon} class="w-6" alt="" />
								{item.year}
							</span>
							<span class="text-base font-semibold text-carbon dark:text-paper">{item.title}</span>
							<span class="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
								>{@html item.desc.toString()}</span
							>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</HomeSection>

<script lang="ts">
	import HomeSection from '../HomeSection.svelte';
	import exp from '$lib/imgs/doodles/exp.svg';
	import { onMount } from 'svelte';
	import { education, work, allEvents } from '$lib/data/experience';
	import workIcon from '$lib/imgs/icons/work.svg';
	import educationIcon from '$lib/imgs/icons/study.svg';
	import TimelineColumn from './TimelineColumn.svelte';
	import { animate, inView } from 'motion';

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

<HomeSection title="Education & Experience" titleId="experience" doodle={exp}>
	<div bind:this={container} class="w-full">
		<!-- desktop version (two distinct lines) -->
		<div class="hidden lg:grid lg:grid-cols-2 lg:gap-16">
			<TimelineColumn title="[education]" items={education} justifyEvenly />
			<TimelineColumn title="[work]" items={work} justifyEvenly />
		</div>

		<!-- mobile -->
		<div bind:this={mobileContainer} class="flex flex-col opacity-0 lg:hidden">
			<div class="relative">
				<!-- single timeline with all the events -->
				<div
					bind:this={mobileLine}
					class="absolute top-0 left-1.75 h-full w-0.5 rounded-full bg-ocean/40"
				></div>
				<!-- active part of the timeline -->
				<div
					class="absolute top-0 left-1.75 w-0.5 rounded-full bg-orange-300 transition-none"
					style="height: {blazeMobileY}px"
				></div>
				<!-- blaze pointer -->
				<div
					class="pointer-events-none absolute left-0.75 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blaze"
					style="top: {blazeMobileY}px"
				></div>

				{#each allEvents as item, i}
					<div class="relative flex flex-col gap-1 pb-10 pl-8">
						<div
							use:mobileNode={i}
							class="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 transition-colors duration-300 {activeMobileNodes.has(
								i
							)
								? 'border-blaze bg-orange-300'
								: 'border-slate-500 bg-slate-200'}"
						></div>
						<p class="flex cursor-default flex-col gap-1 bg-slate-50/70">
							<span class="flex items-center gap-1.5 font-fira text-slate-500">
								<img src={item.type === 'work' ? workIcon : educationIcon} class="w-6" alt="" />
								{item.year}
							</span>
							<span class="text-base font-semibold text-carbon">{item.title}</span>
							<span class="text-sm leading-relaxed text-slate-600">{item.desc}</span>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</HomeSection>

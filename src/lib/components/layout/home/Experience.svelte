<script lang="ts">
	import HomeSection from '../HomeSection.svelte';
	import { onMount } from 'svelte';
	import { education, work, allEvents } from '$lib/data/experience';
	import TimelineColumn from './TimelineColumn.svelte';

	// referred to compute the blaze dot position
	let container = $state<HTMLElement>();

	// vertical position of the blaze dot in pixels for each timeline
	let blazeMobileY = $state(0);
	let mobileLine = $state<HTMLElement>();

	// nodes visited by the blaze dot
	let activeMobileNodes = $state<Set<number>>(new Set());

	const mobileNodeEls: HTMLElement[] = [];

	function mobileNode(el: HTMLElement, i: number) {
		mobileNodeEls[i] = el;
	}

	onMount(() => {
		// execute on every scroll
		const onScroll = () => {
			// waits for the container to exist...
			if (!container) return;
			const rect = container.getBoundingClientRect();
			// the activation point for the dots
			const viewportMid = window.innerHeight / 2;
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
					if (nr.top + nr.height / 2 <= absoluteBlazeY) next.add(i);
				});
				activeMobileNodes = next;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<HomeSection title="Education & Experience" titleId="experience">
	<div bind:this={container} class="w-full">
		<!-- desktop version (two distinct lines) -->
		<div class="hidden lg:grid lg:grid-cols-2 lg:gap-16">
			<TimelineColumn title="[education]" items={education} />
			<TimelineColumn title="[work]" items={work} justifyEvenly />
		</div>

		<!-- MOBILE -->
		<div class="flex flex-col lg:hidden">
			<div class="relative">
				<div
					bind:this={mobileLine}
					class="absolute top-0 left-1.75 h-full w-0.5 rounded-full bg-ocean/30"
				></div>
				<div
					class="pointer-events-none absolute left-0.75 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blaze"
					style="top: {blazeMobileY}px"
				></div>

				{#each allEvents as item, i}
					<div class="relative flex flex-col gap-1 pb-10 pl-8">
						<div
							use:mobileNode={i}
							class="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 transition-colors duration-300
                {activeMobileNodes.has(i) ? 'border-blaze bg-blaze/10' : 'border-ash bg-paper'}"
						></div>
						<span class="flex items-center gap-1.5 font-fira text-xs text-ash">
							{#if item.type === 'work'}
								<svg
									class="h-3 w-3 shrink-0"
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<rect x="2" y="5" width="12" height="9" rx="1.5" />
									<path d="M5 5V4a3 3 0 0 1 6 0v1" />
								</svg>
							{:else}
								<svg
									class="h-3 w-3 shrink-0"
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M8 2L2 6v8h4v-4h4v4h4V6z" />
								</svg>
							{/if}
							{item.year}
						</span>
						<span class="text-base font-semibold text-carbon">{item.title}</span>
						<span class="text-sm leading-relaxed text-ash">{item.desc}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</HomeSection>

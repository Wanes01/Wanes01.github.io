<script lang="ts">
	import { onMount } from 'svelte';
	import type { LifeEvent } from '$lib/data/experience';
	import { animate, inView } from 'motion';

	interface Props {
		title: string;
		items: LifeEvent[];
		justifyEvenly?: boolean;
	}

	let { title, items, justifyEvenly = false }: Props = $props();

	let container = $state<HTMLElement>();

	let blazeY = $state(0);
	let activeNodes = $state<Set<number>>(new Set());
	let line = $state<HTMLElement>();

	const nodeEls: HTMLElement[] = [];

	function registerNode(el: HTMLElement, i: number) {
		nodeEls[i] = el;
	}

	onMount(() => {
		let ticking = false;

		const onScroll = () => {
			if (ticking) return;
			ticking = true;

			requestAnimationFrame(() => {
				if (!line) {
					ticking = false;
					return;
				}

				// visualViewport è stabile su mobile (non cambia con le barre del browser)
				const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
				const lineRect = line.getBoundingClientRect();
				const viewportMid = viewportHeight / 2;
				const relativeY = viewportMid - lineRect.top;

				blazeY = Math.max(0, Math.min(lineRect.height, relativeY));

				const absoluteBlazeY = lineRect.top + blazeY;
				const next = new Set<number>();

				nodeEls.forEach((el, i) => {
					if (!el) return;
					const nr = el.getBoundingClientRect();
					if (nr.top + nr.height / 2 <= absoluteBlazeY) next.add(i);
				});

				activeNodes = next;
				ticking = false;
			});
		};

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

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div bind:this={container} class="flex h-full flex-col opacity-0">
	<p class="mb-6 font-fira text-lg text-slate-500 underline underline-offset-4">{title}</p>

	<div
		class="relative flex flex-1 flex-col gap-12 py-2 {justifyEvenly
			? 'justify-evenly'
			: 'justify-between'}"
	>
		<!-- timeline -->
		<div
			bind:this={line}
			class="absolute top-0 left-1.75 h-full w-0.5 rounded-full bg-ocean/40"
		></div>

		<!-- timeline surpassed by the pointer -->
		<div
			class="absolute top-0 left-1.75 w-0.5 rounded-full bg-orange-300 transition-none"
			style="height: {blazeY}px"
		></div>

		<!-- blaze pointer -->
		<div
			class="pointer-events-none absolute left-0.75 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blaze"
			style="top: {blazeY}px"
		></div>

		{#each items as item, i}
			<div class="relative flex flex-col gap-1 pl-8">
				<div
					use:registerNode={i}
					class="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 transition-colors duration-300 {activeNodes.has(
						i
					)
						? 'border-blaze bg-orange-300'
						: 'border-slate-500 bg-slate-200'}"
				></div>

				<p class="flex cursor-default flex-col gap-1 bg-slate-50/70">
					<span class="font-fira text-slate-500">{item.year}</span>
					<span class="text-base font-semibold text-carbon">{item.title}</span>
					<span class="text-sm leading-relaxed text-slate-600">{item.desc}</span>
				</p>
			</div>
		{/each}
	</div>
</div>

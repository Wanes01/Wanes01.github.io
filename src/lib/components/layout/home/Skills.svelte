<script lang="ts">
	import { skillSections } from '$lib/data/skills';
	import { onMount } from 'svelte';
	import HomeSection from '../HomeSection.svelte';
	import Terminal from './Terminal.svelte';
	import TerminalLine from './TerminalLine.svelte';
	import { animate, inView, stagger } from 'motion';

	let terminal = $state<HTMLElement>();
	let isMobile = $state(false);

	onMount(() => {
		const stopInView = inView(
			terminal,
			() => {
				// Animazione di ingresso del terminale
				animate(terminal, { opacity: [0, 1], y: [30, 0] }, { duration: 0.5, ease: 'easeOut' });

				if (terminal) {
					const typingElements = terminal.querySelectorAll('.typing-element');
					animate(
						typingElements,
						{
							opacity: [0, 1],
							clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)']
						},
						{
							delay: stagger(0.1, { startDelay: 0.5 }),
							duration: 0.2,
							ease: 'linear'
						}
					);
				}
			},
			{ amount: 0.3 }
		);

		const mediaQuery = window.matchMedia('(max-width: 1023px)');
		isMobile = mediaQuery.matches;

		const listener = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};

		mediaQuery.addEventListener('change', listener);
		return () => {
			stopInView();
			mediaQuery.removeEventListener('change', listener);
		};
	});
</script>

<HomeSection title="Skills" titleId="skills">
	<Terminal bind:htmlBind={terminal} title="~/skills : bash">
		{#each skillSections as section}
			<TerminalLine
				path="~/skills"
				command={`cat ${section.section}.txt`}
				host={isMobile ? '_' : 'desktop'}
			>
				<ul class="flex flex-col gap-1 lg:grid lg:grid-cols-2">
					{#each section.entries as skill}
						<li
							class="typing-element grid grid-cols-5 items-center overflow-hidden opacity-0 lg:grid-cols-12"
						>
							<p class="col-span-4 text-nowrap lg:col-span-6">=> {skill.name}</p>
							<img
								src={`/skills/${skill.icon}.png`}
								alt=""
								width="24"
								height="24"
								loading="lazy"
								decoding="async"
								class="w-6 [image-rendering:pixelated]"
							/>
						</li>
					{/each}
				</ul>
			</TerminalLine>
		{/each}
	</Terminal>
</HomeSection>

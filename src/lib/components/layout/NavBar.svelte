<script lang="ts">
	import { slide } from 'svelte/transition';
	import hamburger from '$lib/imgs/icons/hamburger.svg';
	import close from '$lib/imgs/icons/close.svg';

	const links = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];
	let menuOpen = $state(false);
	// checks if on mobile to handle background blur
	let isMobile = $state(false);

	$effect(() => {
		const mq = window.matchMedia('(max-width: 1024px)');
		isMobile = mq.matches;

		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (!isMobile) menuOpen = false;
		};

		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});
</script>

<nav class="sticky top-0 z-50 border-b border-slate-300 bg-slate-50/70 px-4 py-3 backdrop-blur-sm">
	<div class="flex flex-row items-center justify-end">
		<button class="lg:hidden" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
			<img
				src={menuOpen ? close : hamburger}
				alt=""
				class="h-5 cursor-pointer transition-all duration-200 {menuOpen ? 'rotate-90' : 'rotate-0'}"
			/>
		</button>
		<ul class="hidden flex-row gap-4 lg:flex">
			{#each links as link}
				<li>
					<a
						href={`#${link.toLowerCase()}`}
						class="text-carbon transition-colors duration-200 hover:text-blaze"
					>
						{link}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Menu mobile dentro la nav, si espande verso il basso -->
	{#if menuOpen}
		<ul transition:slide={{ duration: 200 }} class="flex flex-col gap-4 pt-4 pb-2 lg:hidden">
			{#each links as link}
				<li class="flex flex-row justify-center">
					<a
						href={`#${link.toLowerCase()}`}
						onclick={() => (menuOpen = false)}
						class="w-full text-center text-carbon transition-colors duration-200 hover:text-blaze"
					>
						{link}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

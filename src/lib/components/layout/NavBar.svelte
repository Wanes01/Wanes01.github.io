<script lang="ts">
	import hamburger from '$lib/imgs/icons/hamburger.svg';
	import close from '$lib/imgs/icons/close.svg';

	const links = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];

	// hamburger menu on mobile
	let menuOpen = $state(false);
</script>

<nav
	class="sticky top-0 z-50 flex flex-row items-center justify-end border-b border-slate-300 bg-slate-50/80 px-4 py-3 backdrop-blur-sm"
>
	<button class="lg:hidden" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
		<img
			src={menuOpen ? close : hamburger}
			alt=""
			class="h-5 cursor-pointer transition-all duration-200 {menuOpen ? 'rotate-90' : 'rotate-0'}"
		/>
	</button>

	<!-- Desktop -->
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

	<!-- Mobile -->
	{#if menuOpen}
		<ul
			class="absolute top-full right-0 flex w-full flex-col gap-4 border-b border-slate-300 bg-slate-50/90 p-6 backdrop-blur-sm"
		>
			{#each links as link}
				<li>
					<a
						href={`#${link.toLowerCase()}`}
						onclick={() => (menuOpen = false)}
						class="text-carbon transition-colors duration-200 hover:text-blaze"
					>
						{link}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

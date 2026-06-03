<script lang="ts">
	import { sections } from '$lib/data/navigation';
	import { slide } from 'svelte/transition';
	import hamburger from '$lib/imgs/icons/hamburger.svg';
	import close from '$lib/imgs/icons/close.svg';
	import moon from '$lib/imgs/icons/moon.svg';
	import sun from '$lib/imgs/icons/sun.svg';
	import { setLocale } from '$lib/i18n/locale.svelte';
	import Toggle from './Toggle.svelte';

	let menuOpen = $state(false);
</script>

<nav class="sticky top-0 z-50 border-b border-slate-300 bg-slate-50 px-4 py-3">
	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-row items-center gap-4">
			<Toggle
				type="icon"
				a={moon}
				b={sun}
				ariaLabel="Toggle theme"
				onToggle={(isDark) => document.documentElement.classList.toggle('dark', isDark)}
			/>

			<Toggle
				type="text"
				a="EN"
				b="IT"
				ariaLabel="Toggle language"
				onToggle={(isIt) => setLocale(isIt ? 'it' : 'en')}
			/>
		</div>

		<div class="flex flex-row items-center">
			<button class="lg:hidden" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
				<img
					src={menuOpen ? close : hamburger}
					alt=""
					class="h-5 cursor-pointer transition-all duration-200 {menuOpen
						? 'rotate-90'
						: 'rotate-0'}"
				/>
			</button>
			<ul class="hidden flex-row gap-4 lg:flex">
				{#each sections as section}
					<li>
						<a
							href={`#${section.id}`}
							class="text-carbon transition-colors duration-200 hover:text-blaze"
						>
							{section.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	{#if menuOpen}
		<ul
			transition:slide={{ duration: 200 }}
			class="absolute right-0 left-0 flex flex-col gap-4 border-b border-slate-300 bg-slate-50 px-4 pt-4 pb-2 lg:hidden"
		>
			{#each sections as section}
				<li class="flex flex-row justify-center">
					<a
						href={`#${section.id}`}
						onclick={() => (menuOpen = false)}
						class="w-full text-center text-carbon transition-colors duration-200 hover:text-blaze"
					>
						{section.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

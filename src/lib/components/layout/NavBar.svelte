<script lang="ts">
	import { toggleDarkMode } from '$lib/stores/themes.svelte';
	import { getThemeImgPath } from '$lib/utility/utils';
	import { sections, langToggle, themeToggle } from '$lib/data/navigation';
	import { slide } from 'svelte/transition';
	import { setLocale } from '$lib/i18n/locale.svelte';
	import Toggle from './Toggle.svelte';

	let menuOpen = $state(false);
</script>

<nav
	class="sticky top-0 z-50 border-b border-slate-300 bg-slate-50 px-4 py-3 text-carbon dark:border-slate-800 dark:bg-paper-dark dark:text-paper"
>
	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-row items-center gap-4">
			<!-- language toggle -->
			<div class="flex flex-row items-baseline gap-2">
				<p class="font-fira text-sm text-ash dark:text-ash-dark">{langToggle}</p>
				<Toggle ariaLabel="Toggle language" onToggle={(isIt) => setLocale(isIt ? 'it' : 'en')}>
					{#snippet a()}
						<p>en</p>
					{/snippet}
					{#snippet b()}
						<p>it</p>
					{/snippet}
				</Toggle>
			</div>
			<!-- theme toggle -->
			<dir class="flex flex-row items-baseline gap-2">
				<p class="font-fira text-sm text-ash dark:text-ash-dark">{themeToggle}</p>
				<Toggle
					ariaLabel="Toggle theme"
					onToggle={(dark) => {
						toggleDarkMode();
						document.documentElement.classList.toggle('dark', dark);
					}}
				>
					{#snippet a()}
						<div
							class="h-full w-full border border-slate-400 bg-linear-to-br from-slate-200 to-slate-400"
						>
							&nbsp;
						</div>
					{/snippet}
					{#snippet b()}
						<div
							class="h-full w-full border bg-linear-to-br dark:border-slate-600 dark:from-slate-700 dark:to-slate-900"
						>
							&nbsp;
						</div>
					{/snippet}
				</Toggle>
			</dir>
		</div>

		<div class="flex flex-row items-center">
			<button class="lg:hidden" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
				<img
					src={getThemeImgPath(`${menuOpen ? 'close' : 'hamburger'}.svg`, false)}
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
							class="text-carbon transition-colors duration-200 hover:text-blaze dark:text-paper hover:dark:text-blaze-dark"
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
			class="absolute right-0 left-0 flex flex-col gap-4 border-b border-slate-300 bg-slate-50 px-4 pt-5 pb-2 lg:hidden dark:border-slate-800 dark:bg-paper-dark"
		>
			{#each sections as section}
				<li class="flex flex-row justify-center">
					<a
						href={`#${section.id}`}
						onclick={() => (menuOpen = false)}
						class="w-full py-1 text-center text-carbon transition-colors duration-200 hover:text-blaze dark:text-paper dark:hover:text-blaze-dark"
					>
						{section.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

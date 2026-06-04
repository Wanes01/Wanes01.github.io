<script lang="ts">
	import isDarkMode from '$lib/stores/themes.svelte';
	import HomeSection from '../HomeSection.svelte';
	import { aboutItems, aboutTitle } from '$lib/data/about';
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';

	let descriptionsHtmlElements = $state<HTMLElement[]>([]);

	function registerItem(el: HTMLElement) {
		el.style.opacity = '0';
		descriptionsHtmlElements.push(el);
	}

	onMount(() => {
		descriptionsHtmlElements.forEach((item, i) => {
			inView(
				item,
				() => {
					animate(
						item,
						{ opacity: [0, 1], y: [30, 0] },
						{ duration: 0.5, delay: 0.1, ease: 'easeOut' }
					);
				},
				{ amount: 0.3 }
			);
		});
	});
</script>

<HomeSection
	title={aboutTitle.toString()}
	titleId="about"
	doodle={`/doodles${isDarkMode() ? '_dark' : ''}/about.svg`}
>
	<ul class="flex flex-col gap-y-10 text-[1.11rem] leading-relaxed lg:gap-y-5">
		{#each aboutItems as item, i}
			<li
				class="flex flex-col items-center justify-between gap-8 lg:flex-row {i % 2 == 1
					? 'items-center lg:flex-row-reverse'
					: ''}"
			>
				<p use:registerItem class="bg-slate-50/60 lg:w-1/2 dark:bg-paper-dark/60">
					{@html item.desc.toString()}
				</p>
				<div use:registerItem class="flex justify-center lg:w-1/2">
					<img
						src={`/doodles${isDarkMode() ? '_dark' : ''}/${item.img}.svg`}
						alt=""
						class={item.cls}
					/>
				</div>
			</li>
		{/each}
	</ul>
</HomeSection>

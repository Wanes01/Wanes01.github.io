<script lang="ts">
	import HomeSection from '../layout/HomeSection.svelte';
	import { getThemeImgPath, animateEaseOutOn } from '$lib/utility/utils';
	import { aboutItems, aboutTitle } from '$lib/data/about';
	import { onMount } from 'svelte';

	let descriptionsHtmlElements = $state<HTMLElement[]>([]);

	function registerItem(el: HTMLElement) {
		el.style.opacity = '0';
		descriptionsHtmlElements.push(el);
	}

	onMount(() => {
		animateEaseOutOn(...descriptionsHtmlElements);
	});
</script>

<HomeSection
	title={aboutTitle.toString()}
	titleId="about"
	doodle={getThemeImgPath('about.svg', true)}
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
					<img src={getThemeImgPath(`${item.img}.svg`, true)} alt="" class={item.cls} />
				</div>
			</li>
		{/each}
	</ul>
</HomeSection>

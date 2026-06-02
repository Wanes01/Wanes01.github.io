<script lang="ts">
	import HomeSection from '../HomeSection.svelte';
	import { descriptions } from '$lib/data/about';
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

<HomeSection title="About me" titleId="about">
	<ul class="flex flex-col gap-y-10 text-lg leading-relaxed">
		{#each descriptions as description, i}
			<li
				class="flex flex-col items-center justify-between gap-8 lg:flex-row {i % 2 == 1
					? 'items-center lg:flex-row-reverse'
					: ''}"
			>
				<p use:registerItem class="cursor-default bg-slate-50/60 lg:w-1/2">
					{@html description.desc}
				</p>
				<div use:registerItem class="flex justify-center lg:w-1/2">
					<img src={description.img} alt="" class={description.cls} />
				</div>
			</li>
		{/each}
	</ul>
</HomeSection>

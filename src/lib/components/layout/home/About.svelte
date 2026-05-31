<script lang="ts">
	import asterisk from '$lib/imgs/doodles/asterisk.svg';
	import laurel from '$lib/imgs/doodles/laurel.svg';
	import creating from '$lib/imgs/doodles/creating.svg';
	import world from '$lib/imgs/doodles/world.svg';
	import arch from '$lib/imgs/doodles/arch.svg';
	import freeTime from '$lib/imgs/doodles/free_time.svg';
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';

	const descriptions: { desc: string; img: string; cls: string }[] = [
		{
			desc: `My name is <span class="text-ocean font-bold">Emir Wanes Aouioua</span>. I'm 24, and I've just finished all my exams for my B.Sc. in
				Computer Science and Engineering. I'll defend my thesis in October and finally call it
				done.`,
			img: laurel,
			cls: 'lg:w-50 w-40'
		},
		{
			desc: `I've always been driven by a simple curiosity: understanding how things work, and then
				building something with that knowledge. Computer science turned out to be the perfect outlet
				for that. It's one of the few disciplines where you can start from nothing and end up with
				something that actually works, in an afternoon.`,
			img: creating,
			cls: 'lg:w-60 w-60'
		},
		{
			desc: `My thesis involves rebuilding the data layer of <a href="https://alchemistsimulator.github.io/" target="_blank" class="underline text-ocean hover:text-blaze">Alchemist</a>, an open source physical
				simulator developer at the University of Bologna, to support GeoTIFF and Copernicus EU datasets.
				It's a project I'm genuinely looking forward to.`,
			img: world,
			cls: 'lg:w-50 w-50'
		},
		{
			desc: `I don't really have a single area I focus on. Distributed systems, security,
				containerization, simulations... I find most of it interesting, and I like that the field is
				broad enough to never get boring.`,
			img: arch,
			cls: 'lg:w-90 w-90'
		},
		{
			desc: `Outside of code I game, read, watch series, work out, and follow way too many rabbit holes about
				science and tech.`,
			img: freeTime,
			cls: 'lg:w-50 w-50'
		}
	];

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

<section class="flex flex-col gap-5">
	<div class="flex flex-row items-center gap-2">
		<img src={asterisk} alt="" class="w-10" />
		<h2 id="about" class="cursor-default scroll-mt-16 text-3xl font-bold">About me</h2>
	</div>

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
</section>

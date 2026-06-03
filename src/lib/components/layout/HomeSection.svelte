<script lang="ts">
	import { animate, inView } from 'motion';

	interface Props {
		title: string;
		titleId: string;
		doodle?: string;
		children?: import('svelte').Snippet;
	}

	let { title, doodle, titleId, children }: Props = $props();

	const fadeInUp = (el: HTMLElement, delay = 0) => {
		el.style.opacity = '0';
		inView(
			el,
			() => {
				animate(el, { opacity: [0, 1], y: [30, 0] }, { duration: 0.5, delay, ease: 'easeOut' });
			},
			{ amount: 0.3 }
		);
	};
</script>

<section class="flex flex-col gap-5">
	<div class="my-5 flex flex-row items-center gap-3">
		<img use:fadeInUp={0.1} src={doodle} alt="" class="w-8" />
		<h2
			use:fadeInUp={0.3}
			id={titleId}
			class="cursor-default scroll-mt-68 text-3xl font-bold lg:scroll-mt-16"
		>
			{title}
		</h2>
	</div>
	{@render children?.()}
</section>

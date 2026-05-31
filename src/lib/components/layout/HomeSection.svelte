<script lang="ts">
	import asterisk from '$lib/imgs/doodles/asterisk.svg';
	import { animate, inView } from 'motion';

	interface Props {
		title: string;
		titleId: string;
		children?: import('svelte').Snippet;
	}

	let { title, titleId, children }: Props = $props();

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
	<div class="flex flex-row items-center gap-2">
		<img use:fadeInUp={0.1} src={asterisk} alt="" class="w-10" />
		<h2 use:fadeInUp={0.3} id={titleId} class="cursor-default scroll-mt-16 text-3xl font-bold">
			{title}
		</h2>
	</div>
	{@render children?.()}
</section>

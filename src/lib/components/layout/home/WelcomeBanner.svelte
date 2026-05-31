<script lang="ts">
	import hi from '$lib/imgs/doodles/hi.svg';
	import emir from '$lib/imgs/misc/emir.webp';
	import ShellTyping from './ShellTyping.svelte';
	import Terminal from './Terminal.svelte';
	import TerminalLine from './TerminalLine.svelte';
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	let welcomeMessage = $state<HTMLElement>();
	let terminal = $state<HTMLElement>();

	const words = [
		'full-stack developer',
		'CS/Comp.Engineering student',
		'backend engineer',
		'problem solver',
		'Java enjoyer',
		'docker composer',
		'REST API craftsman',
		'git blame survivor',
		'open source contributor'
	];

	onMount(() => {
		animate(
			welcomeMessage,
			{ opacity: [0, 1], y: [20, 0], scale: [0.98, 1] },
			{ duration: 0.7, ease: 'easeOut' }
		);
		animate(
			terminal,
			{ opacity: [0, 1], y: [20, 0], scale: [0.98, 1] },
			{ duration: 0.7, delay: 0.5, ease: 'easeOut' }
		);
	});

	function hidden(el: HTMLElement) {
		el.style.opacity = '0';
	}
</script>

<section class="flex w-full flex-col items-center justify-between gap-5 lg:flex-row">
	<!-- welcome message -->
	<div
		use:hidden
		bind:this={welcomeMessage}
		class="flex cursor-auto flex-col gap-1 bg-slate-50/60 text-3xl lg:text-5xl"
	>
		<img src={hi} alt="hi!" class="inline w-28 lg:w-43" />
		<p>
			My name is
			<span class="font-bold text-ocean">Emir</span>, I'm a
		</p>
		<ShellTyping classes="font-bold text-blaze min-h-20 md:min-h-0" {words} />
		<p class="mt-2 text-base text-ash">
			I will have completed my Bachelor of Science (B.Sc.) in Computer Science and Engineering by
			October!
		</p>
	</div>

	<!-- personal image in terminal emulator -->
	<Terminal bind:htmlBind={terminal} classes="w-full lg:w-5/12 md:w-2/3">
		<TerminalLine command={'echo "This is me:"'} output="This is me:" />
		<TerminalLine command="chafa emir.webp">
			<img src={emir} alt="Emir" class="w-70 rounded-xl" />
		</TerminalLine>
	</Terminal>
</section>

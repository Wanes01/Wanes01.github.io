<script lang="ts">
	import { getLocale } from '$lib/i18n/locale.svelte';
	import { welcome } from '$lib/data/welcome';
	import hiIt from '$lib/imgs/doodles/hi_it.svg';
	import hiEn from '$lib/imgs/doodles/hi_en.svg';
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
		<img
			src={getLocale() === 'en' ? hiEn : hiIt}
			alt="hi!"
			class="inline {getLocale() === 'en' ? 'w-28 lg:w-43' : 'w-36 lg:w-57'}"
		/>
		<p>
			{@html welcome.introductionHTML.toString()}
		</p>
		<ShellTyping classes="font-bold text-blaze min-h-20 md:min-h-0" {words} />
		<p class="mt-2 text-base text-ash">
			{welcome.caption}
		</p>
	</div>

	<!-- personal image in terminal emulator -->
	<Terminal bind:htmlBind={terminal} classes="w-full lg:w-5/12">
		<TerminalLine command={`echo "${welcome.echo}"`} output={welcome.echo.toString()} />
		<TerminalLine command="chafa emir.webp">
			<img src={emir} alt="Emir" class="w-70 rounded-xl" />
		</TerminalLine>
	</Terminal>
</section>

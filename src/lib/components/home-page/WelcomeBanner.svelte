<script lang="ts">
	import { getLocale } from '$lib/i18n/locale.svelte';
	import { welcome, shellTypingWords } from '$lib/data/welcome';
	import { getThemeImgPath } from '$lib/utility/utils';
	import ShellTyping from '../terminal/ShellTyping.svelte';
	import Terminal from '../terminal/Terminal.svelte';
	import TerminalLine from '../terminal/TerminalLine.svelte';
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	let welcomeMessage = $state<HTMLElement>();
	let terminal = $state<HTMLElement>();

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
		class="flex cursor-auto flex-col gap-1 bg-slate-50/60 text-3xl lg:text-5xl dark:bg-paper-dark/60"
	>
		<img
			src={getThemeImgPath(`hi_${getLocale()}.svg`, true)}
			alt="hi!"
			class="inline {getLocale() === 'en' ? 'w-28 lg:w-43' : 'w-36 lg:w-57'}"
		/>
		<p>
			{@html welcome.introductionHTML.toString()}
		</p>
		<ShellTyping
			classes="font-bold text-blaze dark:text-blaze-dark min-h-20 md:min-h-0"
			words={shellTypingWords}
		/>
		<p class="mt-2 text-base text-ash dark:text-ash-dark">
			{welcome.caption}
		</p>
	</div>

	<!-- personal image in terminal emulator -->
	<Terminal bind:htmlBind={terminal} classes="w-full lg:w-5/12">
		<TerminalLine command={`echo "${welcome.echo}"`} output={welcome.echo.toString()} />
		<TerminalLine command="chafa emir.webp">
			<img src="/misc/emir.webp" alt="Emir Wanes Aouioua" class="w-70 rounded-xl" />
		</TerminalLine>
	</Terminal>
</section>

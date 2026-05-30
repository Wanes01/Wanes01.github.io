<script lang="ts">
	import hi from '$lib/imgs/icons/hi.svg';
	import emir from '$lib/imgs/misc/emir.webp';
	import ShellTyping from './ShellTyping.svelte';
	import Terminal from './Terminal.svelte';
	import TerminalLine from './TerminalLine.svelte';

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
</script>

<div class="my-5 flex w-full flex-col items-center justify-evenly gap-5 lg:flex-row">
	<!-- welcome message -->
	<p class="flex w-4/5 flex-col gap-1 bg-slate-50/60 text-3xl lg:w-1/2 lg:text-5xl">
		<span class="flex flex-row items-center gap-2">
			<span class="font-bold">Hi!</span>
			<img src={hi} alt="" class="inline w-7" />
		</span>
		<span>
			My name is
			<span class="font-bold text-ocean">Emir</span>, I'm a</span
		>
		<ShellTyping classes="font-bold text-blaze min-h-29 md:min-h-0" {words} />
		<span class="mt-2 text-base text-ash"
			>I will have completed my Bachelor of Science (B.Sc.) in Computer Science and Engineering by
			October!</span
		>
	</p>

	<Terminal classes="w-4/5 lg:w-1/3 md:w-2/3">
		<TerminalLine command={'echo "This is me:"'} output="This is me:" />
		<TerminalLine command="viu emir.webp">
			<img src={emir} alt="Emir" class="w-70 rounded-xl" />
		</TerminalLine>
	</Terminal>

	<!-- image terminal emulator -->
</div>

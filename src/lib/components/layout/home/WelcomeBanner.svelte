<script lang="ts">
	import hi from '$lib/icons/hi.svg';
	import ShellTyping from './ShellTyping.svelte';

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

<div class="flex h-100 w-full flex-row items-center justify-center">
	<!-- welcome message -->
	<p class="flex flex-col bg-slate-50/60 p-3 text-2xl lg:w-1/4">
		<span class="flex flex-col"
			><span class="flex flex-row items-center gap-2">
				<span class="font-bold">Hi!</span>
				<img src={hi} alt="" class="inline w-7" />
			</span>
			<span>
				My name is
				<span class="font-bold text-ocean">Emir</span>, I'm a</span
			>
			<ShellTyping classes="font-bold text-blaze" {words} />
			<span class="mt-2 text-base text-ash"
				>I will have completed my Bachelor of Science (B.Sc.) in Computer Science and Engineering by
				October!</span
			>
		</span>
	</p>

	<!-- image terminal emulator -->
</div>

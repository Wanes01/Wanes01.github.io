<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import ParticleCanvasBackground from '$lib/components/layout/ParticleCanvasBackground.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col bg-slate-50 dark:bg-paper-dark">
	<ParticleCanvasBackground />
	<NavBar />
	<main
		class="relative z-10 flex-1 cursor-pointer overflow-x-hidden font-inter text-carbon dark:text-paper"
	>
		{@render children()}
	</main>
	<Footer />
</div>

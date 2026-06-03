<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import ParticleCanvasBackground from '$lib/components/layout/ParticleCanvasBackground.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ParticleCanvasBackground />
<!-- bg-slate-50 -->
<NavBar />
<main class="relative z-10 min-h-screen cursor-pointer overflow-x-hidden font-inter text-carbon">
	{@render children()}
</main>
<Footer />

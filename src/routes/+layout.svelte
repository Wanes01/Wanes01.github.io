<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import ParticleCanvasBackground from '$lib/components/layout/ParticleCanvasBackground.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ParticleCanvasBackground />
<!-- bg-slate-50 -->
<main class="relative z-10 h-screen text-carbon">
	<NavBar />
	{@render children()}
</main>

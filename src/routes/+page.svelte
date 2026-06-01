<script>
	import WelcomeBanner from '$lib/components/layout/home/WelcomeBanner.svelte';
	import About from '$lib/components/layout/home/About.svelte';
	import Experience from '$lib/components/layout/home/Experience.svelte';
	import Skills from '$lib/components/layout/home/Skills.svelte';
	import Projects from '$lib/components/layout/home/Projects.svelte';
</script>

<div class="flex flex-col gap-25 px-10 py-10 lg:gap-35 lg:px-50">
	<WelcomeBanner />
	<div class="flex flex-col gap-10 lg:px-30">
		<About />
		<Experience />
		<Skills />
		<Projects />
	</div>
</div>

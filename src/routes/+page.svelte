<script>
	import WelcomeBanner from '$lib/components/layout/home/WelcomeBanner.svelte';
	import About from '$lib/components/layout/home/About.svelte';
	import Experience from '$lib/components/layout/home/Experience.svelte';
</script>

<div class="flex flex-col gap-25 px-10 py-10 lg:gap-35 lg:px-50">
	<WelcomeBanner />
	<div class="flex flex-col lg:px-30">
		<About />
		<Experience />
	</div>
</div>

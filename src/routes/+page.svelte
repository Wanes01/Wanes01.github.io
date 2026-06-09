<script>
	import WelcomeBanner from '$lib/components/home-page/WelcomeBanner.svelte';
	import About from '$lib/components/home-page/About.svelte';
	import Experience from '$lib/components/home-page/experience-section/Experience.svelte';
	import Skills from '$lib/components/home-page/Skills.svelte';
	import Projects from '$lib/components/home-page/Projects.svelte';
	import Contact from '$lib/components/home-page/contact-section/Contact.svelte';
</script>

<div class="flex flex-col items-center gap-25 px-10 py-10 lg:gap-35 lg:px-50">
	<WelcomeBanner />
	<div class="flex flex-col gap-10 lg:mb-10 lg:w-7/8 lg:gap-25">
		<About />
		<Experience />
		<Skills />
		<Projects />
		<Contact />
	</div>
</div>

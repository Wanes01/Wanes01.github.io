<script lang="ts">
	import HomeSection from '../../layout/HomeSection.svelte';
	import ContactTerminalForm from './ContactTerminalForm.svelte';
	import ContactList from './ContactList.svelte';
	import { contactData } from '$lib/data/contact';
	import { getThemeImgPath } from '$lib/utility/utils';
</script>

<HomeSection
	title={contactData.sectionTitle.toString()}
	titleId="contact"
	doodle={getThemeImgPath('contact.svg', true)}
>
	<div class="flex flex-col items-center justify-center gap-10 lg:flex-row">
		<!-- contact list and cv download -->
		<ContactList />
		<div class="w-full">
			<ContactTerminalForm />
		</div>
	</div>
</HomeSection>

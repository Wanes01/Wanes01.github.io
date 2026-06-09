<script lang="ts">
	import { contactData } from '$lib/data/contact';
	import { getLocale } from '$lib/i18n/locale.svelte';
	import { getThemeImgPath, animateEaseOutOn } from '$lib/utility/utils';
	import { onMount } from 'svelte';

	const CV_NEW_NAME = 'cv_emir_wanes_aouioua.pdf';

	let contactList = $state<HTMLElement>();

	onMount(() => {
		animateEaseOutOn(contactList!);
	});
</script>

<div
	bind:this={contactList}
	class="flex flex-col gap-10 bg-slate-50/70 lg:w-1/2 dark:bg-paper-dark/70"
>
	<!-- contact list -->
	<div class="flex cursor-auto flex-col gap-2">
		<h3 class="text-xl font-semibold text-blaze italic dark:text-blaze-dark">
			{contactData.invitation.title}
		</h3>
		<p class="leading-relaxed">{contactData.invitation.description}</p>
		<ul class="mt-3 flex flex-col">
			{#each contactData.contacts as contact, i}
				{@const isLastOne = i == contactData.contacts.length - 1}
				{@const isEmail = contact.name === 'Email'}
				<li>│</li>
				<li class="flex flex-row gap-2">
					{isLastOne ? '└──' : '├──'}
					<p>
						<a
							href="{isEmail ? 'mailto:' : ''}{contact.link}"
							target="_blank"
							class="flex flex-row items-center gap-2 underline underline-offset-4 transition-colors duration-200 hover:text-blaze dark:hover:text-blaze-dark"
						>
							<img
								src={`/contact/${contact.icon}.png`}
								alt=""
								class="inline w-7 dark:rounded-lg dark:bg-slate-50"
							/>
							<span>
								{contact.name}
							</span>
						</a>
						{#if isEmail}
							<span class="ml-8 text-sm">
								(
								<a
									href="mailto:{contact.link}"
									class="underline underline-offset-4 transition-colors duration-200 hover:text-blaze dark:hover:text-blaze-dark"
									>{contact.link}</a
								>
								)
							</span>
						{/if}
					</p>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex flex-col items-center gap-3">
		<p>{@html contactData.invitation.resumeInfo.toString()} {getLocale()}</p>
		<a
			href={`/cvs/cv_${getLocale()}.pdf`}
			download={CV_NEW_NAME}
			class=" flex w-full cursor-pointer flex-row items-center justify-center gap-1.5 rounded-lg border border-b-3 border-blaze bg-orange-50 py-1.5 font-semibold text-blaze transition-transform duration-75 active:border-t-3 active:border-b active:bg-blaze/20 dark:border-orange-700 dark:bg-orange-200 dark:text-orange-700 active:dark:bg-orange-300/90"
		>
			<p>{contactData.invitation.downloadResume}</p>
			<img src={getThemeImgPath('cv.svg', false)} alt="" class="w-6" />
		</a>
	</div>
</div>

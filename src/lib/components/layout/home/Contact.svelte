<script lang="ts">
	import HomeSection from '../HomeSection.svelte';
	import Terminal from './Terminal.svelte';
	import TerminalLine from './TerminalLine.svelte';
	import contactDoodle from '$lib/imgs/doodles/contact.svg';
	import { contacts } from '$lib/data/contact';
	import { onMount } from 'svelte';
	import { inView, animate } from 'motion';

	// NOTE: this key is meant to be public. There is no security risk
	// leaving it here.
	// see web3forms docs: https://docs.web3forms.com/
	const WEB3FORMS_KEY = 'faaf3899-938c-43b2-a950-ec89ad44b69b';
	const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

	let contactList = $state<HTMLElement>();
	let formTerminal = $state<HTMLElement>();
	let form = $state<HTMLFormElement>();
	let resultTerminalLine = $state<HTMLElement>();

	let resultSuccess = $state<boolean | undefined>(undefined);

	onMount(() => {
		const elementsToAnimate = [contactList, formTerminal];

		elementsToAnimate.forEach((item) => {
			inView(
				item,
				() => {
					animate(
						item,
						{ opacity: [0, 1], y: [30, 0] },
						{ duration: 0.5, delay: 0.1, ease: 'easeOut' }
					);
				},
				{ amount: 0.3 }
			);
		});

		// result message showing up
		$effect(() => {
			if (resultSuccess !== undefined && resultTerminalLine) {
				animate(
					resultTerminalLine,
					{ opacity: [0, 1], y: [10, 0] },
					{ duration: 0.3, ease: 'easeOut' }
				);
			}
		});

		// send the message and shows the result to the user
		form?.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(form);
			const object = Object.fromEntries(formData);
			const json = JSON.stringify(object);

			fetch(WEB3FORMS_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: json
			})
				.then(async (response) => (resultSuccess = response.status == 200))
				.catch((error) => (resultSuccess = false))
				.then(() => form?.reset());
		});
	});
</script>

<HomeSection title="Contact" titleId="contact" doodle={contactDoodle}>
	<div class="flex flex-col items-center justify-center gap-10 lg:flex-row">
		<!-- contact list -->
		<div bind:this={contactList} class="flex flex-col gap-2 bg-slate-50/70 lg:w-1/2">
			<h3 class="text-xl font-semibold text-blaze italic">Let's get in touch!</h3>
			<p class="leading-relaxed">
				Feel free to contact me on any of these platforms, ora use the following form to send me a
				message
			</p>
			<ul class="mt-3 flex flex-col">
				{#each contacts as contact, i}
					{@const isLastOne = i == contacts.length - 1}
					{@const isEmail = contact.name === 'Email'}
					<li>│</li>
					<li class="flex flex-row gap-2">
						{isLastOne ? '└──' : '├──'}
						<p>
							<a
								href="{isEmail ? 'mailto:' : ''}{contact.link}"
								target="_blank"
								class="flex flex-row items-center gap-2 underline underline-offset-4 transition-colors duration-200 hover:text-blaze"
							>
								<img src={`/contact/${contact.icon}.png`} alt="" class="inline w-7" />
								<span>
									{contact.name}
								</span>
							</a>
							{#if isEmail}
								<span class="ml-8 text-sm">
									(
									<a
										href="mailto:{contact.link}"
										class="underline underline-offset-4 transition-colors duration-200 hover:text-blaze"
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
		<div class="w-full">
			<Terminal bind:htmlBind={formTerminal} title="send me an email!" classes="w-full">
				<TerminalLine command="./send_message_to_emir.sh" user="visitor" host="pc">
					<form
						bind:this={form}
						action={WEB3FORMS_ENDPOINT}
						method="POST"
						class="flex flex-col gap-2 bg-slate-50/50"
					>
						<!-- web3forms mandatory input -->
						<input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
						<ul class="flex flex-col gap-3">
							<li class="flex flex-col gap-1">
								<div class="flex flex-row gap-1">
									<label for="visitorEmail">[1] Your email</label>
									<p class="font-semibold text-blaze">></p>
								</div>
								<input
									required
									placeholder="..."
									type="email"
									name="visitorEmail"
									id="visitorEmail"
									minlength="3"
									autocomplete="off"
									class="rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze"
								/>
							</li>
							<li class="flex flex-col gap-1">
								<div class="flex flex-row gap-1">
									<label for="visitorSubject">[2] Subject</label>
									<p class="font-semibold text-blaze">></p>
								</div>
								<input
									required
									placeholder="..."
									type="text"
									name="visitorSubject"
									id="visitorSubject"
									minlength="5"
									autocomplete="off"
									class="rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze"
								/>
							</li>
							<li class="flex flex-col gap-1">
								<div class="flex flex-row gap-1">
									<label for="message">[3] Message</label>
									<p class="font-semibold text-blaze">></p>
								</div>
								<textarea
									required
									name="message"
									id="message"
									placeholder="..."
									minlength="10"
									autocomplete="off"
									class="h-48 resize-none overflow-y-scroll rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze"
								></textarea>
							</li>
						</ul>
						<input
							type="submit"
							value="send_message()"
							class="mt-4 cursor-pointer rounded border-b-2 border-ocean bg-blue-100 py-1.5 text-sm font-semibold text-ocean
       transition-transform duration-75 active:translate-y-0.5 active:border-t-2 active:border-b-0 active:bg-ocean/20"
						/>
					</form>
				</TerminalLine>
				{#if resultSuccess != undefined}
					<div class="mt-5" bind:this={resultTerminalLine}>
						<TerminalLine command="./print_message_result.sh">
							<p class={resultSuccess ? 'text-green-700' : 'text-red-700'}>
								>>> {resultSuccess
									? 'The message was sent successfully :D'
									: 'Something went wrong while sending the message D:'}
							</p>
						</TerminalLine>
					</div>
				{/if}
			</Terminal>
		</div>
	</div>
</HomeSection>

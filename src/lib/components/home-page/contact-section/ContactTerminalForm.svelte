<script lang="ts">
	import { contactData } from '$lib/data/contact';
	import Terminal from '$lib/components/terminal/Terminal.svelte';
	import TerminalLine from '$lib/components/terminal/TerminalLine.svelte';
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { animateEaseOutOn } from '$lib/utility/utils';

	// NOTE: this key is meant to be public. There is no security risk
	// leaving it here.
	// see web3forms docs: https://docs.web3forms.com/
	const WEB3FORMS_KEY = 'faaf3899-938c-43b2-a950-ec89ad44b69b';
	const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

	let formTerminal = $state<HTMLElement>();
	let form = $state<HTMLFormElement>();
	let resultTerminalLine = $state<HTMLElement>();

	let resultStatus = $state<'processing' | 'success' | 'error' | undefined>(undefined);

	// color of the result. Defaults if the message is getting processed.
	let resultColor = $derived.by(() => {
		if (resultStatus === 'processing' || resultStatus === undefined) return '';
		return resultStatus === 'success' ? 'text-green-700' : 'text-red-700';
	});

	// the result message
	let resultShownMessage = $derived.by(() => {
		if (resultStatus === 'processing' || resultStatus === undefined) return '';
		return resultStatus === 'success' ? contactData.msgResult.success : contactData.msgResult.error;
	});

	onMount(() => {
		animateEaseOutOn(formTerminal!);

		// result message showing up
		$effect(() => {
			if (resultStatus !== undefined && resultTerminalLine) {
				animate(
					resultTerminalLine,
					{ opacity: [0, 1], y: [10, 0] },
					{ duration: 0.3, ease: 'easeOut' }
				);
			}
		});

		// sends the message and shows the result to the user
		form?.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(form);
			const object = Object.fromEntries(formData);
			const json = JSON.stringify(object);
			resultStatus = 'processing';

			fetch(WEB3FORMS_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: json
			})
				.then(async (response) => (resultStatus = response.status == 200 ? 'success' : 'error'))
				.catch((error) => (resultStatus = 'error'))
				.then(() => form?.reset());
		});
	});
</script>

<Terminal
	bind:htmlBind={formTerminal}
	title={contactData.terminal.title.toString()}
	classes="w-full"
>
	<TerminalLine command={contactData.terminal.command.toString()} user="visitor" host="pc">
		<form
			bind:this={form}
			action={WEB3FORMS_ENDPOINT}
			method="POST"
			class="flex flex-col gap-2 bg-slate-50/50 dark:bg-paper-dark/20"
		>
			<!-- web3forms mandatory input -->
			<input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
			<ul class="flex flex-col gap-3">
				<li class="flex flex-col gap-1">
					<div class="flex flex-row gap-1">
						<label for="visitorEmail">[1] {contactData.terminal.emailLabel}</label>
						<p class="font-semibold text-blaze dark:text-blaze-dark">></p>
					</div>
					<input
						required
						placeholder="..."
						type="email"
						name="visitorEmail"
						id="visitorEmail"
						minlength="3"
						autocomplete="off"
						class="rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze dark:border-slate-50/30 dark:bg-slate-50/5 dark:focus:border-blaze-dark"
					/>
				</li>
				<li class="flex flex-col gap-1">
					<div class="flex flex-row gap-1">
						<label for="visitorSubject">[2] {contactData.terminal.subjectLabel}</label>
						<p class="font-semibold text-blaze dark:text-blaze-dark">></p>
					</div>
					<input
						required
						placeholder="..."
						type="text"
						name="visitorSubject"
						id="visitorSubject"
						minlength="5"
						autocomplete="off"
						class="rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze dark:border-slate-50/30 dark:bg-slate-50/5 dark:focus:border-blaze-dark"
					/>
				</li>
				<li class="flex flex-col gap-1">
					<div class="flex flex-row gap-1">
						<label for="message">[3] {contactData.terminal.messageLabel}</label>
						<p class="font-semibold text-blaze dark:text-blaze-dark">></p>
					</div>
					<textarea
						required
						name="message"
						id="message"
						placeholder="..."
						minlength="10"
						autocomplete="off"
						class="h-48 resize-none overflow-y-scroll rounded border-b-2 border-dashed border-carbon/30 bg-carbon/5 px-2 py-1 outline-0 transition-colors duration-400 focus:border-blaze dark:border-slate-50/30 dark:bg-slate-50/5 dark:focus:border-blaze-dark"
					></textarea>
				</li>
			</ul>
			<input
				type="submit"
				value={contactData.terminal.submitLabel.toString()}
				class="mt-4 cursor-pointer rounded border-b-2 border-ocean bg-blue-100 py-1.5 text-sm font-semibold text-ocean
           transition-transform duration-75 active:translate-y-0.5 active:border-t-2 active:border-b-0 active:bg-ocean/20
           dark:border-sky-400 dark:bg-sky-950 dark:text-sky-300
           dark:active:bg-sky-400/20"
			/>
		</form>
	</TerminalLine>
	{#if resultStatus !== undefined}
		<div class="mt-5" bind:this={resultTerminalLine}>
			<TerminalLine command={contactData.terminal.printCmd.toString()}>
				<div class="flex flex-col gap-1">
					<p>{contactData.msgResult.processing}</p>
					{#if resultStatus === 'success' || resultStatus === 'error'}
						<p class={resultColor}>
							>>> {resultShownMessage}
						</p>
					{/if}
				</div>
			</TerminalLine>
		</div>
	{/if}
</Terminal>

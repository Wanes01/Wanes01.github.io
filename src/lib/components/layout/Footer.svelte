<script>
	import { contacts } from '$lib/data/contact';
</script>

<div class="flex flex-col items-center justify-center gap-2 bg-carbon p-4 text-center text-paper">
	<p class="border-b border-slate-700 p-2">
		© 2025 Emir Wanes Aouioua · Built with SvelteKit & TailwindCSS
	</p>
	<ul class="flex w-full flex-row items-center justify-center gap-5 py-3">
		{#each contacts as contact}
			{@const isEmail = contact.name === 'Email'}
			<li class="rounded-lg bg-slate-50">
				<a href="{isEmail ? 'mailto:' : ''}{contact.link}" target="_blank">
					<img src={`/contact/${contact.icon}.png`} alt={contact.name} class="w-8" />
				</a>
			</li>
		{/each}
	</ul>
</div>

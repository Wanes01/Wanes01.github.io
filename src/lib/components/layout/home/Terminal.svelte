<script lang="ts">
	interface Props {
		classes?: string;
		htmlBind?: HTMLElement;
		children?: import('svelte').Snippet;
	}

	let { classes = '', htmlBind = $bindable(), children }: Props = $props();
</script>

<div
	bind:this={htmlBind}
	class="overflow-hidden rounded-xl border border-carbon/10 bg-white/90
            font-fira shadow-lg shadow-carbon/30
            backdrop-saturate-150 {classes}"
>
	<!-- title bar -->
	<div
		class="relative flex items-center justify-end gap-1.5 border-b border-carbon/8 bg-carbon/5 px-3.5 py-2.5"
	>
		<p
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.75rem] tracking-wide text-ash"
		>
			~ : bash
		</p>

		<div class="flex flex-row gap-1.5">
			<div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
			<div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
			<div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
		</div>
	</div>

	<!-- terminal content -->
	<div class="p-4 text-[13.5px] leading-relaxed text-carbon">
		{@render children?.()}
	</div>
</div>

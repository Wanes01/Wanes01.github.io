<script lang="ts">
	/**
	 * Represents a command line in the Terminal component
	 */
	interface Props {
		user?: string;
		host?: string;
		path?: string;
		command: string;
		output?: string;
		children?: import('svelte').Snippet;
	}

	let { user = 'wanes', host = 'desktop', path = '~', command, output, children }: Props = $props();
</script>

<!-- prompt line -->
<div class="flex flex-wrap items-baseline gap-x-1">
	<span class="font-medium text-ocean dark:text-ocean-dark">{user}@{host}</span>
	<span class="text-carbon/50 dark:text-paper/50">:</span>
	<span class="font-medium text-blaze dark:text-blaze-dark">{path}</span>
	<span class="text-carbon/50 dark:text-paper/50">$</span>
	<span class="ml-1 text-carbon dark:text-paper">{command}</span>
</div>

<!-- output: either the output prop, or a snippet for rich content -->
{#if output}
	<div class="mt-0.5 mb-2 text-carbon dark:text-paper">{output}</div>
{:else if children}
	<div class="mt-2 mb-3">
		{@render children()}
	</div>
{/if}

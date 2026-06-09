<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		a: Snippet;
		b: Snippet;
		ariaLabel: string;
		onToggle: (isB: boolean) => void;
		isB?: boolean;
	};

	let { a, b, ariaLabel, onToggle, isB = $bindable(false) }: Props = $props();
</script>

<button
	onclick={() => {
		isB = !isB;
		onToggle(isB);
	}}
	aria-label={ariaLabel}
	class="flex aspect-square h-7 cursor-pointer flex-row items-center justify-center border text-ash transition-colors duration-200 hover:text-blaze dark:text-ash-dark hover:dark:text-blaze-dark"
>
	{@render (isB ? b : a)()}
</button>

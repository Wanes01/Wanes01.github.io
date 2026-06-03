<script lang="ts">
	type Props = {
		a: string;
		b: string;
		ariaLabel: string;
		onToggle: (isB: boolean) => void;
		isB?: boolean;
		type?: 'icon' | 'text';
	};

	let { a, b, ariaLabel, onToggle, isB = $bindable(false), type = 'text' }: Props = $props();
</script>

<button
	onclick={() => {
		isB = !isB;
		onToggle(isB);
	}}
	aria-label={ariaLabel}
	class="text-ash transition-colors duration-200 hover:text-blaze"
>
	{#if type === 'icon'}
		<img src={isB ? b : a} alt="" class="h-5" />
	{:else}
		<span class="font-fira text-sm">{isB ? b : a}</span>
	{/if}
</button>

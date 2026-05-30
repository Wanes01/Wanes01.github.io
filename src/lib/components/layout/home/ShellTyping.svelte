<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		words: string[];
		classes: string;
		typeSpeed?: number;
		deleteSpeed?: number;
		pauseAfterType?: number;
		pauseAfterDelete?: number;
	}

	let {
		words,
		classes,
		typeSpeed = 90,
		deleteSpeed = 50,
		pauseAfterType = 1400,
		pauseAfterDelete = 400
	}: Props = $props();

	// Only `displayed` needs to be $state — it's the only thing the template reads.
	// Everything else is plain mutable variables so $effect / reactivity never sees them.
	let displayed = $state('');

	function sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function typeLoop() {
		// Plain local variables — NOT reactive state
		let wordIndex = 0;
		let isDeleting = false;

		while (true) {
			const current = words[wordIndex % words.length];

			if (!isDeleting) {
				// Typing phase — build the string char by char
				for (let i = 0; i <= current.length; i++) {
					displayed = current.slice(0, i);
					await sleep(typeSpeed + (Math.random() * 40 - 20));
				}

				await sleep(pauseAfterType);
				isDeleting = true;
			} else {
				// Deleting phase — shrink the string char by char
				for (let i = current.length; i >= 0; i--) {
					displayed = current.slice(0, i);
					await sleep(deleteSpeed + (Math.random() * 20 - 10));
				}

				await sleep(pauseAfterDelete);
				isDeleting = false;
				wordIndex = (wordIndex + 1) % words.length;
			}
		}
	}

	onMount(() => {
		if (words && words.length > 0) {
			typeLoop();
		}
	});
</script>

<span class={classes}>
	{displayed}<span class="cursor">|</span>
</span>

<style>
	.cursor {
		display: inline-block;
		font-weight: 100;
		margin-left: 1px;
		animation: blink 1s step-start infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>

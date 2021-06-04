<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		
		if (res.ok) {
			const angebote = await res.json();

			return {
				props: { angebote }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	export let angebote: any[];
</script>

<svelte:head>
	<title>Angebote</title>
</svelte:head>

<div class="angebote">
	{#each angebote as angebot (angebot.id)}
		<div>
			{angebot.title}
		</div>
	{/each}
</div>

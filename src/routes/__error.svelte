<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}

</script>

<script lang="ts">
	import { dev } from '$app/env';
	export let error, status;
	let title = `${status}`;

</script>

<h1>{title}</h1>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

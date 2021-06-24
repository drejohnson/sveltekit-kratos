<script lang="ts">
	import { page, session } from '$app/stores';
	import InlineSvg from '$lib/InlineSvg.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../global.css';

	export let path: string;

	$: path = $page.path.slice(1);
</script>

<InlineSvg />

<svelte:head>
	<title>Kratos SvelteKit</title>
</svelte:head>

<div class="flex flex-col w-full min-h-screen">
	{#if !$page.path.includes('auth')}
		<Nav {path} session={$session} />
	{/if}

	<main class="flex flex-col flex-1 justify-center items-center">
		<slot />
	</main>
</div>

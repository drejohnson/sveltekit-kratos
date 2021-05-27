<script lang="ts">
	import { page } from '$app/stores';
	import InlineSvg from '$lib/InlineSvg.svelte';
	import Nav from '$lib/Nav.svelte';
	import TailwindCSS from '$lib/TailwindCSS.svelte';

	export let path: string;

	$: path = $page.path.slice(1);
	let auth_route = $page.path.includes('auth');
	console.log($page.path.includes('auth'));
</script>

<TailwindCSS />

<InlineSvg />

<div class="flex flex-col w-full min-h-screen">
	{#if !$page.path.includes('auth')}
		<Nav {path} />
	{/if}

	<main class="flex flex-col flex-1 justify-center items-center">
		<slot />
	</main>
</div>

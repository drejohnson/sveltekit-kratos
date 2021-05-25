<script lang="ts">
	import { page } from '$app/stores';
	import InlineSvg from '$lib/InlineSvg.svelte';
	import Nav from '$lib/Nav.svelte';
	import TailwindCSS from '$lib/TailwindCSS.svelte';

	export let path: string;

	$: path = $page.path.slice(1);
</script>

<TailwindCSS />

<InlineSvg />

<div class="flex flex-col min-h-screen">
	<Nav {path} />

	<main class="flex flex-col flex-1 justify-center items-center">
		<slot />
	</main>
</div>

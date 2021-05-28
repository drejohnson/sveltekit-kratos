<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ session }: { session: Session }) => {
		if (session.user) {
			return {
				props: {
					session
				}
			};
		}
		return {};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { Session } from '$lib/types';
	import InlineSvg from '$lib/InlineSvg.svelte';
	import Nav from '$lib/Nav.svelte';
	import TailwindCSS from '$lib/TailwindCSS.svelte';

	export let path: string;
	export let session: Session;

	$: path = $page.path.slice(1);
</script>

<TailwindCSS />

<InlineSvg />

<div class="flex flex-col w-full min-h-screen">
	{#if !$page.path.includes('auth')}
		<Nav {path} {session} />
	{/if}

	<main class="flex flex-col flex-1 justify-center items-center">
		<slot />
	</main>
</div>

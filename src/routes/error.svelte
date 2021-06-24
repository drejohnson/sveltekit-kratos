<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { isString } from '$lib/helpers';
	import config from '$lib/config';

	export const load: Load = async ({ page, fetch }) => {
		const error = page.query.get('error');

		if (!error || !isString(error)) {
			return {
				redirect: config.baseUrl,
				status: 302
			};
		}

		const res = await fetch(`/api/auth/error`, {
			headers: {
				error
			}
		});

		if (!res.ok) {
			return {
				redirect: config.baseUrl
			};
		}

		const { data: body } = await res.json();

		if ('errors' in body) {
			return {
				status: 500,
				props: {
					message: JSON.stringify(body.errors, null, 2)
				}
			};
		}
	};
</script>

<script lang="ts">
	export let message: any;
</script>

<svelte:head>
	<title>Error - Kratos SvelteKit</title>
</svelte:head>

<div class="container px-8 md:px-24">
	<h1>An error occurred</h1>
	<pre><code>{message}</code></pre>
</div>

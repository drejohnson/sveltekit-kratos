<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { isString, redirectOnError } from '$lib/helpers';
	import config from '$lib/config';

	export const load: Load = async ({ page, fetch }) => {
		const error = page.query.get('error');

		if (!error || !isString(error)) {
			return {
				redirect: config.baseUrl,
				status: 302
			};
		}

		try {
			const res = await fetch(`/api/auth/error`, {
				headers: {
					error
				}
			});

			if (!res.ok) {
				return redirectOnError(res, config.baseUrl);
			}

			const { status, data: body } = await res.json();

			if ('errors' in body) {
				return {
					status: 500,
					props: {
						message: JSON.stringify(body.errors, null, 2)
					}
				};
			}
		} catch (error) {
			console.log('catch error', error);
			return {
				redirect: config.baseUrl
			};
		}
	};

</script>

<script lang="ts">
	export let message: any;

</script>

<svelte:head>
	<title>Error - Sveltekit Kratos</title>
</svelte:head>

<h1>An error occurred</h1>
<pre><code>{message}</code></pre>

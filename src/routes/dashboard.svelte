<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		// console.log(session);
		if (session.user) {
			return {
				props: {
					session
				}
			};
		}
	};
</script>

<script>
	import { logoutUrl } from '$lib/helpers';

	export let session;
	// console.log(session);
</script>

<h2>Dashboard</h2>

<div class="container">
	<h2 class="greeting">
		Welcome back, <span class="user-identifier">{session.user.email}</span>!
	</h2>
	<h3>This example app is secure by default!</h3>
	<p>Hello, nice to have you! You signed up with this data:</p>
	<pre><code>{JSON.stringify(session.traits, null, 2)}</code></pre>

	<p>The decoded ORY Kratos Session payload is as follows:</p>
	<pre><code>{JSON.stringify(session, null, 2)}</code></pre>
</div>

<a
	class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
	href={logoutUrl}>Logout</a
>

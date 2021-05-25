<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';

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
	export let session;
	console.log(session);
</script>

<h2>Dashboard</h2>

<div class="container">
	<h2 class="greeting">
		Welcome back, <span class="user-identifier">{session.user.email}</span>!
	</h2>
	<h3>This example app is secure by default!</h3>
	<p>Hello, nice to have you! You signed up with this data:</p>
	<pre><code>{JSON.stringify(session.traits, null, 2)}</code></pre>
	<p>Requests to your application contain a ORY Kratos Session Cookie:</p>
	<pre><code>{session.headers}</code></pre>

	<p>The decoded ORY Kratos Session payload is as follows:</p>
	<pre><code>{JSON.stringify(session, null, 2)}</code></pre>
</div>

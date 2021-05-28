<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }: { session: Session }) => {
		if (session.user) {
			return {
				props: {
					session
				}
			};
		}

		return {
			status: 302,
			redirect: '/auth/login'
		};
	};
</script>

<script lang="ts">
	import type { Session } from '$lib/types';
	import { logoutUrl } from '$lib/helpers';

	export let session: Session;
</script>

<h2 class="text-3xl py-4">Welcom back, {session.user.username}</h2>

<h3 class="text-xl py-4">Your info:</h3>

<pre><code>{JSON.stringify(session.user, null, 2)}</code></pre>

<a
	class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
	href={logoutUrl}>Logout</a
>

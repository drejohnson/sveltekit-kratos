<script lang="ts" context="module">
	import { createLoad } from '../../_load';

	export const load = createLoad();
</script>

<script lang="ts">
	import { logoutUrl } from '$lib/helpers';
	import type { UserSession } from '$lib/types';

	export let session: UserSession;
</script>

<h2 class="text-3xl py-4">Welcom back, {session.user.username}</h2>

<h3 class="text-xl py-4">Your info:</h3>

<pre><code>{JSON.stringify(session.user, null, 2)}</code></pre>

<a
	class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
	href={logoutUrl}>Logout</a
>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { UserSession } from '$lib/types';

	export const load: Load = async ({ session }: { session: UserSession }) => {
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
	export let session: UserSession;

</script>

<h2 class="text-3xl py-4">Hello, {session.user.username}</h2>

<h3 class="text-xl py-4">Welcome to SvelteKit with Authentication via Ory Kratos</h3>
<p class="pb-1">
	Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
	sveltekit documentation
</p>
<p class="pb-1">
	Visit <a class="text-blue-600 underline" href="https://www.ory.sh/kratos/docs/"
		>www.ory.sh/kratos/docs</a
	> to read the Ory Kratos documentation
</p>

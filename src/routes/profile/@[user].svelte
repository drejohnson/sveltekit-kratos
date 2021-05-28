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

	export let session: Session;
</script>

<h1>Welcome {session.user.username}</h1>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		return {
			status: 302,
			redirect: `/profile/@${session.user.username}`
		};
	};
</script>

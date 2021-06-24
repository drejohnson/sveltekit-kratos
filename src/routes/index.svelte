<script lang="ts">
	import { session } from '$app/stores';
</script>

<div class="container px-8 md:px-24">
	{#if $session.user}
		<h3 class="text-3xl pb-4">Hello, @{$session.user.username}</h3>
	{/if}

	<h1 class="text-4xl pb-4">Welcome to SvelteKit with Authentication via Ory Kratos!</h1>
	<p class="pb-1">
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the sveltekit documentation
	</p>
	<p class="pb-1">
		Visit <a class="text-blue-600 underline" href="https://www.ory.sh/kratos/docs/"
			>www.ory.sh/kratos/docs</a
		> to read the Ory Kratos documentation
	</p>
</div>

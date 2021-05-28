<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script lang="ts">
	import { dev } from '$app/env';
	export let error, status;
	let title = `${status}`;
</script>

{#if status === 404}
	<div class="container mx-auto h-screen pt-32 md:pt-0 px-6 z-10 flex items-center justify-between">
		<div
			class="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative"
		>
			<div class="w-full mb-16 md:mb-8 text-center lg:text-left">
				<h1
					class="font-light font-sans text-center lg:text-left text-5xl lg:text-8xl mt-12 md:mt-0 text-gray-700"
				>
					Sorry, this page isn't available
				</h1>
				<button
					class="px-2 py-2 w-36 mt-16 font-light transition ease-in duration-200 hover:bg-yellow-400 border-2 text-lg border-gray-700 bg-yellow-300 focus:outline-none"
				>
					Go back home
				</button>
			</div>
			<div class="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
				<img src="/images/404.svg" alt="Page not found" />
			</div>
		</div>
	</div>
{:else}
	<h1>{title}</h1>
{/if}

<!-- {#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if} -->

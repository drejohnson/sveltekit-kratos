<script lang="ts">
	import type { KratosFlowType } from '$lib/types';

	export let flowType: KratosFlowType;
	export let image = 'https://source.unsplash.com/IXUM4cJynP0';
</script>

<div
	class="w-full flex flex-wrap {flowType === 'recovery' || flowType === 'verification'
		? 'flex-row-reverse'
		: ''} mt-28"
>
	<div class="w-full md:w-1/2 flex flex-col">
		<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
			<a href="/" class="bg-black text-white font-bold text-xl p-4" alt="Logo">Logo</a>
		</div>

		<div
			class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32"
		>
			<slot />
			<div class="text-center pt-12 pb-12">
				{#if flowType === 'registration'}
					<p>
						Already have an account? <a href="/auth/login" class="underline font-semibold"
							>Log in.</a
						>
					</p>
				{/if}

				{#if flowType === 'login'}
					<div class="flex mt-6 justify-center items-center">
						<a href="/auth/registration" class="underline font-semibold">Register new account</a>
						<span class="mx-1 text-gray-300">/</span>
						<a href="/auth/recovery" class="text-red-600 text-sm underline font-semibold"
							>Forgot password?</a
						>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Image Section -->
	<div class="w-1/2 shadow-2xl">
		<img class="object-cover w-full h-screen hidden md:block" src={image} alt="Background" />
	</div>
</div>

<script lang="ts">
	import Link from './Link.svelte';

	export let path: string;
</script>

<header class="absolute w-full px-8 z-50">
	<div
		class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl"
	>
		<div class="relative flex flex-col md:flex-row items-center">
			<Link href="/">
				<span
					class="flex items-center mb-5 font-bold text-xl p-4 bg-black text-white lg:w-auto lg:items-center lg:justify-center md:mb-0"
				>
					{config.projectName}
				</span>
			</Link>
			<nav
				class="navigation flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200"
			>
				<Link href="/auth/login" activeClass={path === 'auth/login' ? 'underline' : ''}>Login</Link>
				<Link
					styles="ml-5 font-medium leading-6"
					href="/auth/registration"
					activeClass={path === 'auth/registration' ? 'underline' : ''}
				>
					Register
				</Link>
				<Link
					styles="ml-5 font-medium leading-6"
					rel="prefetch"
					href="/about"
					activeClass={path === 'about' ? 'underline' : ''}
				>
					About
				</Link>
			</nav>
		</div>
	</div>
</header>

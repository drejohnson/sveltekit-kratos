<script lang="ts">
	import { logoutUrl } from '$lib/helpers';
	import config from '$lib/config';
	import type { Session } from './types';
	import Link from './Link.svelte';

	export let path: string;
	export let session: Session;
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
				{#if !session.user}
					<Link href="/auth/login" activeClass={path === 'auth/login' ? 'underline' : ''}
						>Login</Link
					>
					<Link
						styles="ml-5 font-medium leading-6"
						href="/auth/registration"
						activeClass={path === 'auth/registration' ? 'underline' : ''}
					>
						Register
					</Link>
				{/if}
				<Link
					styles="ml-5 font-medium leading-6"
					rel="prefetch"
					href="/about"
					activeClass={path === 'about' ? 'underline' : ''}
				>
					About
				</Link>
				{#if session.user}
					<div class="inline-flex items-center ml-5">
						<svg class="icon icon-user w-4 h-4 mr-2"><use xlink:href="#icon-user" /></svg>
						<Link
							styles="font-medium leading-6"
							rel="prefetch"
							href="/profile/@{session.user.username}"
							activeClass={path === 'about' ? 'underline' : ''}
						>
							Profile
						</Link>
					</div>
					<div class="inline-flex items-center ml-5">
						<svg class="icon icon-exit w-4 h-4 mr-2"><use xlink:href="#icon-exit" /></svg>
						<Link styles="font-medium leading-6 text-red-600" href={logoutUrl}>Log out</Link>
					</div>
				{/if}
			</nav>
		</div>
	</div>
</header>

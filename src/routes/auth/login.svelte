<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString, redirectOnError } from '$lib/helpers';

	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	export async function load({ page }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/login/browser`,
				status: 302
			};
		}

		try {
			const { status, data: flow } = await kratos.getSelfServiceLoginFlow(flowID);

			if (status !== 200) {
				Promise.reject(flow);
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, '/self-service/login/browser');
		}
	}
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Input from '$lib/Kratos/Input.svelte';
	import Message from '$lib/Kratos/Message.svelte';
	import Link from '$lib/Link.svelte';

	export let ui: UiContainer;

	console.log('node', ui.nodes);
</script>

<h1>Login Form flow</h1>

<Message messages={ui.messages} />
<AuthForm formConfig={ui}>
	<Input fields={ui.nodes} />
	<div class="flex mt-6 justify-center text-xs">
		<Link
			textColor="text-blue-400"
			textHover="hover:text-blue-500"
			rel="prefetch"
			href="/auth/registration">Register new account</Link
		>
		<span class="mx-2 text-gray-300">/</span>
		<Link
			textColor="text-blue-400"
			textHover="hover:text-blue-500"
			rel="prefetch"
			href="/auth/recovery">Reset password</Link
		>
	</div>
</AuthForm>

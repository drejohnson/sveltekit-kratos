<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString, redirectOnError } from '$lib/helpers';

	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	export async function load({ page }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/registration/browser`,
				status: 302
			};
		}

		try {
			const { status, data: flow } = await kratos.getSelfServiceRegistrationFlow(flowID);

			if (status !== 200) {
				return Promise.reject(flow);
			}

			flow.ui.nodes;

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, '/self-service/registration/browser');
		}
	}
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Input from '$lib/Kratos/Input.svelte';
	import Message from '$lib/Kratos/Message.svelte';

	export let ui: UiContainer;

	// TODO: Think of a better way to sort input fields
	const [csrf_token, email, password, firstname, lastname, submit] = ui.nodes;
	const sortedInputNodes = [csrf_token, firstname, lastname, email, password, submit];

	console.log('ui', ui);
</script>

<h1>Registration Form flow</h1>

<Message messages={ui.messages} />
<AuthForm formConfig={ui}>
	<Input fields={sortedInputNodes} />
	<div class="flex mt-6 justify-center text-xs">
		<a class="text-blue-400 hover:text-blue-500" href={`http://127.0.0.1:3000/auth/login`}
			>Already have an account? Log in instead</a
		>
	</div>
</AuthForm>

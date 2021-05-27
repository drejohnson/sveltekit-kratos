<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString, redirectOnError } from '$lib/helpers';

	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	export async function load({ page }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/recovery/browser`,
				status: 302
			};
		}

		try {
			const { status, data: flow } = await kratos.getSelfServiceRecoveryFlow(flowID);

			if (status !== 200) {
				Promise.reject(flow);
				return {
					status,
					error: new Error(`recovery flow error`)
				};
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, '/self-service/recovery/browser');
		}
	}
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Input from '$lib/Kratos/Input.svelte';
	import Message from '$lib/Kratos/Message.svelte';
	import AuthContainer from '$lib/Kratos/AuthContainer.svelte';

	export let ui: UiContainer;
</script>

<AuthContainer flowType="recovery" image="https://source.unsplash.com/-84767CQrS8">
	<div class="px-8 mb-4 text-center">
		<h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
		<p class="mb-4 text-sm text-gray-700">
			We get it, stuff happens. Just enter your email address below and we'll send you a link to
			reset your password!
		</p>
	</div>
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		<Input fields={ui.nodes} />
	</AuthForm>
</AuthContainer>

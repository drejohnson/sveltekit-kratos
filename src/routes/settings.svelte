<script lang="ts" context="module">
	import { Configuration, AdminApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString, redirectOnError } from '$lib/helpers';

	const kratos = new AdminApi(new Configuration({ basePath: config.kratos.admin }));

	export async function load({ page }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/settings/browser`,
				status: 302
			};
		}

		try {
			const { status, data: flow } = await kratos.getSelfServiceSettingsFlow(flowID);

			if (status !== 200) {
				return Promise.reject(flow);
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, '/self-service/settings/browser');
		}
	}
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Input from '$lib/Kratos/Input.svelte';
	import Message from '$lib/Kratos/Message.svelte';

	export let ui: UiContainer;
</script>

<h2>Settings</h2>

<Message messages={ui.messages} />
<AuthForm formConfig={ui}>
	<Input fields={ui.nodes} />
</AuthForm>

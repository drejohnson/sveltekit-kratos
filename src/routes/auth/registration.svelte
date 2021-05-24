<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString } from '$lib/helpers';

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
				Promise.reject(flow);
				return {
					status,
					error: new Error(`Registration flow error`)
				};
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			if (
				error.response.status === 404 ||
				error.response.status === 410 ||
				error.response.status === 403
			) {
				return {
					status: 302,
					redirect: `${config.kratos.public}/self-service/registration/browser`
				};
			}
		}
	}
</script>

<script lang="ts">
	import type { UiContainer, UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import { getAttribute, getTitle } from '$lib/helpers';
	import AuthForm from '$lib/AuthForm.svelte';
	import AuthFormField from '$lib/AuthFormField.svelte';
	export let ui: UiContainer;

	// TODO: Find a better way to sort input fields
	let filteredFields = ui.nodes.filter(
		(node) =>
			(node.attributes as UiNodeInputAttributes).type === 'password' ||
			(node.attributes as UiNodeInputAttributes).type === 'submit'
	);
	let inputNodes = ui.nodes
		.filter(
			(node) =>
				(node.attributes as UiNodeInputAttributes).type !== 'password' &&
				(node.attributes as UiNodeInputAttributes).type !== 'submit'
		)
		.concat(filteredFields);
</script>

<h1>Registration Form flow</h1>

<AuthForm formConfig={ui}>
	{#each inputNodes as node}
		<AuthFormField field={getAttribute(node)} placeholder={getTitle(node)} />
	{/each}
</AuthForm>

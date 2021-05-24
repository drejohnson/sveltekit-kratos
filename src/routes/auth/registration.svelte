<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';

	const isString = (x: any): x is string => typeof x === 'string';

	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	export async function load({ page, fetch, session, context }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			// console.log('No flow ID found in URL, initializing registration flow.');
			return {
				redirect: `${config.kratos.public}/self-service/registration/browser`,
				status: 302
			};
		}

		// console.log('kratos registration flowID: ', flowID);

		const { status, data: flow } = await kratos.getSelfServiceRegistrationFlow(flowID);

		// console.log('kratos registration flow: ', flow.ui.nodes.length);

		if (status !== 200) {
			Promise.reject(flow);
			return {
				status,
				error: new Error(`Registration flow error`)
			};
		}

		// console.log('kratos registration flow ui: ', ui);
		return {
			props: {
				ui: flow.ui
			}
		};
	}

</script>

<script lang="ts">
	import type { UiContainer, UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import { getAttribute, getTitle } from '$lib/helpers';
	import AuthForm from '$lib/AuthForm.svelte';
	import AuthFormField from '$lib/AuthFormField.svelte';
	export let ui: UiContainer;

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

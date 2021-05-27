<script lang="ts" context="module">
	import { Configuration, PublicApi } from '@ory/kratos-client';
	import config from '$lib/config';
	import { isString, redirectOnError } from '$lib/helpers';

	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	export async function load({ page }) {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/verification/browser`,
				status: 302
			};
		}

		try {
			const { status, data: flow } = await kratos.getSelfServiceVerificationFlow(flowID);

			if (status !== 200) {
				return Promise.reject(flow);
				// return {
				// 	status,
				// 	error: new Error(`verification flow error`)
				// };
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, '/self-service/verification/browser');
		}
	}

</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Message from '$lib/Kratos/Message.svelte';
	import AuthContainer from '$lib/Kratos/AuthContainer.svelte';
	import { getUiNodes } from '$lib/helpers';
	import InputHidden from '$lib/Kratos/InputHidden.svelte';
	import InputDefault from '$lib/Kratos/InputDefault.svelte';
	import InputPassword from '$lib/Kratos/InputPassword.svelte';
	import SubmitButton from '$lib/Kratos/SubmitButton.svelte';

	export let ui: UiContainer;
	let nodes = getUiNodes(ui.nodes);

</script>

<AuthContainer flowType="verification">
	<div class="px-8 mb-4 text-center">
		<h3 class="pt-4 mb-2 text-2xl">Verify your email address</h3>
	</div>
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		{#each nodes as { meta: { label }, attributes: { name, type, value, disabled } }}
			{#if type === 'hidden'}
				<InputHidden {name} {value} />
			{/if}
			{#if type === 'email'}
				<InputDefault {name} {type} placeholder="E-Mail" value={value ? value : ''} {disabled} />
			{/if}
			{#if name === 'password'}
				<InputPassword
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{disabled}
				/>
			{/if}
			{#if type === 'submit'}
				<SubmitButton {name} {type} value={value ? value : ''} {disabled}>
					{label?.text}
				</SubmitButton>
			{/if}
		{/each}
	</AuthForm>
</AuthContainer>

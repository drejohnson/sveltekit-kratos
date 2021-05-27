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

<AuthContainer flowType="login" image="https://source.unsplash.com/eqQZGX4-X_A">
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		{#each nodes as { meta: { label }, attributes: { name, type, value, disabled } }}
			{#if type === 'hidden'}
				<InputHidden {name} {value} />
			{/if}
			{#if type === 'text'}
				<InputDefault
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{disabled}
				/>
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

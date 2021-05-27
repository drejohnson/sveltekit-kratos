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
	import AuthContainer from '$lib/Kratos/AuthContainer.svelte';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import { getUiNodes } from '$lib/helpers';
	import InputHidden from '$lib/Kratos/InputHidden.svelte';
	import InputDefault from '$lib/Kratos/InputDefault.svelte';
	import InputPassword from '$lib/Kratos/InputPassword.svelte';
	import SubmitButton from '$lib/Kratos/SubmitButton.svelte';
	import Message from '$lib/Kratos/Message.svelte';

	export let ui: UiContainer;

	let focused = false;
	let strength = 0;
	let validations = [];
	let passwordValue: string;

	const superStrongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?!.*(.)\1\1)(?=.{16,})/;
	const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?!.*(.)\1\1)(?=.{8,})/;
	const mediumPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

	const validatePassword = (e: Event) => {
		passwordValue = (<HTMLInputElement>e.target).value;
		validations = [
			passwordValue.search(mediumPassword) > -1,
			passwordValue.search(strongPassword) > -1,
			passwordValue.search(superStrongPassword) > -1
		];
		strength = validations.reduce((acc, cur) => acc + cur, 0);
	};

	const onFocus = () => (focused = true);

	let nodes = getUiNodes(ui.nodes);

	// TODO: Think of a better way to sort input fields
	const [csrf_token, email, password, firstname, lastname, submit] = nodes;
	const sortedNodes = [csrf_token, firstname, lastname, email, password, submit];

	console.log('ui', ui);
</script>

<AuthContainer flowType="registration" image="https://source.unsplash.com/_kdTyfnUFAc">
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		{#each sortedNodes as { messages, meta: { label }, attributes: { name, type, value, disabled } }}
			{#if type === 'hidden'}
				<InputHidden {name} {value} />
			{/if}
			{#if type === 'email' || type === 'text'}
				<InputDefault
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{messages}
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
					{messages}
					on:focus={onFocus}
					on:input={(e) => validatePassword(e)}
				/>
				<div class="flex justify-between items-center pt-2">
					<div class="text-xs text-gray-600" id="passwordHelp">
						Your password must be at least 6 characters long.
						<span class="text-xl text-green-700 font-bold"
							>{passwordValue?.length > 5 ? '✓' : ''}</span
						>
					</div>
					{#if focused && passwordValue?.length > 0}
						{#if strength < 1}
							<div class="text-red-700">Weak</div>
						{/if}
						{#if strength > 0 && strength < 2}
							<div class="text-yellow-600">Medium</div>
						{/if}
						{#if strength > 1 && strength < 3}
							<div class="text-green-400">Really Strong</div>
						{/if}
						{#if strength > 2}
							<div class="text-green-700 font-bold">Super secure</div>
						{/if}
					{/if}
				</div>
			{/if}
			{#if type === 'submit'}
				<SubmitButton {name} {type} value={value ? value : ''} {disabled}>
					{label?.text}
				</SubmitButton>
			{/if}
		{/each}
	</AuthForm>
</AuthContainer>

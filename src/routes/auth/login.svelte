<script lang="ts" context="module">
	import { createLoad } from './_load';

	export const load = createLoad('login');
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

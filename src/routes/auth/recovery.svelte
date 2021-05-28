<script lang="ts" context="module">
	import { createLoad } from './_load';

	export const load = createLoad('recovery');
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
		{#each nodes as { messages, meta: { label }, attributes: { name, type, value, disabled } }}
			{#if type === 'hidden'}
				<InputHidden {name} {value} />
			{/if}
			{#if type === 'email'}
				<InputDefault
					{name}
					{type}
					placeholder="E-Mail"
					value={value ? value : ''}
					{disabled}
					{messages}
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

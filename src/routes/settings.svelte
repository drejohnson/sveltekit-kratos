<script lang="ts" context="module">
	import { createLoad } from './auth/_load';

	export const load = createLoad('settings');
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import { getTitle, getUiNodes, onlyNodes } from '$lib/helpers';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Message from '$lib/Kratos/Message.svelte';
	import InputHidden from '$lib/Kratos/InputHidden.svelte';
	import InputDefault from '$lib/Kratos/InputDefault.svelte';
	import InputPassword from '$lib/Kratos/InputPassword.svelte';
	import SubmitButton from '$lib/Kratos/SubmitButton.svelte';
	import FormSectionHeader from '$lib/Kratos/FormSectionHeader.svelte';

	export let ui: UiContainer;
	let nodes = getUiNodes(ui.nodes);
	const showLabel = true;
</script>

<div class="w-full md:w-1/2 flex flex-col px-8 md:p-0 mt-28">
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		<FormSectionHeader text="Update Profile Info" />
		{#each nodes as { messages, meta: { label }, attributes: { name, type, value, disabled } }}
			{#if type === 'hidden'}
				<InputHidden {name} {value} />
			{/if}
			{#if type === 'email' || name === 'traits.username'}
				<InputDefault
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{disabled}
					{messages}
					{showLabel}
				>
					<label slot="label" for={name} class="form-label_settings">
						{#if showLabel}
							{name === 'traits.username' ? 'Username' : label?.text}
						{/if}
					</label>
				</InputDefault>
			{/if}

			{#if name === 'traits.name.first' || name === 'traits.name.last'}
				<InputDefault
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{disabled}
					{messages}
					{showLabel}
				>
					<label slot="label" for={name} class="form-label_settings">
						{#if showLabel}
							{label?.text}
						{/if}
					</label>
				</InputDefault>
			{/if}
			{#if type === 'password'}
				<FormSectionHeader text="Update Password" />
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
</div>

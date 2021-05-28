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

	export let ui: UiContainer;
	let nodes = getUiNodes(ui.nodes);
</script>

<div class="w-full md:w-1/2 flex flex-col px-8 md:p-0 mt-28">
	<Message messages={ui.messages} />
	<AuthForm formConfig={ui}>
		<div class="relative mt-6">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t border-gray-300" />
			</div>
			<div class="relative flex justify-center text-sm leading-5">
				<span class="px-2 text-gray-500 bg-white"> Update Profile Info </span>
			</div>
		</div>
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
				/>
			{/if}

			{#if name === 'traits.name.first' || name === 'traits.name.last'}
				<InputDefault
					{name}
					{type}
					placeholder={label?.text}
					value={value ? value : ''}
					{disabled}
					{messages}
				/>
			{/if}
			{#if type === 'password'}
				<div class="relative mt-6">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300" />
					</div>
					<div class="relative flex justify-center text-sm leading-5">
						<span class="px-2 text-gray-500 bg-white"> Update Password </span>
					</div>
				</div>
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

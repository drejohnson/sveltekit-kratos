<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import config from '$lib/config';
	import { isString } from '$lib/helpers';
	import type { AuthFlowType } from '$lib/types';

	export const load: Load = async ({ page, fetch, session }) => {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				status: 302,
				redirect: `${config.kratos.public}/self-service/settings/browser`
			};
		}

		const res = await fetch(`/api/auth/settings`, {
			headers: {
				flow_id: flowID
			}
		});

		if (!res.ok) {
			return {
				status: 302,
				redirect: `${config.kratos.public}/self-service/settings/browser`
			};
		}

		const { status, data: flow }: { status: number; data: AuthFlowType } = await res.json();

		if (status !== 200) {
			throw flow;
		}

		return {
			props: {
				ui: flow.ui,
				session: session.user ? session : undefined
			}
		};
	};

</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UiContainer } from '@ory/kratos-client';
	import { getUiNodes } from '$lib/helpers';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Message from '$lib/Kratos/Message.svelte';
	import InputHidden from '$lib/Kratos/InputHidden.svelte';
	import InputDefault from '$lib/Kratos/InputDefault.svelte';
	import InputPassword from '$lib/Kratos/InputPassword.svelte';
	import SubmitButton from '$lib/Kratos/SubmitButton.svelte';
	import FormSectionHeader from '$lib/Kratos/FormSectionHeader.svelte';
	import Confirm from '$lib/Confirm.svelte';
	import type { UserSession } from '$lib/types';

	export let ui: UiContainer;
	export let session: UserSession;
	let nodes = getUiNodes(ui.nodes);
	let open = false;
	const showLabel = true;

	async function deleteUser(id: string) {
		const res = await fetch('/api/auth/delete', {
			method: 'DELETE',
			body: JSON.stringify({ id })
		});

		const { success } = await res.json();

		if (success) {
			await goto('/auth/login');
			open = false;
		}
	}

</script>

<div class="relative w-full md:w-1/2 flex flex-col px-8 md:p-0 mt-28">
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
	<button
		on:click|preventDefault={() => (open = true)}
		class="bg-red-600 text-white font-bold text-lg hover:bg-red-700 w-full p-2 mt-8 transition"
		>Delete</button
	>
	<Confirm
		danger
		bind:open
		modalHeading="Are you sure you want to delete your account?"
		primaryButtonText="Delete"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:open
		on:close
		on:submit={() => deleteUser(session.user.id)}
	>
		<p class="text-xl">This is a permanent action and cannot be undone.</p>
	</Confirm>
</div>

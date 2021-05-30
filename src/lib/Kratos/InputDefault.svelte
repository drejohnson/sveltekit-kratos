<script lang="ts">
	import type { UiText } from '@ory/kratos-client';
	import Message from './Message.svelte';

	export let name: string;
	export let value: string;
	export let type: string;
	export let placeholder: string;
	export let disabled: boolean;
	export let messages: UiText[];
	export let showLabel = false;
</script>

<div class="field">
	<slot name="label">
		<label for={name} class="form-label">
			{#if showLabel}
				{name === 'traits.username' ? 'Username' : placeholder}
			{/if}
		</label>
	</slot>
	<input
		class="input"
		{name}
		{type}
		value={value ? value : ''}
		{placeholder}
		{disabled}
		{...$$restProps}
	/>
</div>

<Message {messages} />

<style lang="postcss">
	.input {
		&:valid {
			color: inherit;
		}
		&:invalid {
			color: indianred;
		}
	}
</style>

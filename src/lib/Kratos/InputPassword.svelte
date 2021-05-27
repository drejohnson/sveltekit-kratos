<script lang="ts">
	import type { UiText } from '@ory/kratos-client';

	import PasswordToggle from './PasswordToggle.svelte';
	import Message from './Message.svelte';

	export let name: string;
	export let value: string;
	export let type: string;
	export let placeholder: string;
	export let disabled: boolean;
	export let messages: UiText[];

	let showPassword: boolean;

	const togglePassword = () => (showPassword = !showPassword);
</script>

<div class="field">
	<label for={name} class="form-label" />
	<input
		class="input"
		{name}
		type={showPassword ? 'text' : type}
		{value}
		{placeholder}
		{disabled}
		on:input
		on:focus
	/>
	<PasswordToggle {showPassword} on:click={togglePassword} />
</div>

<Message {messages} />

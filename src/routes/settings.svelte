<script lang="ts" context="module">
	import { createLoad } from './auth/_load';

	export const load = createLoad('settings');
</script>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	import AuthForm from '$lib/Kratos/AuthForm.svelte';
	import Input from '$lib/Kratos/Input.svelte';
	import Message from '$lib/Kratos/Message.svelte';

	export let ui: UiContainer;
</script>

<h2>Settings</h2>

<Message messages={ui.messages} />
<AuthForm formConfig={ui}>
	<Input fields={ui.nodes} />
</AuthForm>

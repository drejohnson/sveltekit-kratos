<script lang="ts">
	import type { UiNodeInputAttributes } from '@ory/kratos-client';
	export let field: UiNodeInputAttributes;

	let inputEl: HTMLInputElement;
	export let placeholder: string;

</script>

<div class={`form-group ${field.type !== 'hidden' ? 'visible' : 'd-none'}`}>
	<label for={field.name} class="form-label" />
	<input
		bind:this={inputEl}
		class="form-control"
		disabled={field.disabled}
		id={field.name}
		name={field.name}
		pattern={field.pattern}
		{placeholder}
		required={field.required}
		type={field.type}
	/>
</div>

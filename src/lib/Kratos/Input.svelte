<script lang="ts">
	import { getTitle } from '$lib/helpers';

	import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	export let fields: UiNode[];

	let attributes = fields.map((f) => {
		let attrs = f.attributes as UiNodeInputAttributes;
		const { value } = attrs;
		const v = value as string | number | string[];
		let placeholder = getTitle(f);
		return { ...f, ...attrs, value: v, placeholder };
	});

	let inputEl: HTMLInputElement;
	console.log('attr', attributes);
</script>

{#each attributes as attribute}
	<!-- content here -->
	<div class={`form-group ${attribute.type !== 'hidden' ? 'visible' : 'd-none'}`}>
		{#if attribute.type !== 'submit'}
			<label for={attribute.name} class="form-label" />
			<input
				bind:this={inputEl}
				class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
				disabled={attribute.disabled}
				id={attribute.name}
				name={attribute.name}
				value={attribute.value ? attribute.value : ''}
				pattern={attribute.pattern}
				placeholder={attribute.placeholder}
				required={attribute.required}
				type={attribute.type}
			/>
		{/if}
		{#if attribute.type === 'submit'}
			<button
				class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
				name={attribute.name}
				type={attribute.type}
				value={attribute.value}
				disabled={attribute.disabled}
			>
				{attribute.placeholder}
			</button>
		{/if}
	</div>
{/each}

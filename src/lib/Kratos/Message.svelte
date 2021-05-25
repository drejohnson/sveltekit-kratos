<script lang="ts">
	import type { UiText } from '@ory/kratos-client';
	export let messages: UiText[];
</script>

{#if messages}
	{#each messages as { type, text }}
		<div
			class="mb-0 {type === 'error'
				? 'text-danger'
				: type === 'warn'
				? 'text-warning'
				: 'text-primary'}"
		>
			{text}
		</div>
	{/each}
{/if}

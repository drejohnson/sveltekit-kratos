<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	export let formConfig: UiContainer;
</script>

<form
	class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
	action={formConfig.action}
	method={formConfig.method}
	enctype="application/x-www-form-urlencoded"
	{...$$restProps}
>
	<slot />
</form>

<script lang="ts">
	import type { UiContainer } from '@ory/kratos-client';
	export let formConfig: UiContainer;
</script>

<form
	class="flex flex-col pt-3 md:pt-8"
	action={formConfig.action}
	method={formConfig.method}
	enctype="application/x-www-form-urlencoded"
	{...$$restProps}
>
	<slot />
</form>

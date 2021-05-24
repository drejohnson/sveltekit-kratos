<script lang="ts">
  import type { UiContainer } from '@ory/kratos-client';
  export let formConfig: UiContainer;

</script>

<form
  action={formConfig.action}
  method={formConfig.method}
  enctype="application/x-www-form-urlencoded"
  {...$$restProps}
>
  <slot />
</form>

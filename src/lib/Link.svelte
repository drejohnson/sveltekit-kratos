<script lang="ts">
	export let href: string;
	export let activeClass: string = '';

</script>

<a
	class="ml-5 font-medium leading-6 text-black hover:text-red {activeClass}"
	{href}
	{...$$restProps}
>
	<slot />
</a>

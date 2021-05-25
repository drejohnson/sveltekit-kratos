<script lang="ts">
	export let href: string;
	export let activeClass: string = '';
	export let textColor: string = '';
	export let textHover: string = '';
	export let styles: string = '';
</script>

<a
	class="{textColor ? textColor : 'text-black'} {textHover
		? textHover
		: ''} hover:underline {styles} {activeClass}"
	{href}
	{...$$restProps}
>
	<slot />
</a>

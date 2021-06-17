<script lang="ts">
	export let name: string;
	export let value: string = '';
	export let type: string;
	export let disabled: boolean = false;

</script>

<button
	class="bg-black text-white font-bold text-lg hover:bg-gray-700 w-full p-2 mt-8"
	{name}
	{type}
	{value}
	{disabled}
	on:click
>
	<slot />
</button>

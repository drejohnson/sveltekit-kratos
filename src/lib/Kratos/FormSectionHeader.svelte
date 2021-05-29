<script lang="ts">
	export let text: string;
</script>

<div class="relative mt-6">
	<div class="absolute inset-0 flex items-center">
		<div class="w-full border-t border-gray-300" />
	</div>
	<div class="relative flex justify-center text-xl leading-5">
		<span class="px-2 text-gray-500 bg-white"> {text} </span>
	</div>
</div>

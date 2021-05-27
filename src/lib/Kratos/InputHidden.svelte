<script lang="ts">
	export let name: string;
	export let value: string;
</script>

<input class="input" {name} type="hidden" {value} />

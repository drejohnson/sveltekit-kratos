<script lang="ts">
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	export let open = false;
	export let danger = false;
	export let preventCloseOnClickOutside = false;
	export let modalHeading = '';
	export let modalLabel = '';
	export let modalAriaLabel = '';
	export let iconDescription = 'Close the modal';
	export let ref: HTMLElement = null;
	export let primaryButtonDisabled = false;
	export let primaryButtonText = '';
	export let secondaryButtonText = '';

	let buttonRef: HTMLButtonElement = null;
	let innerModal: HTMLElement = null;
	let opened = false;
	let didClickInnerModal = false;
	let shouldSubmitOnEnter = true;

	$: ariaLabel = modalLabel || $$props['aria-label'] || modalAriaLabel || modalHeading;

	function focus(element?: HTMLElement) {
		const node = element || buttonRef;
		node.focus();
	}

	onMount(() => {
		return () => {
			document.body.classList.remove('modal-open');
		};
	});

	afterUpdate(() => {
		if (opened) {
			if (!open) {
				opened = false;
				dispatch('close');
				document.body.classList.remove('modal-open');
			}
		} else if (open) {
			opened = true;
			focus();
			dispatch('open');
			document.body.classList.add('modal-open');
		}
	});

</script>

{#if open}
	<div
		bind:this={ref}
		role="presentation"
		class="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-screen bg-black bg-opacity-50 text-black"
		class:visible={open}
		on:keydown
		on:keydown={({ key }) => {
			if (open) {
				if (key === 'Escape') {
					open = false;
				} else if (shouldSubmitOnEnter && key === 'Enter') {
					dispatch('submit');
				}
			}
		}}
		on:click
		on:click={() => {
			if (!didClickInnerModal && !preventCloseOnClickOutside) open = false;
			didClickInnerModal = false;
		}}
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:transitionend={(e) => {
			if (e.propertyName === 'transform') {
				dispatch('transitionend', { open });
			}
		}}
		in:fade={{ duration: 200 }}
		out:fade={{ delay: 200, duration: 200 }}
		{...$$restProps}
	>
		<div
			bind:this={innerModal}
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-label={ariaLabel}
			class="top-0 grid grid-rows-2 w-4/5 h-auto bg-white overflow-hidden outline-none"
			on:click={() => {
				didClickInnerModal = true;
			}}
			in:fly={{
				y: -10,
				delay: 200,
				duration: 200
			}}
			out:fly={{
				y: -10,
				duration: 200
			}}
		>
			<div class="header relative row-span-1 col-span-full pr-24 pt-4 pl-4 mb-2">
				{#if modalLabel}
					<h2 class="text-2xl">
						<slot name="label">{modalLabel}</slot>
					</h2>
				{/if}
				<h3 class="flex justify-start items-center text-2xl">
					<span class="text-red-600 pr-4">
						<svg class="icon icon-warning1 w-8 h-8 fill-current"
							><use xlink:href="#icon-warning1" /></svg
						>
					</span>
					<slot name="heading">{modalHeading}</slot>
				</h3>
				<button
					bind:this={buttonRef}
					type="button"
					aria-label={iconDescription}
					title={iconDescription}
					class="absolute flex justify-center items-center top-0 right-0 w-12 h-12 p-3 overflow-hidden border-2 border-solid border-transparent focus:outline-none focus:border-black"
					on:click={() => {
						open = false;
					}}
				>
					<svg class="icon icon-cross w-6 h-6 fill-current"><use xlink:href="#icon-cross" /></svg>
				</button>
			</div>
			<div class="content relative row-span-2 col-span-full p-4 mb-12 overflow-y-auto">
				<slot />
			</div>
			<div class="footer grid grid-cols-2 h-16">
				<button
					class="secondary bg-gray-500  text-white"
					on:click={() => {
						dispatch('click:button--secondary');
					}}
				>
					{secondaryButtonText}
				</button>
				<button
					class="{danger ? 'bg-red-600' : 'bg-green-600'} text-white"
					disabled={primaryButtonDisabled}
					on:click={() => {
						dispatch('submit');
					}}
				>
					{primaryButtonText}
				</button>
			</div>
		</div>
	</div>
{/if}

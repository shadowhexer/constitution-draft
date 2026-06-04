<script>
	import Icon from './Icon.svelte';
	let { name, onSelect } = $props();
</script>

<div class="flex items-start gap-2">
	<span
		class="transition-transform duration-200 [details[open]>summary_&]:rotate-90 select-none text-xs"
	>
		<Icon
			title="chevron-right"
			path="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
			class=""
		/>
	</span>
	<p class="font-medium text-base-content">{name}</p>
</div>
<button class="hover:cursor-pointer" onclick={onSelect}>
	<Icon
		title="chevron-right"
		path="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
		class="w-6 h-6 fill-current text-base-content/50 hover:text-base-content transition-colors"
	/>
</button>

<script>
	import Icon from './Icon.svelte';
	let { header } = $props();
</script>

<header class="bg-base-300 py-4 border-b">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
		{#each header as head, index}
			{@const isLAst = index === header.length - 1}
			{#if !isLAst}
				<a href={head.url} class="text-base-content/70">
					{head.name}
				</a>
				<span
					><Icon
						path="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
						class="w-5 h-5 fill-current text-base-content/70 mx-2"
					/></span
				>
			{:else}
				<p class="font-semibold text-base-content pointer-events-none">
					{head.name}
				</p>
			{/if}
		{/each}
	</div>
</header>

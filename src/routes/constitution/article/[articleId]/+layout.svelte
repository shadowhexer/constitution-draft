<script>
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();

	// We use a derived-style getter to stay reactive
	// This will be undefined until the page finishes loading
	const article = $derived(page.data.articles?.find((a) => a.id == page.params?.articleId));
</script>

<div>
	<Header header={`Article ${article.id}: ${article.article}`} />
	{@render children?.()}
</div>

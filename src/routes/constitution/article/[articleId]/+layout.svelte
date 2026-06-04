<script>
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();

	// We use a derived-style getter to stay reactive
	// This will be undefined until the page finishes loading
	const articleId = page.params?.articleId;
	const article = page.data.articles?.find((a) => a.id == articleId);
</script>

<svelte:head>
	<title>{article.article} - Constitution</title>
</svelte:head>
<div>
	<Header header={`Article ${article.id}: ${article.article}`} />
	{@render children?.()}
</div>

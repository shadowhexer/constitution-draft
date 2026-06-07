<script>
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();

	// We use a derived-style getter to stay reactive
	// This will be undefined until the page finishes loading
	const article = $derived(page.data.articles?.find((a) => a?.id == page.params?.articleId) || []);

	const navItems = $derived.by(() => {
		const articleId = page.params?.articleId;
		const sectionId = page.params?.sectionId;
		// Start with the top-level parent route by defaul
		const items = [{ name: 'Home', url: '/constitution' }];

		// If we are inside an article, add the article node pointing to itself
		if (articleId) {
			items.push({
				name: `Article ${articleId}`,
				url: `/constitution/article/${articleId}`
			});
		}

		// If we are inside a section, add the section node pointing to itself
		if (sectionId) {
			items.push({
				name: `Section ${sectionId}`,
				url: `/constitution/article/${articleId}/section/${sectionId}`
			});
		}
		return items;
	});
</script>

<div>
	{#if article && article.section?.length > 0}
		<Header header={navItems} />
	{/if}
	{@render children?.()}
</div>

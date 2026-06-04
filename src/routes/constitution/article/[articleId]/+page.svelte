<script>
	import { page } from '$app/state';
	import Card from '$lib/components/Card.svelte';

	// Using .find() returns the single article object so we can access its sections safely
	const sections = $derived(
		page.data.articles?.find((a) => a.id === Number(page.params?.articleId))?.section || []
	);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex flex-col gap-10 max-w-400">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each sections as section, index (section.id)}
				{@const subSectionCount = section?.subsection?.length || 0}
				<Card
					tags={section.tag}
					sectionCount={`${subSectionCount} ${subSectionCount === 1 ? 'clause' : 'clauses'}`}
					link={`/constitution/article/${page.params.articleId}/section/${section.id}`}
					title={`Section ${index + 1}: ${section.name}`}
					summary={section.summary}
				></Card>
			{/each}
		</div>
	</div>
</div>

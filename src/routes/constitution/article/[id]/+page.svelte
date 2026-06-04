<script>
	import { page } from '$app/state';
	import Card from '$lib/components/Card.svelte';

	const sections = $derived(
		page.data.sections?.filter((s) => s.article_id === Number(page.params?.id))
	);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex flex-col gap-10 max-w-400">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each sections as section, index (section.id)}
				<Card
					tags={section.tag}
					sectionCount={`${section.subSectionCount} ${section.subSectionCount > 1 ? 'clauses' : 'clause'}`}
					link={`/constitution/article/${section.article_id}/section/${section.id}`}
					title={`Section ${index + 1}: ${section.name}`}
					summary={section.summary}
				></Card>
			{/each}
		</div>
	</div>
</div>

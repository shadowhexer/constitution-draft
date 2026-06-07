<script>
	import { page } from '$app/state';
	import NotFound from '$lib/assets/404.png';
	import Card from '$lib/components/Card.svelte';

	// Using .find() returns the single article object so we can access its sections safely
	const sections = $derived(
		page.data.articles?.find((a) => a?.id === Number(page.params?.articleId))?.section || []
	);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex flex-col gap-10 max-w-400">
		{#if sections && sections?.length > 0 && page.params.articleId}
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
		{:else}
			<div class="max-w-100 mx-auto text-center">
				<div
					style="background-image: url({NotFound})"
					class="bg-center bg-cover bg-no-repeat pointer-events-none min-w-50 min-h-100"
				></div>
				<h2 class="text-xl font-semibold text-base-content">Article Not Found</h2>
				<p class="text-gray-500 mt-2">
					The article you are looking for does not exist in this area.
				</p>
				<a
					href={`/constitution/`}
					class="mt-4 inline-block font-medium text-blue-600 hover:underline"
				>
					Back to Home
				</a>
			</div>
		{/if}
	</div>
</div>

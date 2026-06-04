<script>
	import { page } from '$app/state';
	const article = $derived(
		page.data.articles?.find((a) => a.id === Number(page.params?.articleId))
	);

	// 2. Find the specific section inside that parent article
	const section = $derived(article?.section?.find((s) => s.id === Number(page.params?.sectionId)));
</script>

<article class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<section
		class="p-8 sm:p-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md rounded-xl"
	>
		<div class="prose prose-slate dark:prose-invert max-w-none">
			{#if section.subsection && section.subsection.length > 0}
				<p class="font-serif text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
					Section {section?.id}: {section?.name}
				</p>
				<div class="flex flex-col gap-5 text-justify">
					{#each section.subsection as subsection, index}
						{@const subLength = section.subsection?.length > 1}
						<p
							class="leading-8 text-slate-700 dark:text-slate-300 text-lg border-l-4 pl-6 py-2 transition-all border-slate-200 dark:border-slate-800 {subLength
								? 'ml-7'
								: 'indent-10'}"
						>
							{#if subLength}
								<span class="font-semibold">{index + 1}.</span>
							{/if}
							{subsection}
						</p>
					{/each}
				</div>
			{:else}
				<div class="text-center py-24">
					<h2 class="text-xl font-semibold text-gray-900">Section Not Found</h2>
					<p class="text-gray-500 mt-2">
						The section you are looking for does not exist in this article dataset.
					</p>
					<a
						href={`/constitution/article/${page.params?.articleId}`}
						class="mt-4 inline-block font-medium text-blue-600 hover:underline"
					>
						Back to Article overview
					</a>
				</div>
			{/if}
		</div>
	</section>
</article>

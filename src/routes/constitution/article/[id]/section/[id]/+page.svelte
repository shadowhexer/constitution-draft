<script>
	import { page } from '$app/state';
	let { data } = $props();

	const pageSection = $derived(page.data.sections);
	const subSection = $derived(data.subSection);
	const section = $derived(pageSection?.find((s) => s.id == subSection[0]?.section_id));
</script>

<article class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<section
		class="p-8 sm:p-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md rounded-xl"
	>
		<div class="prose prose-slate dark:prose-invert max-w-none">
			{#if subSection.length > 0}
				<p class="font-serif text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
					Section {section?.id}: {section?.name}
				</p>
				<div class="flex flex-col gap-5 text-justify">
					{#each subSection as subsection, index (subsection.id)}
						{@const subLength = data.subSection?.length > 1}
						<p
							class="leading-8 text-slate-700 dark:text-slate-300 text-lg border-l-4 pl-6 py-2 transition-all border-slate-200 dark:border-slate-800 {subLength
								? 'ml-7'
								: 'indent-10'}"
						>
							{#if subLength}
								<span class="font-semibold">{index + 1}.</span>
							{/if}
							{subsection?.content}
						</p>
					{/each}
				</div>
			{:else}
				<p class="text-lg text-center text-base-content/40">Content does not exist</p>
			{/if}
		</div>
	</section>
</article>

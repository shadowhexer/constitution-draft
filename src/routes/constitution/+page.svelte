<script>
	import Card from '$lib/components/Card.svelte';
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	let { data } = $props();
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex flex-col gap-10 max-w-400">
		<div
			class="overflow-hidden bg-linear-to-br rounded-xl border border-slate-200 dark:border-slate-800 from-slate-200 to-white dark:from-slate-800 dark:to-slate-900"
		>
			<div class="p-8 sm:p-12">
				<div class="">
					<p
						class="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight"
					>
						Preamble
					</p>
					<p
						class="line-clamp-3 text-justify text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed"
					>
						The once sovereign kingdoms and states were united by the Spanish colonial government in
						the name of King Felipe II, from where the name Philippines is derived from. During the
						333 years of Spanish colonial rule, the multinational people of the Philippines had been
						in struggle with the inequality brought by class division, oppression of the lower
						class, the unfair treatment of the Spanish colonial government, and the abuse of the
						Church among other things. The struggle continued under the 48 years of American
						colonisation and three (3) years under Japanese control.
					</p>
					<a
						href={resolve('/constitution/preamble')}
						class="text-sm bg-base-content p-2 text-base-300 w-35 text-center rounded-md"
						>Read Full Article</a
					>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-3">
			<p class="font-bold text-xl">All Articles</p>
			<p class="opacity-60">Explore the structure and contents of the Draft</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.articles as article, index (article.id)}
				{@const sectionCount = article?.section.length}
				<Card
					tags={article.tag}
					sectionCount={`${sectionCount} ${sectionCount > 1 ? 'sections' : 'section'}`}
					link={`/constitution/article/${article.id}`}
					title={`Article ${index + 1}: ${article.article}`}
					summary={article.summary}
				></Card>
			{/each}
		</div>
	</div>
</div>

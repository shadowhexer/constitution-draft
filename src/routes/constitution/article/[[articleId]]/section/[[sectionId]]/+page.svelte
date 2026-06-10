<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import NotFound from '$lib/assets/404.png';
	import Icon from '$lib/components/Icon.svelte';

	const article = $derived(
		page.data.articles?.find((a) => a?.id === Number(page.params?.articleId))
	);

	const section = $derived(article?.section?.find((s) => s?.id === Number(page.params?.sectionId)));

	const nav = $derived.by(() => {
		// 1. Flatten all sections across all articles into a single linear map
		const flatNavigation =
			page.data.articles?.flatMap((art) =>
				art.section.map((sec, idx) => ({
					path: `/constitution/article/${art.id}/section/${sec.id}`,
					label: `${idx + 1} / ${art.section.length}`,
					matchKey: `${art.id}-${sec.id}`
				}))
			) || [];
		const total = flatNavigation.length;
		const currentIdx = flatNavigation.findIndex(
			(n) => n.matchKey === `${page.params.articleId}-${page.params.sectionId}`
		);

		if (currentIdx === -1) return { prev: '#', next: '#', current: '' };

		return {
			// (currentIdx - 1 + total) % total handles the backward loop safely
			prev: flatNavigation[(currentIdx - 1 + total) % total].path,
			next: flatNavigation[(currentIdx + 1) % total].path,
			current: flatNavigation[currentIdx].label
		};
	});

	let isMobile = $state(false);
	onMount(() => {
		// Match Tailwind's md breakpoint boundary (768px)
		const mediaQuery = window.matchMedia('(max-width: 767px)');

		// Set the initial value on mount
		isMobile = mediaQuery.matches;

		// Listen for realtime browser resizing/orientation changes
		const handler = (e) => (isMobile = e.matches);
		mediaQuery.addEventListener('change', handler);

		// Clean up listener when element destroys
		return () => mediaQuery.removeEventListener('change', handler);
	});
</script>

<article class="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<section
		class="p-8 sm:p-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md rounded-xl"
	>
		<div class="prose prose-slate dark:prose-invert max-w-none">
			{#if section?.subsection && section?.subsection.length > 0 && page.params?.sectionId}
				<p class="font-serif md:text-4xl text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
					Section {section?.id}: {section?.name}
				</p>
				<div class="flex flex-col gap-5 text-justify">
					{#each section.subsection as subsection, index}
						{@const subLength = section.subsection?.length > 1}
						<p
							class="whitespace-pre-wrap leading-8 text-slate-700 dark:text-slate-300 md:text-lg md:border-l-4 pl-6 py-2 transition-all border-slate-200 dark:border-slate-800 {subLength
								? 'md:ml-7'
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
				<div class="max-w-100 mx-auto text-center">
					<div
						style="background-image: url({NotFound})"
						class="bg-center bg-cover bg-no-repeat pointer-events-none min-w-50 min-h-100"
					></div>
					<h2 class="text-xl font-semibold text-base-content">Section Not Found</h2>
					<p class="text-gray-500 mt-2">
						The section you are looking for does not exist in this article.
					</p>

					<a
						href={page.params?.sectionId
							? `/constitution/article/${page.params?.articleId}`
							: `/constitution`}
						class="mt-4 inline-block font-medium text-blue-600 hover:underline"
					>
						Back to {page.params.sectionId ? 'Article overview' : 'Home'}
					</a>
				</div>
			{/if}
			{#if page.params?.sectionId && Number(page.params?.sectionId) <= article?.section?.length}
				<div class="flex gap-5 justify-center mt-10">
					<a
						href={nav.prev}
						class="rounded-xl bg-black dark:bg-white text-base-300 py-2 px-4 min-w-20 group transition duration-150 ease-in-out hover:cursor-pointer hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none flex flex-row-reverse gap-1 items-center"
					>
						Prev
						<span>
							<Icon
								path="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"
								class="w-6 h-6 fill-current transition-transform duration-150 ease-in-out group-hover:-translate-x-0.5"
							/>
						</span>
					</a>

					<p class="text-base-content/70 py-2">{nav.current}</p>

					<a
						href={nav.next}
						class="rounded-xl bg-black dark:bg-white text-base-300 py-2 px-4 min-w-20 group transition duration-150 ease-in-out hover:cursor-pointer hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none flex gap-1 items-center"
					>
						Next
						<span>
							<Icon
								path="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z"
								class="w-6 h-6 fill-current transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
							/>
						</span>
					</a>
				</div>
			{/if}
		</div>
	</section>
</article>

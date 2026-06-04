<script>
	import { text } from '@sveltejs/kit';
	import Icon from '$lib/components/Icon.svelte';
	import PanelList from '$lib/components/PanelList.svelte';
	import EditorField from '$lib/components/EditorField.svelte';

	let { data } = $props();

	let result = $derived(selected);
	$effect(() => {
		// Only alert if result actually has a value
		// alert(JSON.stringify(onSelect.current.subsection?.content));
	});

	const onSelect = (() => {
		let selected = $state(
			/** @type {{ article: any; section: any; subsection: any; }} */
			({
				article: null,
				section: null,
				subsection: null
			})
		);

		let isNothingSelected = $derived(
			Object.values(onSelect.current ?? {}).every((value) => value === null)
		);
		return {
			article: (article) => {
				selected.article = article;
				selected.section = null;
				selected.subsection = null;
			},
			section: (article, section) => {
				if (!article) return;
				selected.article = article;
				selected.section = section;
				selected.subsection = null;
			},
			subsection: (article, section, subsection) => {
				if (!article || !section) return;
				selected.article = article;
				selected.section = section;
				selected.subsection = subsection;
			},
			get current() {
				return selected;
			},
			get isNull() {
				return isNothingSelected;
			}
		};
	})();
</script>

<svelte:head><title>Panel</title></svelte:head>
<div>
	<div class="sm:flex block mx-auto h-auto w-300 bg-base-200 mt-10 shadow-md">
		<div class="py-5 px-7 m-5 shadow-sm sm:text-wrap bg-base-100 flex-1">
			{#each data.articles as article (article.id)}
				{@const sections = data.sections.filter((s) => article.id === s.article_id)}
				<details name="article" class="py-1">
					<PanelList name={article.name} onSelect={() => onSelect.article(article)} />

					{#each sections as section (section.id)}
						{@const subsections = data.subsections.filter((s) => section.id === s.section_id)}
						<details class="pl-5 py-1" name="section">
							<PanelList name={section.name} onSelect={() => onSelect.section(article, section)} />

							<ul>
								{#each subsections as subsection, index (subsection.id)}
									<li
										class="ml-10 p-1 hover:cursor-pointer hover:text-blue-400 list-disc"
										onclick={() => onSelect.subsection(article, section, subsection)}
									>
										Clause {index + 1}
									</li>
								{/each}
							</ul>
						</details>
					{/each}
				</details>
			{/each}
		</div>

		<div
			class="flex flex-col justify-center flex-1 py-5 px-7 w-100 gap-10 m-5 bg-base-100 shadow-sm"
		>
			{#if !onSelect.isNull}
				{@const current = onSelect.current}
				{#if current.subsection}
					<EditorField
						item={current.subsection}
						bind:articleName={current.article.name}
						bind:sectionName={current.section.name}
					/>
				{:else if current.section}
					<EditorField item={current.section} bind:articleName={current.article.name} />
				{:else if current.article}
					<EditorField item={current.article} />
				{/if}
			{:else}
				<p class="">Select an item or add a new one...</p>
			{/if}
		</div>
	</div>
</div>

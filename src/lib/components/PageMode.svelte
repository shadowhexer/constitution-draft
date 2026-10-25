<script>
	let { pages } = $props();
</script>

<div class="text-justify">
	<div class="text-wrap leading-7">
		<p class="text-center text-3xl font-bold mb-5">Preamble</p>
		<p class="indent-10 mb-8">
			The once sovereign kingdoms and states were united by the Spanish colonial government in the
			name of King Felipe II, from where the name Philippines is derived from. During the 333 years
			of Spanish colonial rule, the multinational people of the Philippines had been in struggle
			with the inequality brought by class division, oppression of the lower class, the unfair
			treatment of the Spanish colonial government, and the abuse of the Church among other things.
			The struggle continued under the 48 years of American colonisation and three (3) years under
			Japanese control. Many revolutionary people of the Philippines from different nationalities
			sought self-determination and freedom from oppressive regimes, sacrificing their lives for the
			liberation of the Motherland.
		</p>
		<p class="indent-10 mb-8">
			The remnants of the colonial era still persist in the modern Philippines brought by the
			history of centralized governance and ethnocentrism, which causes inequality of development,
			fading of different cultures, and concentration of power to a single entity.
		</p>
		<p class="indent-10">
			In order to fulfill the aspirations of sustainable peace, good governance, development, and
			prosperity, and end all forms of discrimination and oppression created by the centralized,
			personality-driven system of governance, the multinational people has unite and voted the
			following:
		</p>
	</div>

	<div class="my-5">
		<ol>
			{#each pages as article, index (article.id)}
				<li class="text-center text-3xl font-bold my-7">Article {index + 1}. {article.article}</li>
				<ul>
					{#each article.section as section, index (section.id)}
						<li class="font-bold mb-3 mt-5 text-2xl">Section {index + 1}. {section.name}</li>
						<ul>
						    {#each section.subsection as subsection, index }
								<li class="my-3 indent-10 text-wrap leading-7">{index+1}. {subsection}</li>
							{/each}
						</ul>
					{/each}
				</ul>
			{/each}
		</ol>
	</div>
</div>

<script>
	import { page } from '$app/state';
	import Icon from './Icon.svelte';

	// In Svelte 5, run an effect to physically force mutate the html attribute in the browser
	let isDim = $state(false);
	$effect(() => {
		const nextTheme = isDim ? 'dim' : 'light';
		if (!document.startViewTransition) {
			document.documentElement.setAttribute('data-theme', nextTheme);
			return;
		}

		// Trigger the animated transition
		document.startViewTransition(() => {
			document.documentElement.setAttribute('data-theme', nextTheme);
		});
	});
	// Define the Props type via destructured props
	let { onSearch, totalResults } = $props();

	// Svelte state is just plain variables
	let filters = $state({
		query: '',
		articleType: 'all',
		sortBy: 'relevance'
	});

	let isExpanded = $state(false);

	// Derived state for the "Clear" button visibility
	// This automatically recalculates when 'filters' changes
	let hasActiveFilters = $derived(filters.query !== '' || filters.articleType !== 'all');

	// Logic remains clean functions
	let timer;
	function handleFilterChange(key, value) {
		filters[key] = value;
		clearTimeout(timer);
		timer = setTimeout(() => onSearch(filters), 300);
	}

	function clearFilters() {
		filters = { query: '', articleType: 'all', sortBy: 'relevance' };
		onSearch(filters);
	}
</script>

<div
	class="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm"
>
	<div class="py-4 px-6 sm:py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
		<div class="flex items-center justify-between mb-4">
			<div>
				<p
					class="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 antialiased"
				>
					Plurinational Draft
				</p>
				<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
					A proposed draft to replace the current 1987 Constitution
				</p>
			</div>

			<nav class="navbar flex justify-end py-5 flex-1">
				<label class="swap swap-rotate">
					<input type="checkbox" bind:checked={isDim} />
					<svg
						class="swap-off h-10 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path
							d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
						/>
					</svg>

					<svg
						class="swap-on h-10 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path
							d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
						/>
					</svg>
				</label>
			</nav>
		</div>

		{#if page.url.pathname !== '/panel'}
			<div
				class="space-y-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-base-300 dark:bg-slate-800 p-4"
			>
				<div class="flex gap-2">
					<div class="flex-1 relative">
						<Icon
							class="absolute left-3 top-3 w-5 h-5 text-slate-400"
							title="magnify"
							path="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
						></Icon>
						<input
							type="text"
							placeholder="Search articles, sections, keywords..."
							bind:value={filters.query}
							oninput={(e) => handleFilterChange('query', e.target.value)}
							class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-base-content/40"
						/>
					</div>

					<button
						onclick={() => (isExpanded = !isExpanded)}
						class="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-base-100 hover:bg-slate-100 dark:hover:bg-slate-700 hover:cursor-pointer transition-colors flex items-center gap-2"
						aria-label="Toggle advanced filters"
					>
						<Icon
							class="w-5 h-5"
							title="filter-outline"
							path="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z"
						></Icon>
						<span class="text-sm hidden sm:inline">Filters</span>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

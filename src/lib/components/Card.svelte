<script>
	import { resolve } from '$app/paths';
	import Icon from './Icon.svelte';
	let { link, title, summary, tags, sectionCount } = $props();
</script>

<a href={resolve(link)} class="">
	<div
		class="flex flex-col gap-2 h-50 bg-linear-to-br rounded-xl border border-slate-200 dark:border-slate-800 from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 p-6"
	>
		<div class="flex flex-row justify-between items-center flex-1">
			<p class="text-xs border rounded-lg border-gray-400/40 px-2 py-1">{tags}</p>
			<p class="text-xs opacity-60">{sectionCount}</p>
		</div>
		<p class="text-lg font-bold flex-1">{title}</p>
		<p class="text-sm opacity-60 flex-1">{summary}</p>
		<div class="flex flex-row items-center gap-2 text-sm flex-1">
			<p class="">Read more</p>
			<Icon
				class="w-4 h-4"
				title="arrow-right"
				path="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
			></Icon>
		</div>
	</div>
</a>

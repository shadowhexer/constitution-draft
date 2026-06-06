<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../assets/app.css';
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	const article = $derived(page.data.articles?.find((a) => a.id == page.params.articleId));
	const headerName = $derived(article?.id ? `${article.article} - ` : '');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{headerName}Constitution</title>
</svelte:head>

<div
	class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
>
	<Navbar />
	{@render children?.()}
</div>

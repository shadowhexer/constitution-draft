<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../assets/app.css';
	import { navigating } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	const name = $derived('Constitution');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
>
	<Navbar />
	{@render children?.()}
</div>

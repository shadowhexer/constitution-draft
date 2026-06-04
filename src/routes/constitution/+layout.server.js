import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	// 1. Target the rolling latest path (no commit hash)
	// 2. Append a unique timestamp parameter to force the CDN to bypass its cache
	const gistUrl = `https://gist.githubusercontent.com/shadowhexer/30ced42c856e969e01e50f867e8da69f/raw/constitution.json?t=${Date.now()}`;
	try {
		const res = await fetch(gistUrl);

		if (!res.ok) {
			throw new Error(`Failed to read dataset: ${res.status}`);
		}

		const data = await res.json();
		return { articles: data || [] };
	} catch (error) {
		console.error('Gist synchronization error:', error);
		// Fallback graceful degradation array so your page layout doesn't crash
		return { articles: [] };
	}
}

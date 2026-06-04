<script>
	let { title: title = '', path: path = '', class: className = '' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="currentColor"
	class={className || 'w-6 h-6 fill-current'}
>
	<title>{title}</title>
	<path d={path} />
</svg>

<script>
	import NotFound from '$lib/assets/404.png';
</script>

<div class="max-w-100 mx-auto text-center">
	<div
		style="background-image: url({NotFound})"
		class="bg-center bg-cover bg-no-repeat pointer-events-none min-w-50 min-h-100"
	></div>
	<h2 class="text-xl font-semibold text-base-content">Article Not Found</h2>
	<p class="text-gray-500 mt-2">The article you are looking for does not exist in this area.</p>
	<a href={`/constitution/`} class="mt-4 inline-block font-medium text-blue-600 hover:underline">
		Back to Home
	</a>
</div>

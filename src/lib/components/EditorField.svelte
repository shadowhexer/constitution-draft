<script>
	let { item, articleName = $bindable(), sectionName = $bindable() } = $props();
</script>

<div class="flex flex-col gap-2">
	{#if articleName}
		<div class="flex flex-col gap-2">
			<label for="article">Article Name</label>
			<input
				bind:value={articleName}
				name="name"
				type="text"
				disabled
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			/>
		</div>
	{/if}
	{#if !sectionName}
		<div class="flex flex-col gap-2">
			<label for="article">{articleName ? 'Section' : 'Article'} ID</label>
			<input
				name="id"
				type="number"
				bind:value={item.id}
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="article">{articleName ? 'Section' : 'Article'} Name</label>
			<input
				bind:value={item.name}
				name="name"
				type="text"
				placeholder="Title"
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="article">{articleName ? 'Section' : 'Article'} Summary</label>
			<textarea
				bind:value={item.summary}
				name="summary"
				placeholder="Content"
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			></textarea>
		</div>
		<div class="flex flex-col gap-2">
			<label for="article">{articleName ? 'Section' : 'Article'} Tag</label>
			<input
				bind:value={item.tag}
				name="name"
				type="text"
				placeholder="Title"
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			/>
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<label for="article">Section Name</label>
			<input
				bind:value={sectionName}
				name="name"
				type="text"
				disabled
				class="rounded-md border p-1 focus:outline-1 focus:ring-base-content"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="article">Subsection</label>
			<textarea
				bind:value={item.content}
				name="content"
				placeholder="Content"
				class="rounded-md border p-1 focus:outline-1
		focus:ring-base-content"
				rows="12"
				cols="30"
			></textarea>
		</div>
	{/if}
</div>

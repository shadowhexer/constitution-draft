<script>
	import Icon from './Icon.svelte';
	let isOpened = $state(false);
	let isDim = $state(false);
	let { isRead = $bindable(false) } = $props();
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
	let svg ={
	settings:
		'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
		sun: 'M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z',
		moon: 'M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z',
		textBox: 'M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z'
	};
</script>

<div class="fab mx-5" style="view-transition-name: active-fab-menu;">
	<div tabindex="0" role="button" class="btn btn-xl btn-circle bg-yellow-400 antialiased">
		<Icon title="Options On" class="h-10 w-10 fill-black" path={svg.settings} />
	</div>
	<div class="fab-close btn btn-circle btn-xl bg-red-600 subpixel-antialiased">
		<Icon title="Options Off" class="h-10 w-10 fill-white" path={svg.settings} />
	</div>

	<div>
		{isRead ? 'Grid Mode' : 'Page Mode'} <button class="btn btn-lg btn-circle bg-lime-400 antialiased" onclick={() => isRead = !isRead}
			><Icon title="Read Mode" class="h-8 w-8 fill-black" path={svg.textBox} /></button
		>
	</div>
	<div>
		{isDim ? 'Light Mode' : 'Dark Mode'}
		<button
			type="button"
			class="btn btn-lg btn-circle relative overflow-hidden antialiased {isDim ? 'bg-yellow-500' : 'bg-sky-950'}"
			onclick={() => isDim = !isDim}
		>
			<!-- Moon Icon Container -->
			<div
				class="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out
				{isDim ? 'scale-0 rotate-90 opacity-0 pointer-events-none' : 'scale-100 rotate-0 opacity-100'}"
			>
				<Icon title="Dark" class="h-8 w-8 fill-amber-500" path={svg.moon} />
			</div>

			<!-- Sun Icon Container -->
			<div
				class="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out
				{isDim ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 pointer-events-none'}"
			>
				<Icon title="Light" class="h-8 w-8 fill-black" path={svg.sun} />
			</div>
		</button>
	</div>


</div>

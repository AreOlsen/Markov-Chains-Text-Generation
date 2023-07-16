<script lang="ts">
	import '../style.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<header style="sticky top-0 z-50">
	<div class="navbar">
		<div class="navbar-start">
			<h2 class="text-lg italic p-2">
				Made by <a href="https://github.com/AreOlsen" class="link py-4 pr-4">Are Olsen</a>
			</h2>
		</div>
		<div class="navbar-center">
			<h1 class="text-3xl font-bold">Storytelling by Markov Chains.</h1>
		</div>
		<div class="navbar-end">
			<button
				data-toggle-theme="dracula,bumblebee"
				data-act-class="ACTIVECLASS"
				class="btn btn-primary"><span class="font-bold">DARK</span></button
			>
		</div>
	</div>
</header>

<slot />

<footer>
	<div class="flex justify-center items-center p-4">
		<h2 class="txt-xl italic">
			Markov Chains Based Text Generation By <a href="https://github.com/AreOlsen" class="link py-5"
				>Are Olsen</a
			>
			15.07.2023.
			<a href="https://github.com/AreOlsen/Markov-Chains-Text-Generation" class="link py-5"
				>Github Page For Project</a
			>.
		</h2>
	</div>
</footer>

<title>Markov Chains -Are Olsen</title>

<style>
	:global(body) {
		display: grid;
		grid-template-rows: auto minmax(90vh, auto) auto;
		grid-template-areas:
			'header'
			'main'
			'footer';

		margin: 0;
		min-width: 100%;
		min-height: 100%;
	}

	header {
		grid-area: 'header' !important;
	}
	footer {
		grid-area: 'footer' !important;
	}
	:global(main) {
		grid-area: 'main' !important;
	}
</style>

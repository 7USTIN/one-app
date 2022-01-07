<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import Loader from "./components/Loader.svelte";
	import Navbar from "./components/Navbar.svelte";
	import Content from "./components/Content.svelte";

	let loading = true;
	let data: { name: string; key: string; shuffledResults: [] };
	let source: { name: string; key?: string; results: [] };

	const fetchScrapingData = async () => {
		await fetch("/api/")
			.then((res) => res.json())
			.then((res) => (data = res[0].data))
			.catch(console.error);

		loading = false;
		source = {
			name: "All In One",
			results: data.shuffledResults,
		};
	};
	onMount(fetchScrapingData);
</script>

<main>
	{#if loading}
		<div class="loading-wrapper" transition:fade={{ duration: 250 }}>
			<Loader text="Fetching articles" size={72} />
		</div>
	{:else}
		<Navbar bind:source {data} />
		<Content {source} />
	{/if}
</main>

<style lang="scss">
	:global(:root) {
		--text-0: #2c2f32;
		--text-1: #868b90;
		--bg-0: #fcfcfc;
		--bg-1: #f6f7f8;
		--bg-2: #efefef;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	:global(body, button, input) {
		font-family: "Inter", sans-serif;
		font-size: 14px;
		color: var(--text-0);
		background: var(--bg-0);
	}

	:global(.material-icons) {
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}

	main {
		width: 100vw;
		height: 100vh;
		display: flex;

		.loading-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--bg-0);
		}
	}
</style>

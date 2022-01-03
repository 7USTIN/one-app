<script lang="ts">
	import { onMount } from "svelte";
	import Loader from "./components/Loader.svelte";

	let loading = true;
	let data: [];

	const fetchScrapingData = async () => {
		await fetch("/api/")
			.then((res) => res.json())
			.then((res) => (data = res))
			.catch(console.error);

		loading = false;
	};
	//onMount(fetchScrapingData);
</script>

<main>
	{#if loading}
		<div class="loading-wrapper">
			<Loader text="Fetching articles" size={72} />
		</div>
	{:else}
		<pre>{JSON.stringify(data, null, "\t")}</pre>
	{/if}
</main>

<style lang="scss">
	:global(:root) {
		--text: #151515;
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
		color: var(--text);
	}

	main {
		width: 100vw;
		height: 100vh;

		.loading-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>


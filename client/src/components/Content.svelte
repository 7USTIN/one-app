<script lang="ts">
	export let source: {};
</script>

<main>
	<pre>{JSON.stringify(source, null, "\t")}</pre>
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		padding: 10vh 5vw;
		margin-left: 25vw;

		@media screen and (max-width: 900px) {
			margin-left: 1vw;
		}
	}
</style>

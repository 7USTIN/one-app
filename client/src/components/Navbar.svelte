<script lang="ts">
	interface data {
		name: string;
		key: string;
		shuffledResults: [];
	}

	export let data: data;
	export let source: { name: string; results: [] };

	const icons = {
		reddit: {
			url: "https://user-images.githubusercontent.com/81305164/148321970-b687aaff-6f8f-4978-897b-898c02f5ce31.png",
			filter: "saturate(0%)",
		},
		githubTrending: {
			url: "https://user-images.githubusercontent.com/81305164/148335788-e8edbc61-ddfb-459e-997e-fd993a4e617d.png",
			filter: "saturate(0%) contrast(45%) brightness(150%)",
		},
		hackerNews: {
			url: "https://user-images.githubusercontent.com/81305164/148322076-75a9910a-8d38-4f2f-91cc-58f9179d2468.png",
			filter: "saturate(0%) brightness(90%)",
		},
		dev: {
			url: "https://user-images.githubusercontent.com/81305164/148321809-dc01053f-3fbf-4207-9fb4-08013970daa0.png",
			filter: "saturate(0%) contrast(40%) brightness(150%)",
		},
		designerNews: {
			url: "https://user-images.githubusercontent.com/81305164/148322126-3730c766-1965-4283-a6f5-7bdee51017f0.png",
			filter: "saturate(0%) contrast(60%) brightness(150%)",
		},
		slashdot: {
			url: "https://user-images.githubusercontent.com/81305164/148322185-71f669e9-bb86-4fec-b721-edafe5faf28c.png",
			filter: "saturate(0%) contrast(80%) brightness(125%)",
		},
	};
</script>

<nav>
	<div class="logo">
		<i class="material-icons">auto_stories</i>
	</div>

	<div class="sources">
		<button
			on:click={() => {
				source = { name: "All In One", results: data.shuffledResults };
			}}
			class:selected={source.name === "All In One"}
			class="all-in-one"
		>
			<i class="material-icons">space_dashboard</i>
			<p>All In One</p>
		</button>

		<div class="divider" />

		{#each Object.values(data) as { name, key }, idx (idx)}
			{#if name}
				<button
					on:click={() => (source = data[key])}
					class:selected={source.name === name}
				>
					<img
						alt="•"
						src={icons[key].url}
						style={source.name !== name &&
							`filter: ${icons[key].filter}`}
					/>
					<p>{name}</p>
				</button>
			{/if}
		{/each}
	</div>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 25vw;
		height: 100vh;
		background: var(--bg-0);
		display: flex;
		flex-direction: column;
		padding: 32px 6vw;

		@media screen and (max-width: 1420px) {
			padding: 32px 4vw;
		}

		@media screen and (max-width: 1100px) {
			padding: 32px 2vw;
		}

		@media screen and (max-width: 900px) {
			width: auto;
			padding: 32px 2.5vw;
		}

		.logo {
			width: 42px;
			height: 42px;
			background: var(--text-0);
			border-radius: 12px;
			display: flex;
			justify-content: center;
			align-items: center;

			@media screen and (max-width: 900px) {
				width: 36px;
				height: 36px;
				margin: 0 auto;
				border-radius: 10px;
			}

			i {
				font-size: 22px;
				color: var(--bg-0);

				@media screen and (max-width: 900px) {
					font-size: 18px;
				}
			}
		}

		.sources {
			display: flex;
			flex-direction: column;
			margin-top: 64px;

			.divider {
				background: var(--bg-2);
				width: 100%;
				height: 2px;
				margin: 8px 0;
			}

			.all-in-one {
				padding: 9px 12px;

				@media screen and (max-width: 900px) {
					padding: 6px;
				}
			}

			button {
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 16px;
				border-radius: 12px;
				color: var(--text-1);
				padding: 11px 12px;
				border: none;
				cursor: pointer;
				background: var(--bg-0);
				margin: 4px 0;
				transition: 125ms;
				white-space: nowrap;

				@media screen and (max-width: 900px) {
					padding: 8px;
					border-radius: 8px;

					p {
						display: none;
					}
				}

				p {
					margin-left: 12px;
				}

				img {
					width: 20px;
					height: 20px;
					border-radius: 6px;
				}

				&:hover {
					color: var(--text-0);
					background: var(--bg-2);
				}
			}

			.selected {
				color: var(--text-0);
				background: var(--bg-2);
			}
		}
	}
</style>

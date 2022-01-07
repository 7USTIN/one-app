<script lang="ts">
	import { icons } from "../utils/icons";

	interface data {
		name: string;
		key: string;
		shuffledResults: [];
	}

	export let data: data;
	export let source: { name: string; key?: string; results: [] };

	const resetScroll = () => {
		document.getElementsByTagName("section")[0].scrollTo(0, 0);
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
				resetScroll();
			}}
			class:selected={source.name === "All In One"}
			class="all-in-one"
		>
			<i class="material-icons">auto_stories</i>
			<p>All In One</p>
		</button>

		<div class="divider" />

		{#each Object.values(data) as { name, key }, idx (idx)}
			{#if name}
				<button
					on:click={() => {
						source = data[key];
						resetScroll();
					}}
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
		width: 25vw;
		height: 100vh;
		background: var(--bg-1);
		display: flex;
		flex-direction: column;
		padding: 32px 6vw;
		overflow: auto;

		@media screen and (max-width: 1420px) {
			padding: 32px 4vw;
		}

		@media screen and (max-width: 1100px) {
			padding: 32px 2vw;
		}

		@media screen and (max-width: 900px) {
			width: 60px;
			padding: 32px 12px;
		}

		.logo {
			width: 42px;
			height: 42px;
			background: var(--text-0);
			border-radius: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 12px;

			@media screen and (max-width: 900px) {
				width: 36px;
				min-width: 36px;
				height: 36px;
				min-height: 36px;
				margin: 0 auto;
				border-radius: 10px;
				margin-left: 0;
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

			@media screen and (max-width: 900px) {
				margin-top: 32px;
			}

			.divider {
				background: var(--bg-2);
				width: 100%;
				height: 2px;
				margin: 8px 0;
			}

			.all-in-one {
				padding: 10px 12px;

				@media screen and (max-width: 900px) {
					padding: 6px;
				}

				i {
					font-size: 21px;
				}
			}

			button {
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 16px;
				border-radius: 6px;
				color: var(--text-1);
				padding: 11px 12px;
				border: none;
				cursor: pointer;
				background: var(--bg-1);
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

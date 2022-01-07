<script lang="ts">
	import { icons } from "../utils/icons";

	export let source: { name: string; key?: string; results: [] };

	const onlyNumbers = (string: string) => {
		const regex = new RegExp("\\D", "g");
		return string.replace(regex, "") || 0;
	};

	const checkURL = (string: string) => {
		return string.replace("old.reddit", "www.reddit");
	};
</script>

<section>
	<div class="header">
		{#if source.key}
			<img alt="•" src={icons[source.key].url} />
		{:else}
			<i class="material-icons">auto_stories</i>
		{/if}

		<h1>{source.name}</h1>
	</div>

	<div class="articles">
		{#each source.results as { author, authorURL, comments, likes, postURL, title, source: newsSource }, idx (idx)}
			<a target="_blank" href={postURL} class="article">
				<span class="title">{title}</span>

				<span class="description">
					{#if source.name === "All In One"}
						<p>{newsSource} &nbsp</p>
					{/if}

					{#if author}
						{#if authorURL}
							<a target="_blank" href={checkURL(authorURL)}>
								by {author}
							</a>
							&nbsp
						{:else}
							<p>by {author} &nbsp</p>
						{/if}
					{/if}

					{#if likes !== null}
						<p>
							{onlyNumbers(String(likes))}
							{newsSource === "Github Trending"
								? "stars"
								: newsSource === "Reddit"
								? "upvotes"
								: "points"}
							&nbsp
						</p>
					{/if}

					{#if comments !== null}
						<p>{onlyNumbers(String(comments))} comments</p>
					{/if}
				</span>
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		width: 75vw;
		height: 100vh;
		padding: 32px 5vw;
		display: flex;
		flex-direction: column;
		overflow: auto;

		@media screen and (max-width: 900px) {
			width: calc(100vw - 60px);
		}

		.header {
			display: flex;
			align-items: center;
			margin-bottom: 64px;
			white-space: nowrap;

			@media screen and (max-width: 900px) {
				margin-bottom: 32px;
			}

			img {
				width: 28px;
				height: 28px;
				border-radius: 8px;

				@media screen and (max-width: 900px) {
					width: 21px;
					height: 21px;
					border-radius: 6px;
				}
			}

			i {
				font-size: 32px;

				@media screen and (max-width: 900px) {
					font-size: 26px;
				}
			}

			h1 {
				margin-left: 16px;
				font-size: 26px;

				@media screen and (max-width: 900px) {
					font-size: 20px;
					margin-left: 12px;
				}
			}
		}

		.articles {
			display: flex;
			flex-direction: column;
			margin-left: -16px;

			@media screen and (max-width: 900px) {
				margin-left: -12px;
			}

			.article {
				display: flex;
				flex-direction: column;
				margin-bottom: 12px;
				text-decoration: none;
				cursor: pointer;
				padding: 10px 16px;
				border-radius: 5px;
				background: var(--bg-0);
				transition: 125ms;

				@media screen and (max-width: 900px) {
					padding: 6px 12px;
				}

				&:hover {
					background: var(--bg-2);
				}

				.title {
					display: flex;
					font-weight: 500;
					color: var(--text-0);
					line-height: 1.5rem;
					font-size: 16px;

					@media screen and (max-width: 900px) {
						font-size: 14px;
						line-height: 1.3rem;
					}
				}

				.description {
					display: flex;
					flex-wrap: wrap;
					font-weight: 500;
					font-size: 14px;
					line-height: 1.5rem;
					color: var(--text-1);

					@media screen and (max-width: 900px) {
						font-size: 12px;
						line-height: 1.3rem;
					}

					p {
						white-space: nowrap;
					}

					a {
						text-decoration: none;
						color: var(--text-1);
						white-space: nowrap;

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
</style>

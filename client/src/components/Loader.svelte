<script lang="ts">
	export let text: string;
	export let size: number;
</script>

<section>
	<div class="loader" style={`width: ${size}px; height: ${size}px;`}>
		<div class="one" />
		<div class="two" />
		<div class="three" />
	</div>

	<p>{text}</p>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			font-size: 16px;
			margin-top: 32px;
		}

		.loader {
			border-radius: 50%;
			perspective: 800px;
			position: relative;

			div {
				position: absolute;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			.one {
				left: 0%;
				top: 0%;
				animation: rotate-one 1s linear infinite;
				border-bottom: 3px solid var(--text);
			}

			.two {
				right: 0%;
				top: 0%;
				animation: rotate-two 1s linear infinite;
				border-right: 3px solid var(--text);
			}

			.three {
				right: 0%;
				bottom: 0%;
				animation: rotate-three 1s linear infinite;
				border-top: 3px solid var(--text);
			}
		}
	}

	@keyframes rotate-one {
		0% {
			transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
		}
	}

	@keyframes rotate-two {
		0% {
			transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
		}
	}

	@keyframes rotate-three {
		0% {
			transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
		}
	}
</style>

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
			font-weight: 500;
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
				border-bottom: 4px solid var(--text-0);
			}

			.two {
				right: 0%;
				top: 0%;
				animation: rotate-two 1s linear infinite;
				border-right: 4px solid var(--text-0);
			}

			.three {
				right: 0%;
				bottom: 0%;
				animation: rotate-three 1s linear infinite;
				border-top: 4px solid var(--text-0);
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

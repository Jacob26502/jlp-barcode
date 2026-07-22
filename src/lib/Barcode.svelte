<script lang="ts">
	import { onMount, tick } from 'svelte';
	import JsBarcode from 'jsbarcode';


	let barcode: Element;

	interface additionalOptions {
		rotated?: boolean;
	}

	type Options = JsBarcode.Options & additionalOptions;
	const defaultOptions: Options = {
		format: 'CODE128',
		width: 2,
		height: 100,
		displayValue: true,
		text: undefined,
		fontOptions: '',
		font: 'monospace',
		textAlign: 'center',
		textPosition: 'bottom',
		textMargin: 2,
		fontSize: 20,
		background: '#ffffff',
		lineColor: '#000000',
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		flat: true
	};

	let { value, elementTag, options = defaultOptions }: {
		value: any,
		elementTag: 'img' | 'canvas' | 'svg',
		options: Options
	} = $props();


	onMount(async () => {
		await tick();
		JsBarcode(barcode, value, options);
	});

	$effect(() => {
		JsBarcode(barcode, value, Object.assign(defaultOptions, options));
	});
</script>
{#if elementTag === 'img'}
	<img bind:this={barcode} alt="" />
{:else if elementTag === 'canvas'}
	<canvas bind:this={barcode}></canvas>
{:else}

		<svg class="barcode" bind:this={barcode}></svg>


{/if}
<style>

    .barcode {
        max-height: 100%;
        transform: rotate(270deg);
        transform-origin: center;
        height: auto !important;
        width: 80vw !important;

    }
		.barcode g {
				transform-origin: center;

		}

</style>
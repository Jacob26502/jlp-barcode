<script lang="ts">
	import { onMount } from 'svelte';
	import bwipjs from 'bwip-js';
	import type { CanvasType } from 'bwip-js';

	let canvasElement: CanvasType = document.createElement('canvas');

	let { branchNumber, tillNumber, transNo, parityNo }: {
		branchNumber?: string,
		tillNumber?: string,
		transNo?: string,
		parityNo: string
	} = $props();


	let paddedBranchNumber = $derived((branchNumber ?? '020').padStart(3, '0'));
	let paddedTillNumber = $derived((tillNumber ?? '000').padStart(3, '0'));
	let paddedTransNo = $derived((transNo ?? '000000').padStart(6, '0'));

	let src = $state('');

	$effect(() => {
		async function render() {
			await bwipjs.toCanvas(canvasElement, {
				bcid: 'code128',
				text: `999${paddedBranchNumber}${paddedBranchNumber}${paddedTillNumber}${paddedTransNo}${parityNo}`,
				scale: 10,
				height: 15,
				includetext: true,
				textxalign: 'center',
				rotate: 'L',
				backgroundcolor: '',
				padding: '5'
			});

			src = canvasElement.toDataURL('image/png');
		}

		render().catch(console.error);
	});

</script>


<img src={src} alt="barcode" class="undraggable" style="height:100%;" />


<style>
    .undraggable {
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>

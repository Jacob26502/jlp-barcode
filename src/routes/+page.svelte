<script lang="ts">
	import { onMount } from 'svelte';
	import Bwip from '$lib/Bwip.svelte';
	import { format } from 'date-fns';
	import { replaceState } from '$app/navigation';
	import { createIsMobile } from '$lib/matchMedia.svelte';

	let activeBarcode = $state(0);
	let drawerOpen = $state(false);
	let scrollLock = $state(true);
	let isMobile = createIsMobile();

	let branchNumber = $state('020');
	let tillNumber: string | undefined = $state();
	let transNo: string | undefined = $state();

	onMount(() => {

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					const index = parseInt(id.replace('barcode', ''));
					activeBarcode = index;
					replaceState(`#${id}`, '');
				}
			});
		}, { threshold: 0.5 });

		document.querySelectorAll('.carousel-item').forEach((item) => {
			observer.observe(item);
		});

		if (tillNumber === undefined || transNo === undefined) {
			drawerOpen = true;
		}


		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="drawer">
	<input id="my-drawer-1" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
	<div class="drawer-content">
		<!-- Page content here -->
		<label for="my-drawer-1" class="absolute top-4 left-4 btn btn-square swap swap-rotate drawer-button z-10">
			<input type="checkbox" />

			<!-- hamburger icon -->
			<svg
				class="swap-off fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512">
				<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
			</svg>

			<!-- close icon -->
			<svg
				class="swap-on fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512">
				<polygon
					points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
			</svg>
		</label>

	</div>
	<div class="drawer-side">
		<label for="my-drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 min-h-full w-80 p-4 relative">
			<!-- Sidebar content here -->
			<fieldset class="fieldset">
				<label class="label" for="branchNumber">Branch Number</label>
				<input type="text" minlength="3" maxlength="3" pattern="[0-9]*" id="branchNumber" class="input validator"
							 placeholder="Required" bind:value={branchNumber} />
				<p class="validator-hint">
					Must be 3 Numbers
				</p>
			</fieldset>
			<fieldset class="fieldset">
				<label class="label " for="tillNumber">Till Number</label>
				<input type="text" minlength="3" maxlength="3" required pattern="[0-9]*" id="tillNumber" class="input validator"
							 placeholder="Required." bind:value={tillNumber} />
				<p class="validator-hint">
					Must be 3 Numbers
				</p>
			</fieldset>
			<fieldset class="fieldset">
				<label class="label " for="tillNumber">Transaction Number</label>
				<input type="text" minlength="6" maxlength="6" required pattern="[0-9]*" id="transactionNumber"
							 class="input validator"
							 placeholder="Transaction No." bind:value={transNo} />
				<p class="validator-hint">
					Must be 6 Numbers (Use leading zero)
				</p>
			</fieldset>
			{#if isMobile.current}
				<fieldset class="fieldset">
					<label class="label" for="branchNumber">Scroll Lock</label>
					<div class="pl-1">
						<input type="checkbox" checked={scrollLock} class="toggle toggle-accent toggle-lg" />

					</div>


				</fieldset>
			{/if}

			<div class="absolute inset-x-0 bottom-0 flex-col text-center text-gray-600">
				<p>
					Ver: {__VERSION__} ({__BRANCH__})
				</p>
				<p>
					Build:  {format(new Date(__BUILT_AT__), "dd/mm/yy HH:mm")}
				</p>
			</div>


		</ul>
	</div>

</div>


<div class="w-full flex justify-center sm:px-4">
	<div class="relative w-full lg:w-124 xl:w-5xl h-screen md:h-screen lg:h-128">
		<div id="carousel-container" class="carousel rounded-box bg-blue-200 w-full h-full pb-12 snap-x snap-mandatory">
			<div id="barcode0" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="0" />
				</div>
			</div>
			<div id="barcode1" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="1" />
				</div>
			</div>
			<div id="barcode2" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="2" />
				</div>
			</div>
			<div id="barcode3" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="3" />
				</div>
			</div>
			<div id="barcode4" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="4" />
				</div>
			</div>
			<div id="barcode5" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="5" />
				</div>
			</div>
			<div id="barcode6" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="6" />
				</div>
			</div>
			<div id="barcode7" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="7" />
				</div>
			</div>
			<div id="barcode8" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="8" />
				</div>
			</div>
			<div id="barcode9" class="carousel-item flex justify-center items-center w-full h-full {scrollLock ? 'snap-always' : ''}">
				<div class="h-4/5">
					<Bwip branchNumber={branchNumber} tillNumber={tillNumber} transNo={transNo} parityNo="9" />
				</div>
			</div>

			<div
				class="absolute bottom-0 left-0 right-0 flex w-full justify-center gap-2 py-2 bg-opacity-90 border-t border-gray-200">

				<a href="#barcode0" class="btn btn-xs {activeBarcode === 0 ? 'bg-white text-black' : ''}">0</a>
				<a href="#barcode1" class="btn btn-xs {activeBarcode === 1 ? 'bg-white text-black' : ''}">1</a>
				<a href="#barcode2" class="btn btn-xs {activeBarcode === 2 ? 'bg-white text-black' : ''}">2</a>
				<a href="#barcode3" class="btn btn-xs {activeBarcode === 3 ? 'bg-white text-black' : ''}">3</a>
				<a href="#barcode4" class="btn btn-xs {activeBarcode === 4 ? 'bg-white text-black' : ''}">4</a>
				<a href="#barcode5" class="btn btn-xs {activeBarcode === 5 ? 'bg-white text-black' : ''}">5</a>
				<a href="#barcode6" class="btn btn-xs {activeBarcode === 6 ? 'bg-white text-black' : ''}">6</a>
				<a href="#barcode7" class="btn btn-xs {activeBarcode === 7 ? 'bg-white text-black' : ''}">7</a>
				<a href="#barcode8" class="btn btn-xs {activeBarcode === 8 ? 'bg-white text-black' : ''}">8</a>
				<a href="#barcode9" class="btn btn-xs {activeBarcode === 9 ? 'bg-white text-black' : ''}">9</a>
			</div>
		</div>
	</div>

</div>

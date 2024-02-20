<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let Form;
	export let capaId;

	let isCapaViewShown = true;
</script>

<div class="w-full md:h-screen h-max">
	<div class="flex flex-col w-full md:h-dvh h-max">
		<div class="flex flex-row justify-center p-8">
			<button on:click|preventDefault={() =>
				{isCapaViewShown = !isCapaViewShown;}}>
				{(isCapaViewShown ? "Ocultar" : "Mostrar")+" registro"}
			</button>
		</div>

		<div class="flex flex-row flex-wrap self-center overflow-scroll
			justify-evenly align-center p-6 m-6 h-2/3 w-full">
			{#if isCapaViewShown}
				<div class="m-4 h-1/3 w-full md:w-1/3 md:h-5/6
					border-solid border-black border-2 overflow-scroll">
					<CapaView {capaId}/>
					<div class="flex flex-row justify-center p-8">
						<button on:click|preventDefault={() =>
							{isCapaViewShown = !isCapaViewShown;}}>
							{(isCapaViewShown ? "Ocultar" : "Mostrar")+" registro"}
						</button>
					</div>
				</div>
			{/if}

			<div class={"w-3/4 m-6 md:w-1/3"+" h-1/3 overflow-auto md:h-5/6"}>
				<Form {capaId}/>
			</div>
		</div>
	</div>
</div>

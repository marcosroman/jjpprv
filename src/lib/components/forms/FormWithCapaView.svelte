<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let Form;
	export let formProps;

	let isCapaViewShown = true;
	let capaId = formProps.capaId;
</script>

<div class="w-full md:h-screen h-max">
	<div class="flex flex-col w-full md:h-dvh h-max">
		<div class="flex flex-row justify-center p-1">
			<button on:click|preventDefault={() =>
				{isCapaViewShown = !isCapaViewShown;}}>
				{(isCapaViewShown ? "Ocultar" : "Mostrar")+" registro"}
			</button>
		</div>

		<div class="flex flex-row flex-wrap self-center overflow-scroll
			justify-evenly align-center p-2 m-2 h-2/3 w-full">
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

			<div class={(isCapaViewShown ? "w-3/4 md:w-1/2 " : "w-full")+" m-6 "+"h-1/3 overflow-auto md:h-5/6"}>
				<Form {...formProps}/>
			</div>
		</div>
	</div>
</div>

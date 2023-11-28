<script>
	import CapaView from '$lib/components/capa/CapaView.svelte';

	export let data;

	let capaId = data.capaId;
	//let capaTypeDescription = capa.issue.isNonConformity ? "No-Conformidad" : "Oportunidad de mejora";
</script>

<CapaView {capaId}/>

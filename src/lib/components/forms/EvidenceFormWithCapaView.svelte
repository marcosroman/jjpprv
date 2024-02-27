<script>
	import FormWithCapaView from './FormWithCapaView.svelte';
	import EvidenceList from '../evidence/EvidenceList.svelte';

	export let evidenceFormProps;
</script>

<FormWithCapaView Form={EvidenceList} formProps={evidenceFormProps}/>

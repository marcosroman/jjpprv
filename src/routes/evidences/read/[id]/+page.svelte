<script>
	export let data;

	function openWindow() {
		const base64String = data.evidence.fileData;
		const base64Data = base64String.split(',')[1];
		const arrayBuffer = Uint8Array.from(
			atob(base64Data),
			c => c.charCodeAt(0)).buffer;

		const blob = new Blob([arrayBuffer],{ type: data.evidence.fileType });

		const url = URL.createObjectURL(blob, data.evidence.fileName);
		window.open(url);
		URL.revokeObjectURL(url);
	}
</script>

<p>capa_id={data.evidence.capaId}, name={data.evidence.fileName}, DESC= {data.evidence.description}, TYPE={data.evidence.fileType}</p>
<iframe src={data.evidence.fileData} title="desc" alt='pdf'></iframe>
<button on:click={openWindow}>Ver</button>


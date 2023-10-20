<script>
	export let data;

	/*
	console.log(data);
	console.log("----");
	console.log(data.blob);
	*/

	/*
	async function getBlob(res) {
		const p = await res.pdf();
		return p.blob()
	}
	//}
	//const blob = data.res.then((x) => x.blob());

	//const blob =  data.res.pdf.blob();

	const blob = getBlob(res);
	const url = URL.createObjectURL(blob);

	// Open the PDF in a new browser tab
	window.open(url, '_blank');

	// Optionally, you can offer it for download
	// const a = document.createElement('a');
	// a.href = url;
	// a.download = 'example.pdf';
	// a.click();

	URL.revokeObjectURL(url);
	*/
</script>

<!--
<p>{data.pdf.pdf}</p>
-->
<iframe src={data.pdf.pdf} title="desc" alt='pdf'></iframe>

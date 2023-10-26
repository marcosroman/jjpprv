<script>
	// upload a new evidence entry via post
	// and get the new resulting array if successful
	export let setNewEvidenceId;

	let files; 
	let fileName;
	let fileBuffer;
	let fileType;
	let description="testing";
	let postData = {};

	$: if (files) {
		let file = files[0]; 
		fileName = file.name; fileType = file.type;
		file.arrayBuffer().then((arrayBuffer) => {
			fileBuffer = btoa(String.fromCharCode(...(new Uint8Array(arrayBuffer))));
		});
	}

	function submitEvidence() {
		if (files && description) {
			postData = { fileName, fileType, fileBuffer, description };
			sendDataToServer().then(()=>{console.log('submitted!');});
		} // else inform about missing fields
	}

	async function sendDataToServer() {
    try {
      const response = await fetch('/api/evidence/upload', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const data = await response.json();
				alert (data);
				/* set the value in the parent component, 
				   so that the capa document section containing
				   the evidence ids array can be updated */
				setNewEvidenceId(await data.insertedId);
        console.log('Server response:', data);
      } else { console.error('Failed to send data to the server'); }
    } catch (error) { console.error('Error:', error); }
  }
</script>

<input bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
<textarea bind:value={description} name="description" placeholder="Descripcion" required></textarea>
<button on:click={submitEvidence}>Subir</button>

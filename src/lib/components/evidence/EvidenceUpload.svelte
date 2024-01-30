<script>
	// upload a new evidence entry via post
	// and get the new resulting array if successful
	export let setNewEvidenceId;

	let files; 
	let fileName;
	let fileBuffer;
	let fileType;
	let description;
	let postData = {};

	$: if (files) {
		let file = files[0]; 
		fileName = file.name;
		fileType = file.type;
		file.arrayBuffer().then((arrayBuffer) => {
			const uArray = new Uint8Array(arrayBuffer); // to binary
			fileBuffer = btoa(uArray.reduce( // to base64 string
				(data, byte) => data + String.fromCharCode(byte), ''));
		});
	}

	function submitEvidence() {
		if (files && description) {
			postData = { fileName, fileType, fileBuffer, description };
			sendDataToServer().then(() => {
				console.log('submitted!');
			});
		} // TODO: else inform about missing fields
	}

	async function sendDataToServer() {
    try {
      const response = await fetch('/api/evidence/upload', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const data = await response.json();
				/* set the value in the parent component, 
				   so that the capa document section containing
				   the evidence ids array can be updated */
				setNewEvidenceId(await data.insertedId);
        console.log('Server response:', data);
      } else { console.error('Failed to send data to the server'); }
    } catch (error) { console.error('Error:', error); }
  }
</script>

<div class="flex flex-col my-6 items-center">
	<input class="my-4 mx-1" bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
		<!--<label for="decription" class="my-2">Descripcion</label>-->
	<textarea class="h-36" bind:value={description} name="description" placeholder="Descripcion de la evidencia" required></textarea>
	<button class="my-4" on:click={submitEvidence}>Subir</button>
</div>

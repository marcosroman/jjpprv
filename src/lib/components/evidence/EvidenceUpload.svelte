<script>
	// upload a new evidence entry via post
	// and get the new resulting array if successful
	import loadingAnimation from '$lib/assets/loading.gif';

	export let setNewEvidenceId;

	let files; 
	let fileName;
	let fileBuffer;
	let fileType;
	let description;
	let fileInput;
	let postData = {};

	let isFetchingEvidenceData = false;

	let errorMessage;

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
		} else {
			errorMessage = "";
			if (!files) 
				errorMessage += "Adjunte un archivo. ";
			if (!description)
				errorMessage += "Agregue una descripcion.";
		}
	}

	async function sendDataToServer() {
    try {
			isFetchingEvidenceData = true;
      const response = await fetch('/api/evidence/upload', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
      });

      if (response.ok) {
				isFetchingEvidenceData = false;
        const data = await response.json();
				/* set the value in the parent component, 
				   so that the capa document section containing
				   the evidence ids array can be updated */
				setNewEvidenceId(await data.insertedId);
        console.log('Server response:', data);
				// reset fields
				description = '';
				fileInput.value = '';
				errorMessage = '';
      } else { console.error('Failed to send data to the server'); }
    } catch (error) { console.error('Error:', error); }
  }
</script>

<div class="flex flex-col my-6 items-center">
	<input class="my-4 mx-1" bind:this={fileInput} bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
	<textarea class="h-36" bind:value={description} name="description" placeholder="Descripcion de la evidencia" required></textarea>
	{#if errorMessage}
		<p class="py-2 w-1/2 font-bold text-red-500">{errorMessage}</p>
	{/if}

	{#if isFetchingEvidenceData}
		<img class="my-4 w-10" src={loadingAnimation}>
	{:else}
		<button class="my-4" on:click={submitEvidence}>Subir</button>
	{/if}
</div>


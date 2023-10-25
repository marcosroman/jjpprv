<script>
	// upload a new evidence entry via post
	// and get the new resulting array if successful


	//import evidences from '$lib/db/evidences';
	//import { Binary, ObjectId } from 'mongodb';

	let files; 
	let fileName;
	let fileBuffer;
	let fileType;
	let description="testing";

	let postData = {};

	//let postData = {}
	/*
	export const actions = {
		default: async (event) => {
			const formData = await event.request.formData();
			const uploadedFile = formData.get('uploaded-file');

			try {
				await evidences.insertOne({
					capa_id: formData.get('capa-id'), //new ObjectId()
					fileBinary: new Binary(await uploadedFile.arrayBuffer()),
					fileName: formData.get('file-name'),
					fileType: await uploadedFile.type,
					description: formData.get('description')
				});
			} catch(error) {
				console.log(error);
			}
		}
	}
	*/

	async function sendDataToServer() {
    try {
      const response = await fetch('/api/evidence/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type
        },
        body: JSON.stringify(postData), // Convert the data to JSON
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response from the server
        console.log('Server response:', data);
      } else {
        console.error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

	$: {
		if (files) {
			let file = files[0];
			fileName = file.name;
			fileType = file.type;
			console.log('file!');
			file.arrayBuffer().then((arrayBuffer) => {
				fileBuffer = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
				console.log(fileBuffer);
			});
			//file.arrayBuffer().then((x) => {fileBuffer = x});
		}
	}

	function submitEvidence() {
		if (files && description) {
			postData = {
				fileName,
				fileType,
				fileBuffer,
				description
			}

			sendDataToServer().then(()=>{
				alert('submitted!');
			});
		}
	}
</script>

<input bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
<textarea bind:value={description} name="description" placeholder="Descripcion" required></textarea>

<button on:click={submitEvidence}>Subir</button>

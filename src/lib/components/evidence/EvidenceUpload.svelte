<script>
	import evidences from '$lib/db/evidences';
	import { Binary, ObjectId } from 'mongodb';

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

	//let fileName="";
	//let files;
	function submitEvidence() {
		alert('submitted!');
	}
</script>

<!--<form method="POST" enctype="multipart/form-data">
<input type="hidden" name="capa-id" value="xxx">

{#if files}
	<input type="hidden" name="file-name" value={files[0].name}>
{/if}
<input type="submit" value="Subir">
-->

<input bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
<textarea name="description" placeholder="Descripcion" required></textarea>

<button on:click|preventDefault={submitEvidence}>Subir</button>

<!--</form>-->


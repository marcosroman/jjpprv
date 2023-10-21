<script>
	let fileName="";
	let files;
</script>

<form method="POST" enctype="multipart/form-data">
	<input type="hidden" name="capa-id" value="xxx">
	{#if files}
		<input type="hidden" name="file-name" value={files[0].name}>
	{/if}
	<input bind:files type="file" accept=".pdf, image/*, video/*" name="uploaded-file" required>
	<textarea name="description" placeholder="Descripcion" required></textarea>
	<input type="submit" value="Subir">
</form>

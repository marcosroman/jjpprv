<script>
	export let data;
	export const d0 = data.dataarray[0];
</script>

<ol>
	{#each data.dataarray as da}
		<li>{JSON.stringify(da)}: {da.description}</li>
	{/each}
</ol>

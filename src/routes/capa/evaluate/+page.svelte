<script>
	export let data;
	const capas = data.capasWithoutEvaluation;
</script>

<p>(Evaluar capas que: o no tienen acciones correctivas O tienen y todas ya tienen el campo isAccomplished (cumplida si/no))</p>

<p>...no me queda clara esta parte... asigno a otro que no sea el responsable de responder? en que momento le asigno? asigna el repsonsable del sistema de calidad? que completa? por el momento solamente:</p>
<pre>
evaluation: 
	evaluationDate,
	//evaluatorId,
	//acceptedEvaluation, ?
	commentsByEvaluator
</pre>

<p>(y no le agrego un campo de 'aceptado' (o no) porque eso ya esta en el cierre, hecho por calidad exclusivamente (qms))</p>

{#each capas as capa}
	<a href={`/capa/${capa._id}/evaluate`}>
		{JSON.stringify(capa)}
	</a>
{/each}



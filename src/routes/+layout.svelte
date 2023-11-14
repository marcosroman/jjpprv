<style>
	a {
		margin:1em;
		border: solid 1pt;
		text-decoration: none;
		color: red;
	}

	.done {
		color: darkgreen;
	}
</style>

<nav>
	<a class="done" href="/">Inicio</a>
	<a class="done" href="/capa/new">Nueva NC/OM</a>
	<!--<a href="/capa/new/evidence">Agregar evidencia a Nueva NC/OM [opcional?]</a>-->
	<a class="done" href="/capa/respond-nc">Responder a No-Conf [solo si NC/OM es NC]</a>
	<!--<a href="/capa/nc/respond/evidence">Agregar Evidencia en Respuesta a No-Conf. (solo si capa es NC)</a>-->
	<a class="done" href="/capa/decide-ca">Decidir si requiere Acciones Correctivas (CSGC)</a>
	<a class="done" href="/capa/act/propose">Proponer Acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/assign">Asignar Responsable ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/accept">Aceptar Responsabilidad ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/evidence">Subir evidencia de acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a class="done" href="/capa/act/review">Hacer seguimiento de Acciones (CSGC)</a>
	<a class="done" href="/capa/evaluate/assign">Asignar Evaluador para NC/OM (CSGC)</a>
	<a class="done" href="/capa/evaluate">Evaluar NC/OM</a>
	<a class="done" href="/capa/close">Cerrar NC/OM (CSGC)</a>
	<a href="/capa/view">Ver NC/OM</a>
</nav>

<slot></slot>

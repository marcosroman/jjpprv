<style>
	a {
		margin:1em;
		border: solid 1pt;
		text-decoration: none;
		color: red;
	}
</style>

<nav>
	<a href="/">Inicio</a>
	<a href="/capa/new">Nueva NC/OM</a>
	<!--<a href="/capa/new/evidence">Agregar evidencia a Nueva NC/OM [opcional?]</a>-->
	<a href="/capa/nc/respond">Responder a No-Conf [solo si NC/OM es NC]</a>
	<!--<a href="/capa/nc/respond/evidence">Agregar Evidencia en Respuesta a No-Conf. (solo si capa es NC)</a>-->
	<a href="/capa/ca/decide">Decidir si requiere Acciones Correctivas (CSGC)</a>
	<a href="/capa/act/propose">Proponer Acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a href="/capa/act/assign">Asignar Responsable ante NC/OM (para NC solo si requiere ACs)</a>
	<a href="/capa/act/result">Subir evidencia de acciones ante NC/OM (para NC solo si requiere ACs)</a>
	<a href="/capa/act/followup">Hacer seguimiento de Acciones (CSGC)</a>
	<a href="/capa/evaluate/assign">Decidir Evaluador para NC/OM (CSGC)</a>
	<a href="/capa/evaluate">Evaluar NC/OM</a>
	<a href="/capa/close">Cerrar NC/OM (CSGC)</a>
	<a href="/capa/view">Ver NC/OM</a>
</nav>

<slot></slot>

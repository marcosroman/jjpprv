
// creo que tambien tiene que controlar la fecha... que se haga todo en el backend nomas eso

//currentDate = ...
sectorManager = 'sm';//users.find({}); // encontrar aca el manager del sector que recibe la nc/om
qmsManager = 'qm'; // qms manager

pendingActions = [];
if (!capa?.closure?.isClosedEffectively) {
	if (capa?.issue) {
		if (!capa.issue?.evidence) {
			pendingActions.push({
				action: 'agregar evidencia a nc/om',
				assignee: sectorManager
			});
		}
		if (capa.issue.isNonConformity) {
			if (!capa.issue.responseToNonConformity) {
				pendingActions.push({
					action: 'responder a no-conformidad',
					assignee: sectorManager
				});
			} else if(!capa.issue.responseToNonConformity?.evidence) {
				pendingActions.push({
					action: 'agregar evidencia en respuesta a no-conformidad',
					assignee: sectorManager
				});
			}
			if (!capa?.correctiveActionsRequirement) {
				pendingActions.push({
					actions: 'definir si requiere acciones correctivas',
					assignee: qmsManager
				});
			} else if(capa.correctiveActionsRequirement.isRequired && !capa?.actions) {
				pendingActions.push({
					action: 'analizar y proponer acciones para resolver no-conformidad',
					assignee: sectorManager
				});
			}
		} else if (!capa?.actions) {
			pendingActions.push({
				action: 'proponer acciones para aplicar accion de mejora',
				assignee: sectorManager
			});
		}

		if(capa?.actions) {
			for (action in capa.actions) {
				actionIndex = capa.actions.indexOf(action);
				if (!action?.assignation) {
					pendingActions.push({
						action: 'asignar responsable de accion',
						assignee: sectorManager
					});
				} else if (!action.assignation.isAccepted) {
					pendingActions.push({
						action: 'aceptar accion asignada',
						assignee: action.assignation.assigneeId
					});
				} else if (!action?.evidence) {
					pendingActions.push({
						action: 'agregar evidencia',
						assignee: action.assignation.assigneeId
					});
				// arreglar lo de rescheduling, comparar con fecha
				} else if (!action?.review) {
					pendingActions.push({
						action: 'dar seguimiento a accion'+str(actionIndex),
						assignee: qmsManager
					});
				}
			}
		}

		/*
		// if all actions have been reviewed OR if it's a non-conformity
		// and no corrective actions are required... we can 
		if ((capa?.actions && capa.actions.reduce(
					(accumulator,currentAction) => accumulator && currentAction?.review, true))
			|| (capa.issue.isNonConformity
					&& (capa?.correctiveActionsRequirement?.isRequired === false)) {

		}
		*/
		// always possible to assign capa evaluation... but minimum date should be right after latest commitment date for actions, in case there's any
		if (!capa?.evaluation?.assignment) {
			pendingActions.push({
				action: 'asignar evaluacion',
				assignee: qmsManager
			});
		} else if(!capa?.evaluationDate) {
			pendingActions.push({
				action: 'realizar evaluacion',
				assignee: evaluation.assignment.evaluatorId
			});
		} else if (!capa?.closure) {
				pendingActions.push({
					action: 'cerrar capa',
					assignee: qmsManager
				});
		} else if (!capa.closure.isClosedEffectively && !(capa.closure?.additionalCAPA)) {
			pendingActions.push({
				action: 'agregar capa de seguimiento',
				assignee: qmsManager
			});
		}
	} else {
		console.error('issue?');
	}
}

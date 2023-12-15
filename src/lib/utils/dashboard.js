// creo que tambien tiene que controlar la fecha... que se haga todo en el backend nomas eso
import users from '$lib/db/users';

export async function pendingActionsForCAPA(capa, currentDate) {
	let pendingActions = [];

	const detectionSectorId = capa?.issue?.detectedInSectorId;

	const sectorManager = await users.findOne(
		{ roles: {
				$elemMatch: {
					sectorId: detectionSectorId,
					isManager: true
				}
		}});
		

	//let sectorManager = 'sm';//users.find({}); // encontrar aca el manager del sector que recibe la nc/om
	let qmsManager = 'qm'; // qms manager

	// if capa was already closed
	if (capa?.closure?.isClosedEffectively != null) {
		// check if it wasnt effective: must have additional capa
		if (!capa.closure.isClosedEffectively && capa.closure?.additionalCAPA == null) {
			 pendingActions.push({
				 action: 'agregar capa de seguimiento',
				 assignee: qmsManager
			});
		}
	// otherwise still open...
	} else {
		// checking existence of issue object (error if not present)
		if (capa?.issue) {
			// check if there's evidence for issue
			if (!capa.issue?.evidence) {
				pendingActions.push({
					action: 'agregar evidencia a nc/om',
					assignee: sectorManager
				});
			}
			// if it's non-conformity, check for response
			if (capa.issue.isNonConformity) {
				if (!capa.issue.responseToNonConformity) {
					pendingActions.push({
						action: 'responder a no-conformidad',
						assignee: sectorManager
					});
				// also check for evidence in response no non-conformity
				} else if (!capa.issue.responseToNonConformity?.evidence) {
					pendingActions.push({
						action: 'agregar evidencia en respuesta a no-conformidad',
						assignee: sectorManager
					});
				}
				// qms staff should determine if it requires corrective actions
				if (!capa?.correctiveActionsRequirement) {
					pendingActions.push({
						actions: 'definir si requiere acciones correctivas',
						assignee: qmsManager
					});
				// if they are required, check if actions already started
				} else if(capa.correctiveActionsRequirement.isRequired && !capa?.actions) {
					pendingActions.push({
						action: 'analizar y proponer acciones para resolver no-conformidad',
						assignee: sectorManager
					});
				}
			// if it's not a nonconformity, check if actions already started
			} else if (!capa?.actions) {
				pendingActions.push({
					action: 'proponer acciones para aplicar accion de mejora',
					assignee: sectorManager
				});
			}
			if(capa?.actions) {
				for (const action of capa.actions) {
					let actionIndex = capa.actions.indexOf(action);
					// check if it was assigned
					if (!action?.assignation) {
						pendingActions.push({
							action: 'asignar responsable de accion '+String(actionIndex),
							assignee: sectorManager
						});
					// check if accepted
					} else if (!action.assignation.isAccepted) {
						pendingActions.push({
							action: 'aceptar accion asignada'+String(actionIndex),
							assignee: String(action.assignation.assigneeId)
						});
					// check for evidence (TODO: this should appear some time around commit date)
					} else if (!action?.evidence) {
						pendingActions.push({
							action: 'agregar evidencia p/ accion '+String(actionIndex),
							assignee: String(action.assignation.assigneeId)
						});
					// TODO: arreglar lo de rescheduling, comparar con fecha
					} else if (!action?.review) {
						pendingActions.push({
							action: 'dar seguimiento a accion '+String(actionIndex),
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

			// always possible to assign capa evaluation...
			// but minimum date (to set evaluation date) should be right after
			// latest commitment date for actions, in case there's any
			if (!capa?.evaluation?.assignment) {
				pendingActions.push({
					action: 'asignar evaluacion',
					assignee: qmsManager
				});
			} else if(!capa?.evaluationDate) {
				pendingActions.push({
					action: 'realizar evaluacion',
					assignee: String(capa.evaluation.assignment.evaluatorId)
				});
			} else if (!capa?.closure) {
					pendingActions.push({
						action: 'cerrar capa',
						assignee: qmsManager
					});
			} 
		} else {
			console.error('issue?');
		}
	}

	pendingActions = pendingActions.map((a) => {
		return {capaId: String(capa._id), ...a};
	});

	return pendingActions;
}



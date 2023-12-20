// TODO: compare dates (in case some action's commitment date has expired)
import users from '$lib/db/users';
import { ObjectId } from 'mongodb';

export async function pendingActionsForCAPA(capa, currentDate) {
	let pendingActions = [];

	const detectionSectorId = capa?.issue?.detectedInSectorId;

	try {
		const sectorManager = await users.findOne(
			{ roles: {
					$elemMatch: {
						sectorId: new ObjectId(detectionSectorId),
						isManager: true
					}
		}});
		const sectorManagerId = String(sectorManager._id);

		const qmsManager = await users.findOne({ isQMSStaff: true });
		const qmsManagerId = String(await qmsManager._id);
		
		const capaId = String(capa._id);
		const baseLink = `/capa/${capaId}`;

		// if capa was already closed
		if (capa?.closure?.isClosedEffectively !== undefined) {
			// check if it wasnt effective: must have additional capa
			if (!capa.closure.isClosedEffectively && capa.closure?.additionalCAPA == null) {
				 pendingActions.push({
					 link: `${baseLink}/close/addAdditionalCAPA`,
					 description: 'agregar capa de seguimiento',
					 assigneeId: qmsManagerId
				});
			}
		// otherwise still open...
		} else {
			// checking existence of issue object (error if not present)
			if (capa?.issue) {
				// check if there's evidence for issue
				if (capa.issue?.evidence === undefined) {
					pendingActions.push({
					  link: `${baseLink}/new/evidence`,
						description: 'agregar evidencia a nc/om',
						assigneeId: String(capa.issue.issuerId)
					});
				}
				// if it's non-conformity, check for response
				if (capa.issue.isNonConformity) {
					if (capa?.responseToNonConformity === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/respond-nc`,
							description: 'responder a no-conformidad',
							assigneeId: sectorManagerId
						});
					// also check for evidence in response no non-conformity
					} else if (!capa.issue.responseToNonConformity?.evidence) {
						pendingActions.push({
					  	link: `${baseLink}/respond-nc/evidence`,
							description: 'agregar evidencia en respuesta a no-conformidad',
							assigneeId: sectorManagerId
						});
					}
					// qms staff should determine if it requires corrective actions
					if (capa?.correctiveActionsRequirement === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/decide-ca`,
							description: 'definir si requiere acciones correctivas',
							assigneeId: qmsManagerId
						});
					// if they are required, check if actions already started
					} else if(capa.correctiveActionsRequirement.isRequired && !capa?.actions) {
						pendingActions.push({
					  	link: `${baseLink}/act/propose`,
							description: 'analizar y proponer acciones para resolver no-conformidad',
							assigneeId: sectorManagerId
						});
					}
				// if it's not a nonconformity, check if actions already started
				} else if (!capa?.actions) {
					pendingActions.push({
					  link: `${baseLink}/act/propose`,
						description: 'proponer acciones para aplicar accion de mejora',
						assigneeId: sectorManagerId
					});
				}
				if(capa?.actions) {
					for (const action of capa.actions) {
						let actionIndex = capa.actions.indexOf(action);
						// check if it was assigned
						if (!action?.assignation) {
							pendingActions.push({
					  		link: `${baseLink}/act/assign`,
								description: 'asignar responsable de accion ',
								//actionIndex,
								assigneeId: sectorManagerId
							});
						// check if accepted
						} else if (!action.assignation.isAccepted) {
							pendingActions.push({
					  		link: `${baseLink}/act/${actionIndex}/accept`,
								description: 'aceptar accion asignada',
								actionIndex,
								assigneeId: String(action.assignation.assigneeId)
							});
						// check for evidence (TODO: this should appear some time around commit date)
						} else if (!action?.evidence) {
							pendingActions.push({
					  		link: `${baseLink}/act/${actionIndex}/evidence`,
								description: 'agregar evidencia p/ accion',
								actionIndex,
								assigneeId: String(action.assignation.assigneeId)
							});
						// TODO: arreglar lo de rescheduling, comparar con fecha
						} else if (!action?.review) {
							pendingActions.push({
								link: '/', // TODO: fix
								description: 'dar seguimiento a accion',
								actionIndex,
								assigneeId: qmsManagerId
							});
						}
					}
				}

				// always possible to assign capa evaluation...
				// but minimum date (to set evaluation date) should be right after
				// latest commitment date for actions, in case there's any
				if (!capa?.evaluation?.assignment) {
					pendingActions.push({
						link: `${baseLink}/evaluate/assign`,
						description: 'asignar evaluacion',
						assigneeId: qmsManagerId
					});
				} else if(!capa?.evaluationDate) {
					pendingActions.push({
						link: `${baseLink}/evaluate`,
						description: 'realizar evaluacion',
						assigneeId: String(capa.evaluation.assignment.evaluatorId)
					});
				} else if (!capa?.closure) {
						pendingActions.push({
							link: `${baseLink}/close`,
							description: 'cerrar capa',
							assigneeId: qmsManagerId
						});
				} 
			} else {
				console.error('issue?');
			}
		}

		// add capaId to each pendingAction object
		pendingActions = pendingActions.map((a) => {
			return {
				capa: JSON.parse(JSON.stringify(capa)),
				capaId: String(capa._id),
				...a
			};
		});

		return pendingActions;
	} catch(error) {
		console.error(error);
		return {error};
	}
}


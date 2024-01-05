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
					} else if (capa.responseToNonConformity?.evidence === undefined) {
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
					} else if(capa.correctiveActionsRequirement.isRequired && capa?.actions === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/act/propose`,
							description: 'analizar y proponer acciones para resolver no-conformidad',
							assigneeId: sectorManagerId
						});
					}
				// if it's not a nonconformity, check if actions already started
				} else if (!capa?.actions === undefined) {
					pendingActions.push({
					  link: `${baseLink}/act/propose`,
						description: 'proponer acciones para aplicar accion de mejora',
						assigneeId: sectorManagerId
					});
				}
				if(capa?.actions) {
					for (const action of capa.actions) {
						let actionIndex = capa.actions.indexOf(action);
						
						// check first if not reviewed already (if so, we don't need to check other stuff for actions
						if (action?.review === undefined) {
							// check if not rescheduled already
							if (action?.reschedule === undefined) {
								// compare commit date with current date
								if (currentDate <= action.proposal.commitmentDate) {
									console.log("(currentDate <= action.proposal.commitmentDate)");
									// check if it was assigned
									if (action?.proposal?.assignment === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/assign`,
											description: 'asignar responsable de accion',
											//actionIndex,
											assigneeId: sectorManagerId
										});
									// check if accepted
									} else if (action.proposal.assignment?.acceptance === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/accept`,
											description: 'aceptar accion asignada',
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									// check for evidence
									} else if (!action?.evidence) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/evidence`,
											description: 'agregar evidencia p/ accion',
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									} else { // review
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/review`,
											description: 'dar seguimiento a accion',
											actionIndex,
											assigneeId: qmsManagerId
										});
									}
								} else {
									// reschedule
									pendingActions.push({
										link: `${baseLink}/act/${actionIndex}/reschedule`,
										description: 'reagendar accion (fecha de compromiso expirada)',
										actionIndex,
										assigneeId: sectorManagerId
									});
								} 
							} else { // already rescheduled
								// check if within date...
								if (currentDate <= action.reschedule.rescheduledCommitmentDate) {
									// if so, check acceptance and then check evidence and then review
									if (action.reschedule.assignment?.acceptance === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/accept`,
											description: 'aceptar accion (reagendada) asignada',
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									// check for evidence
									} else if (action?.evidence === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/evidence`,
											description: 'agregar evidencia p/ accion',
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									} else { //review
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/review`,
											description: 'dar seguimiento a accion',
											actionIndex,
											assigneeId: qmsManagerId
										});
									}
								}
							}
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


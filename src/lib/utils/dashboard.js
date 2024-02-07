import { ObjectId } from 'mongodb';

import capas from '$lib/db/capas';
import users from '$lib/db/users';

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
				}
			}
		);
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
					 description: 'Agregar NC/OM de seguimiento',
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
						description: 'Agregar evidencia de NC/OM',
						assigneeId: String(capa.issue.issuerId)
					});
				}
				// if it's non-conformity, check for response
				if (capa.issue.isNonConformity) {
					if (capa?.responseToNonConformity?.responseDate === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/respond-nc`,
							description: 'Responder a No-Conformidad',
							assigneeId: sectorManagerId
						});
					// also check for evidence in response to non-conformity
					} else if (capa.responseToNonConformity?.immediateActions?.evidence === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/respond-nc/evidence`,
							description: 'Agregar evidencia de accion inmediata ante No-Conformidad',
							assigneeId: sectorManagerId
						});
					}

					// qms staff should determine if it requires corrective actions
					if (capa?.correctiveActionsRequirement === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/decide-ca`,
							description: 'Definir si requiere acciones correctivas',
							assigneeId: qmsManagerId
						});
					// if they are required, check if actions already started
					// TODO: if it's a non-conformity, check also that immediate actions are already done
					// const immediateActionsDone = 
					} else if(capa.correctiveActionsRequirement.isRequired && capa?.actions === undefined) {
						pendingActions.push({
					  	link: `${baseLink}/act/propose`,
							description: 'Analizar y proponer acciones para resolver No-Conformidad',
							assigneeId: sectorManagerId
						});
					}
				// if it's not a nonconformity, check if actions already started
				} else if (!capa?.actions === undefined) {
					pendingActions.push({
					  link: `${baseLink}/act/propose`,
						description: 'Proponer acciones para aplicar la Accion de Mejora',
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
											link: `${baseLink}/act/${actionIndex}/assign`,
											description: `Asignar responsable de accion ${actionIndex+1}`,
											actionIndex,
											assigneeId: sectorManagerId
										});
									// check if accepted
									} else if (action.proposal.assignment?.acceptance === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/accept`,
											description: `Aceptar accion (${actionIndex+1}) asignada`,
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									// check for evidence
									} else if (!action?.evidence) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/evidence`,
											description: `Agregar evidencia p/ accion ${actionIndex+1}`,
											actionIndex,
											assigneeId: String(action.proposal.assignment.assigneeId)
										});
									} else { // review
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/review`,
											description: `Dar seguimiento a accion ${actionIndex+1}`,
											actionIndex,
											assigneeId: qmsManagerId
										});
									}
								} else {
									// reschedule
									pendingActions.push({
										link: `${baseLink}/act/${actionIndex}/reschedule`,
										description: `Reagendar accion ${actionIndex+1}(fecha de compromiso expirada)`,
										actionIndex,
										assigneeId: sectorManagerId
									});
								} 
							} else { // already rescheduled
								// check if within date...
								console.log('currentDate:',currentDate);
								console.log('rescheduled commit date:', action.reschedule.rescheduledCommitmentDate);

								if (currentDate <= action.reschedule.rescheduledCommitmentDate) {
									console.log('in here')
									// if so, check acceptance and then check evidence and then review
									if (action.reschedule.assignment?.acceptance === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/accept`,
											description: `Aceptar accion  ${actionIndex+1} (reagendada) asignada`,
											actionIndex,
											assigneeId: String(action.reschedule.assignment.assigneeId)
										});
									// check for evidence
									} else if (action?.evidence === undefined) {
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/evidence`,
											description: `Agregar evidencia para accion ${actionIndex+1} (reagendada)`,
											actionIndex,
											assigneeId: String(action.reschedule.assignment.assigneeId)
										});
									} else { //review
										pendingActions.push({
											link: `${baseLink}/act/${actionIndex}/review`,
											description: `Dar seguimiento a accion ${actionIndex+1}`,
											actionIndex,
											assigneeId: qmsManagerId
										});
									}
								} else {
									// if rescheduled commitment date also passed
									pendingActions.push({
										link: `${baseLink}/act/${actionIndex}/review`,
										description: `Dar seguimiento a accion ${actionIndex+1} (reagendamiento expirado)`,
										actionIndex,
										assigneeId: qmsManagerId
									});
								}
							}
						}
					} 
				}

				// from here on we check if the capa is ready to be reviewed and closed
				let isReadyToClose;

				// min date for evaluation date should be right after
				// latest commitment date for actions (if any actions)
				// otherwise 
				const isActionsRequired = (
					(capa.issue.isNonconformity
						&& capa?.correctiveActionsRequirement?.isRequired)
					|| !capa.issue.isNonConformity
				);

				if (isActionsRequired) {
					if (capa?.actions) {
						const latestCommitmentDate = new Date(Math.max.apply(null,
							capa.actions.map((action) => {
								let dates = action?.reschedule?.rescheduledCommitmentDate
									? action.reschedule.rescheduledCommitmentDate
									: action.proposal.commitmentDate;
								return dates
							})));
						console.log(latestCommitmentDate);
						isReadyToClose = (currentDate > latestCommitmentDate);
					} else {
						isReadyToClose = false;
					}
				} else if (capa.issue.isNonConformity
					&& capa?.correctiveActionsRequirement?.isRequired !== undefined
					&& !capa.correctiveActionsRequirement.isRequired
					&& capa?.responseToNonConformity?.immediateActions?.evidence
					&& capa.responseToNonConformity.immediateActions.evidence.length>0) {
					isReadyToClose = true;
				} else {
					isReadyToClose = false;
				}
				
        if (isReadyToClose) { 
					if (!capa?.evaluation?.assignment) {
						pendingActions.push({
							link: `${baseLink}/evaluate/assign`,
							description: 'Asignar evaluacion',
							assigneeId: qmsManagerId
						});
					} else if(capa?.evaluation?.evaluationDate === undefined) {
						pendingActions.push({
							link: `${baseLink}/evaluate`,
							description: 'Realizar evaluacion',
							assigneeId: String(capa.evaluation.assignment.evaluatorId)
						});
					} else if (capa?.closure === undefined) {
						pendingActions.push({
							link: `${baseLink}/close`,
							description: 'Cerrar',
							assigneeId: qmsManagerId
						});
					}
				} 
			} else {
				console.error('issue?');
			}
		}

		// add capa info to each pendingAction object
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
	}
}

export async function pendingActionsForUser(user, currentDate) {
	const cursor = capas.find(); // TODO: filter out the finished ones
	let capasArray;

	try {
		capasArray = await cursor.toArray();
	} catch(error) {
		console.error(error);
	} finally {
		if (capasArray) {
			// concat arrays
			let pendingActions = capasArray
				.map((capa) => pendingActionsForCAPA(capa, currentDate));

			// clean up and filter, resulting in actions assigned to user only
			pendingActions = (await Promise.all(pendingActions))
				.filter((capa) => capa.length>0)
				.reduce((a, c) => [...a, ...c], [])
				.filter((action) => action.assigneeId === user._id);

			return pendingActions;
		}
	}
}

export async function pendingActionsForUserGroupedByCapa(user, currentDate) {
	let pendingActions;

	try {
		pendingActions = await pendingActionsForUser(user, currentDate);
	} catch(error) {
		console.error(error);
	} finally {
		if (pendingActions) {
			if (pendingActions.length === 0) {
				return [];
			} else {
				const groupedPendingActions = pendingActions.reduce((accumulator, currentObject) => {
					const { capaId } = currentObject;

					// check if exists, otherwise create entry
					if (!accumulator[capaId]) {
						accumulator[capaId] = [];
					}

					accumulator[capaId].push(currentObject);

					return accumulator;
				}, []);

				let groupedPendingActionsArray = Object.values(groupedPendingActions);

				let pendingActionsGroupedByCapa = groupedPendingActionsArray.map(a => {
					return {
						capa: a[0].capa,
						pendingActions: a.map(o => {
							return {
								description: o.description,
								link: o.link
							}
						})
					}
				});

				return pendingActionsGroupedByCapa;
			}
		}
	}
}

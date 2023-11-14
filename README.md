# schema
```js
capa = {
	_id //objectid
	version //int
	issue: {
		creationDate //date
		issuerId //objectid(user)
		isNonConformity //bool
		detectedDuring //string('pr'(process)||'ia'(internal audit)||'ea'(external audit))
		detectedInSectorId //objectid(sectors)
		description //string
		evidence //array[objectid(evidences)]
	}
    responseToNonConformity: { // only when isNonConformity
		responseDate //date
		responderId //objectid(user)
		immediateActions: {
				proposedSolution
				evidence //array[objectid(evidences)]	
		}
		possibleConsequences //string
		possibleRootCauses //string
    }
    correctiveActionsRequirement: {
		requirementDate //date
		requirerId //objectid(user) qms person
		isRequired //bool
	}
    actions: [
        {
            proposal: {
                proposalDate //date,
                proponentId //objectid(user)
                proposedSolution //string
                commitmentDate //date
                assignment: { //completed by proposer
                    responsibleId //objectid(user)// assignation (could be self-assigned): [should have been 'assignee']
                    assignmentDate // date
                    comments // string
                    acceptance: { //completed by assignee
                        isAccepted //bool // by assigned responsible
                        acceptanceDate //date
                        comments // string 
                    }
                },
            },
            ?reschedule: {
                // some of the following might not be addded; in that case, it is understood that the previous values still hold; rescheduleDate is neede, so is reschedulerId and rescheduledCommitmentDate... the rest ? idk
                rescheduleDate //date
                reschedulerId // objectid(user), qms person (?)
                rescheduledCommitmentDate // date
                assignment: {
                    responsibleId //objectid(user)// -- should be the original proposer now, to make sure and avoid blaming someone else!
                    assignmentDate // date
                    comments
                    acceptance: {
                        isAccepted //bool
                        acceptanceDate //date
                        comments // string (?)
                    }
                }
            }
            evidence array[objectid(evidence)] // uploaded by assigned person or by creator
            review: { // (follow up):
                reviewerId // objectid(user), qms user
                //isRescheduled // bool, default=false => this is unnecesary probably... i just need the 'reschedule' field to know this... if it exists, then it has been rescheduled already, no need to check here
                isAccomplished // bool
                comments // string
            }
        }//,...more of those maybe...
    ]
    evaluation: {
        assignment: {
            assignerId // qm person
            evaluatorId //assigned by qm (not qm nor issued ppl nor issuer, right?)
            assignationDate //date
        }
		evaluationDate date //assigned by qm
		comments //string
		isEffective bool
	}
	closure: { // by QM person
        closerId
        closureDate
		isRisksUpdateRequired //bool
		isChangingQMSRequired //bool
		comments //string
		isClosedEffectively bool
		additionalCAPA objectid(capas)
	}
}

evidence = {
}

sector = {
}

user = {
}

```


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

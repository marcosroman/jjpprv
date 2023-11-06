# schema
```js
capas = {
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
	correctiveActions: {
		requirementDate //date
		requirerId //objectid(user) qms person
		isRequired //bool
	}
	response: {
		responseDate //date
		responderId //objectid(user)
		immediateActions: { // only when isNonConformity
				proposedSolution
				evidence //array[objectid(evidences)]	
		}
		possibleConsequences //string // only when isNonCoformity
        possibleRootCauses //string // only when isNonConformity
        actions: [
            {
                // creation
                creationDate //date,
                creatorId //objectid(user)
                proposedSolution //string
                commitmentDate //date
                // assignation (could be self-assigned):
                assignedResponsibleId //objectid(user)
                isAcceptedByAssignedResponsible //bool
                acceptanceDate //date
                // results:
                evidence array[objectid(evidence)] // uploaded by assigned person or by creator
                commentsByResponsibleUser string
                // follow up:
                followUpperId // objectid(user), qms user
                isAccomplished // bool
                followUpComments // string
                ?rescheduleDate // date
                ?isRescheduleAgreed //bool (ok???)
                }
            }//,...more of those maybe...
        ]
	}
    evaluation: {
		evaluatorId //assigned by qm (not qm nor issued ppl nor issuer, right?)
		assignationDate //date
		evaluationDate date //assigned by qm
		commentsByEvaluator //string
		isClosedEffectively bool
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

evidences = {
}

sectors = {
}

users = {
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

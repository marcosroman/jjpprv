# schema
```js
capa = {
	_id //objectid
	version //int
	issue: {
		creationDate //date
		issuerId //objectid(user)
		isNonConformity //bool
		detectedDuringId //string('pr'(process)||'ia'(internal audit)||'ea'(external audit))
		detectedInSectorId //objectid(sectors)
		description //string
		evidence //array[objectid(evidences)]
	}
	response: {
		responseDate //date
		responderId //objectid(user)
        immediate: {
            //immediateActions //string
            solution
            evidence //array[objectid(evidences)]	
        }
		possibleConsequences //string
        possibleRootCauses //string (only needed if correctiveActions.isRequired)
        actions: [
            {
                creationDate //date,
                creatorId //objectid(user)
                solution //string
                commitmentDate //date
                assignedResponsibleId //objectid(user)
                isAcceptedByAssignedResponsible //bool
                acceptanceDate //date
                evidence array[objectid(evidence)]
                commentsByResponsibleUser string
                evaluation: {
                    evaluator_id // qms person
                    comments //string
                    ?rescheduleDate //date
                    isAccomplished //bool
                }
            }//,...more of those maybe...
        ]
	}
	correctiveActions: {
		isRequired //bool
		requirementDate //date
		requirerId //objectid(user)
        /*
		response: {
			responseDate //date
			possibleRootCauses //string
		}*/
	}
	evaluation: {
		assignationDate //date
		evaluationDate date //assigned by qm
		evaluatorId //assigned by qm (not qm nor issued ppl nor issuer, right?)
		commentsByEvaluator //string
		isClosedEffectively bool
	}
	closure: {
		isRisksUpdateRequired //bool
		isChangingQMSRequired //bool
		comments //string
		isClosedEffectively bool
		additionalCAPA objectid(capas)
	}
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

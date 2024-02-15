<script>
	import { onMount } from 'svelte';
	import { differenceInDays } from 'date-fns';
	import { goto } from '$app/navigation';

	import { dateString } from '$lib/utils/date';
	import userNameString from '$lib/utils/userName';
	import duringProcessString from '$lib/utils/during';

	import loadingAnimation from '$lib/assets/loading.gif';

	export let capaId;

	const immediateActionIcon = "⚡"; // 💥?
	const evidenceIcon = "📄";
	const correctiveActionRequirementIcon = "🔍";
	const greenCircleIcon = "🟢";
	const redCircleIcon = "🔴";
	const yellowCircleIcon = "🟡";
	const calendarIcon = "📆";
	const assignmentIcon = "👉";
	const acceptedIcon = "👍"; //"🫡";//'\u1fae1';//"🫡";//
	const reviewIcon = "🧐";
	const checkIcon = "✅";
	const crossIcon = "❌";
	const evaluationIcon = "👀";
	const closureIcon = "🔒";
	const redoIcon = "🔂";

	let isDetailShown = false;
	function toggleDetail() {
		isDetailShown = !isDetailShown;
	}

	let capa = null;
	let capaTypeDescription = null;
	let numberOfDaysSinceCreation = null;

	onMount(async () => {
		try {
			const response = await fetch(`/api/capa/${capaId}/view`);
			capa = await response.json();
		} catch(error) {
			console.error(error);
		}

		if (capa) {
			capaTypeDescription = capa.issue.isNonConformity ?
				"NC" :
				"OM";

			numberOfDaysSinceCreation = differenceInDays(new Date(),
				new Date(capa.issue.creationDate));
		}
	});

	let loadingCapaDetail = false; // to show spinner once show-detail button clicked
</script>

{#if capa && !loadingCapaDetail}
	<div class="p-4 text-black rounded-md shadow-xl"
		style={`background-color: #${capa._id.slice(-7,-1)};`}>
		<div class="flex justify-between m-2">
			<div>
				<span class="font-bold">{capaTypeDescription}</span>
				<wbr>({capa.issue.detectedInSector.fullName})
			</div>
			<div class="self-align-right">
				<!-- show-detail -->
				<button class="bg-transparent border-none font-bold text-center text-xl"
					on:click|preventDefault={() => {loadingCapaDetail = true; goto(`/capa/${capa._id}/view`);}}>
					👁️
				</button>
			</div>
		</div>

		{#if isDetailShown}
			<div class="flex my-4 mx-2 w-full justify-center">
				<div class="flex flex-col w-3/4 align-center justify-center">
					<div class="w-3/4 text-center text-xs place-self-center"><span class="font-bold">id</span> {capa._id}</div>
					<div class="w-3/4 m-2 p-4 border-black border-solid rounded border-1 bg-gray-100 place-self-center overflow-auto max-h-[10em]">{capa.issue.description}</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-row flex-wrap items-center justify-evenly">
			{#if capa?.issue?.isNonConformity}
				<div class="p-2 flex flex-col">
					{#if capa?.responseToNonConformity?.immediateActions}
						<div class="text-3xl">{immediateActionIcon}</div>
					{:else}
						<div class="text-3xl grayscale opacity-20">{immediateActionIcon}</div>
					{/if}

					{#if capa?.responseToNonConformity?.immediateActions?.evidence}
						<div class="text-3xl">{evidenceIcon}</div>
					{:else}
						<div class="text-3xl grayscale opacity-20">{evidenceIcon}</div>
					{/if}
				</div>

				<div class="p-2 flex flex-col">
					{#if capa?.correctiveActionsRequirement?.isRequired === undefined}
						<div class="text-3xl grayscale opacity-20">{correctiveActionRequirementIcon}</div>
							<div class="text-xl text-center">{yellowCircleIcon}</div>
					{:else}
						<div class="text-3xl">{correctiveActionRequirementIcon}</div>
						{#if capa?.correctiveActionsRequirement?.isRequired}
							<div class="text-xl text-center">{redCircleIcon}</div>
						{:else}
							<div class="text-xl text-center">{greenCircleIcon}</div>
						{/if}
					{/if}
				</div>
			{/if}

			{#if capa.actions && capa.actions[0]?.proposal?.proposalDate}
				<div class="p-2">
					<table class="border-gray-500">
						{#each capa.actions as action, index}	
							<tr class="p-1 border-solid">
								<th class="p-2">
									{index+1}
									{#if action?.review?.isAccomplished !== undefined}
										{#if action.review.isAccomplished}
											<div class="text-2xl p-1">{checkIcon}</div>
										{:else}
											<div class="text-2xl p-1">{crossIcon}</div>
										{/if}
									{/if}
								</th>

								<td class="flex flex-wrap flex-row border-none">
									{#if action?.reschedule?.rescheduleDate}
										<div class="text-2xl p-1 hue-rotate-15">{calendarIcon}</div>
									{:else}
										<div class="text-2xl p-1">{calendarIcon}</div>
									{/if}

									{#if action.proposal?.assignment?.assignmentDate}
										<div class="text-2xl p-1">{assignmentIcon}</div>
									{:else}
										<div class="text-2xl p-1 grayscale opacity-20">{assignmentIcon}</div>
									{/if}
									{#if action.proposal?.assignment?.acceptance?.acceptanceDate}
										<div class="text-2xl p-1">{acceptedIcon}</div>
									{:else}
										<div class="text-2xl p-1 grayscale opacity-20">{acceptedIcon}</div>
									{/if}
									{#if action?.evidence && action.evidence.length>0}
										<div class="text-2xl p-1">{evidenceIcon}</div>
									{:else}
										<div class="text-2xl p-1 grayscale opacity-20">{evidenceIcon}</div>
									{/if}

									{#if action?.reschedule?.rescheduleDate}
										<div class="text-2xl p-1 hue-rotate-90">{calendarIcon}</div>
									{/if}

									{#if action?.review?.isAccomplished !== undefined}
										<div class="text-2xl p-1">{reviewIcon}</div>
										<!--
										{#if action.review.isAccomplished}
											<div class="text-2xl p-1">{checkIcon}</div>
										{:else}
											<div class="text-2xl p-1">{crossIcon}</div>
										{/if}
										-->
									{:else}
										<div class="text-2xl p-1 grayscale opacity-20">{reviewIcon}</div>
									{/if}
								</td>
							</tr>
						{/each}
					</table>
				</div>
			{/if}

			{#if capa?.evaluation && capa.evaluation.evaluationDate}
				<div class="p-2 text-3xl">{evaluationIcon}</div>
			{:else}
				<div class="p-2 text-3xl grayscale opacity-20">{evaluationIcon}</div>
			{/if}

			{#if capa?.closure && Object.keys(capa.closure).length>0}
				<div class="flex flex-col p-2">
					<div class="text-3xl">{closureIcon}</div>
					{#if capa.closure.isClosedEffectively}
						<div class="text-3xl">{checkIcon}</div>
					{:else}
						<div class="text-3xl">{crossIcon}</div>
						{#if capa.closure?.additionalCAPA}
							<div class="text-3xl">{redoIcon}</div>
						{:else}
							<div class="text-3x1 grayscale opacity-20">{redoIcon}</div>
						{/if}
					{/if}
				</div>
			{:else}
				<div class="text-3xl grayscale opacity-20">{closureIcon}</div>
			{/if}
		</div>

		<div class="flex justify-between m-2">
			<div class="flex flex-col-reverse">
				<p class="text-xs pr-2">
					{dateString(capa.issue.creationDate)}
					{#if numberOfDaysSinceCreation === 0}
						(hoy)
					{:else}
						(hace {numberOfDaysSinceCreation} {numberOfDaysSinceCreation ===1 ? "dia" : "dias"})
					{/if}
				</p>
			</div>
			<div class="self-align-right">
				<button class="bg-transparent border-none font-bold text-center text-xl"
					on:click={toggleDetail}>
					{#if isDetailShown}
						🔼
					{:else}
						🔽
					{/if}
					</button>
			</div>
		</div>
	</div>
{:else}
	<div class="flex justify-center">
		<img class="w-1/6" src={loadingAnimation} alt="loading...">
	</div>
{/if}

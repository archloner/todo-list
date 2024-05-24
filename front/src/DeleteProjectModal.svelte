<script>
	import { createEventDispatcher } from 'svelte';
	import AppConfig from './AppConfig';
	import { deleteRequest } from './HttpUtils';
	import NotificationType from './NotificationType';

	let dispatch = createEventDispatcher();

	let deleteProjectModal;
	let deleteProjectModalWrapper;

	let projectTitle;
	let projectId;

	export function setProjectToDelete(proj) {
		projectTitle = proj.name;
		projectId = proj.projectId;
	}

	async function confirmProjectDelete() {
		console.log(`Delete task ${projectTitle}`);
		let url = `${AppConfig.API_URL}/project/${projectId}`;
		let resp = await deleteRequest(url);

		dispatch('notify', {
			title: 'Project deleted',
			text: `Project ${projectTitle} was successfully deleted`,
			type: NotificationType.SUCCESS
		});

		projectId = null;
		projectTitle = '';

		dispatch('reload', {});
		hideDeleteModal();
	}

  export function show() {
    deleteProjectModalWrapper.classList.remove('hide')
  }

	export function hideDeleteModal() {
		projectId = null;
		deleteProjectModal.classList.toggle('modal-dissmis-animation');
		setTimeout(() => {
			deleteProjectModalWrapper.classList.toggle('hide');
			deleteProjectModal.classList.toggle('modal-dissmis-animation');
		}, 550);
	}
</script>

<div
	class="modal-wrapper wrapper-fade-in-animation hide"
	id="confirm-task-delete-modal"
	bind:this={deleteProjectModalWrapper}
>
	<div class="new-task-modal modal-show-animation" bind:this={deleteProjectModal}>
		<h1 class="title">Delete task?</h1>
		<p>
			Delete project <span class="task-title">{projectTitle}</span>?
		</p>
		<div class="form-row form-controls">
			<button class="btn btn-danger" id="delete-confirm" on:click={confirmProjectDelete}>
				Delete
			</button>
			<button class="btn btn-primary" id="delete-cancel" on:click={hideDeleteModal}>
				Cancel
			</button>
		</div>
		<div class="close-btn">
			<i class="fas fa-times" on:click={hideDeleteModal}></i>
		</div>
	</div>
</div>

<style>
</style>

<script>
  import { createEventDispatcher, onMount } from "svelte";
  import NotificationType from "./NotificationType";
	import AppConfig from "./AppConfig";
	import { putRequest } from "./HttpUtils";

  let dispatch = createEventDispatcher();

  let editProjectModalWrapper;
  let editProjectModal;

  export let project;

  onMount(() => {
    name = project.title;
    description = project.description; 
  })

  let name;
  let description;
  let projectId;

  let validation = {
    name: '',
    description: ''
  }

  function validateProjectName() {
    if (name == undefined || name == '' || name == null) {
      validation.name = 'Cannot be empty'
    } else if (name.length > 250) {
      validation.name = 'Name too long';
    } else {
      validation.name = ''
    }
  }

  function validateProjectDescription() {
    if (description == undefined || description == '' || description == null) {
      validation.name = 'Cannot be empty'
    } else if (description.length > 250) {
      validation.description = 'Name too long';
    } else {
      validation.description = ''
    }
  }

  export function show() {
    editProjectModal.classList.remove('hide');
    editProjectModalWrapper.classList.remove('hide')
  }

  export function hide() {
    editProjectModal.classList.add('modal-dissmis-animation');
    setTimeout(() => {
			editProjectModal.classList.remove('modal-dissmis-animation');
			editProjectModal.classList.add('hide');
      editProjectModalWrapper.classList.add('hide')
			// window.removeEventListener('keydown', escapeKeydownListener, false)
			resetForm();
		}, 500);
  }

  function resetForm() {
    name = ''
    description = ''
  }

  async function handleSubmit() {
    // Check if form is valid
    let valid = true;
    for (let item in validation) {
      if (validation[item] != '') {
        valid = false;
      }
    }
    
    if (valid == false) {
      dispatch('notify', {title: 'Error', text: 'Create project form has errors', type: NotificationType.ERROR})
      return
    } else {
      let reqBody = {name, description}
      console.log(reqBody)

      let url = `${AppConfig.API_URL}/project/${projectId}`;
      let res = await putRequest(url, reqBody) 
      console.log(res)
      if (res.status == 200) {
        dispatch('reload', {})
        dispatch('notify', {title: 'Success', text: `Project <b>${name}</b> updated successfully`, type: NotificationType.SUCCESS})
      } else {
        dispatch('notify', {title: 'Error', text: 'Server error while updating project', type: NotificationType.ERROR})
      }
      resetForm()
      hide()
    }
  }

  onMount(() => {
    hide()
  })

  export function sendData(nameToEdit, descr, id) {
    name = nameToEdit;
    description = descr
    projectId = id;
    show();
  }

</script>

<div
	class="modal-wrapper wrapper-fade-in-animation hide"
	id="new-task-modal-wrapper"
	bind:this={editProjectModalWrapper}
>
	<div class="new-task-modal modal-show-animation" bind:this={editProjectModal}>
		<h1 class="title">Edit Project</h1>
		<form id="new-task-form">
			<div class="form-row">
				<label htmlFor="task-title" class="form-label" id="form-label-title">
					Project name <span class="validation-msg">{validation.name}</span>
				</label>
				<input
					type="text"
					name="task-title"
					id="task-title"
					placeholder="Title"
					bind:value={name}
					on:blur={validateProjectName}
				/>
			</div>

			<div class="form-row">
				<label htmlFor="task-description" class="form-label" id="form-label-description">
					Project description <span class="validation-msg">{validation.description}</span>
				</label>
				<input
					type="text"
					name="task-description"
					id="task-description"
					placeholder="Description"
					bind:value={description}
					on:blur={validateProjectDescription}
				/>
			</div>

			<div class="form-row form-controls">
				<button
					class="btn btn-primary"
					id="new-task-submit"
					on:click|preventDefault={handleSubmit}
				>
					Edit
				</button>
			</div>
			<div class="close-btn" on:click={hide}>
				<i class="fas fa-times"></i>
			</div>
		</form>
	</div>
</div>

<style>

</style>
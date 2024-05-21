<script>
  import { createEventDispatcher, onMount } from "svelte";
  import NotificationType from "./NotificationType";
	import AppConfig from "./AppConfig";
	import { postRequest } from "./HttpUtils";

  let dispatch = createEventDispatcher();

  let createProjectModalWrapper;
  let createProjectModal;

  let name;
  let description;

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
    createProjectModal.classList.remove('hide');
    createProjectModalWrapper.classList.remove('hide')
  }

  export function hide() {
    createProjectModal.classList.add('modal-dissmis-animation');
    setTimeout(() => {
			createProjectModal.classList.remove('modal-dissmis-animation');
			createProjectModal.classList.add('hide');
      createProjectModalWrapper.classList.add('hide')
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

      let url = `${AppConfig.API_URL}/project`;
      let res = await postRequest(url, reqBody) 
      if (res.status >= 200 && res.status < 300) {
        dispatch('reload', {})
        dispatch('notify', {title: 'Success', text: 'Project created successfully', type: NotificationType.SUCCESS})
      } else {
        dispatch('notify', {title: 'Error', text: 'Server error while creating project', type: NotificationType.ERROR})
      }
      resetForm()
      hide()
    }
  }

  onMount(() => {
    hide()
  })

</script>

<div
	class="modal-wrapper wrapper-fade-in-animation hide"
	id="new-task-modal-wrapper"
	bind:this={createProjectModalWrapper}
>
	<div class="new-task-modal modal-show-animation" bind:this={createProjectModal}>
		<h1 class="title">New Project</h1>
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
					Create
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
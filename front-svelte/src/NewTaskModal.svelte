<script>
    import { onMount } from "svelte";

	let createTaskModalWrapper;
	let createTaskModal;

	let taskTitle;
	let taskDescription;
	let dueDate;
	let priority;

	let validation = {
		taskTitle: '',
		taskDescription: '',
		dueDate: ''
	};

    onMount(() => {
        dueDate = new Date().toISOString().substr(0, 10);
    })

	function closeCreateTaskModal() {
        console.log(createTaskModal)
		createTaskModal.classList.add('modal-dissmis-animation');
		setTimeout(() => {
			createTaskModal.classList.remove('modal-dissmis-animation');
			createTaskModalWrapper.classList.add('hide');
            // window.removeEventListener('keydown', escapeKeydownListener, false)
			resetForm();
		}, 500);
	}

	function resetForm() {
		taskTitle = '';
		taskDescription = '';
		dueDate = new Date().toISOString().substr(0, 10);
		priority = '';

		validation = {
			taskTitle: '',
			taskDescription: '',
			dueDate: ''
		};
	}

    function escapeKeydownListener(e) {
        if (e.key === 'Escape') {
		    closeCreateTaskModal();
		}
    }

	export function showModal() {
		createTaskModalWrapper.classList.remove('hide');
		// window.addEventListener('keydown', escapeKeydownListener); // strange js shit happening, don't have energy to deal with it at the moment
	}

	function validateTaskTitle() {
        console.log('validating task title')
        console.log(taskTitle)
		if (taskTitle == undefined || taskTitle == '') {
			validation.taskTitle = 'Task title must not be empty';
		} else if (taskTitle.length > 30) {
			validation.taskTitle = 'Too long, maximum 30 characters';
		} else {
			validation.taskTitle = '';
		}
	}

	function validateTaskDescription() {
        console.log('validating task description')
		if (taskDescription == undefined || taskDescription == '') {
			validation.taskDescription = 'Must not be empty';
		} else if (taskDescription.length > 150) {
			validation.taskDescription = 'Too long, maximum 150 characters';
		} else {
			validation.taskDescription = '';
		}
	}

    function validateDueDate() {
        console.log('validating due date')
        console.log(dueDate)
        if (dueDate == undefined || dueDate == '') {
            validation.dueDate = 'Must not be empty'
        } else if (new Date(dueDate) < new Date()) {
            validation.dueDate = 'Must be in the future'
        } else {
            validation.dueDate = ''
        }
    }

	function handleCreateClick() {
		alert('Creating new task!');
	}
</script>

<div
	class="modal-wrapper wrapper-fade-in-animation hide"
	id="new-task-modal-wrapper"
	bind:this={createTaskModalWrapper}
>
	<div class="new-task-modal modal-show-animation" bind:this={createTaskModal}>
		<h1 class="title">Add new task</h1>
		<form id="new-task-form">
			<div class="form-row">
				<label htmlFor="task-title" class="form-label" id="form-label-title">
					Task title <span class="validation-msg">{validation.taskTitle}</span>
				</label>
				<input
					type="text"
					name="task-title"
					id="task-title"
					placeholder="Title"
					bind:value={taskTitle}
					on:blur={validateTaskTitle}
				/>
			</div>

			<div class="form-row">
				<label htmlFor="task-description" class="form-label" id="form-label-description">
					Task description <span class="validation-msg">{validation.taskDescription}</span>
				</label>
				<input
					type="text"
					name="task-description"
					id="task-description"
					placeholder="Description"
					bind:value={taskDescription}
					on:blur={validateTaskDescription}
				/>
			</div>

			<div class="form-row">
				<label htmlFor="task-priority" class="form-label" id="form-label-priority">
					Priority
				</label>
				<form id="priority-form">
					<div class="flex-row radio-wrapper">
						<div class="radio-container bg-white">
							<input
								type="radio"
								name="priority"
								id="priority-default"
								value="default"
								checked
								bind:group={priority}
							/>
							<label htmlFor="priority-default">Default</label>
						</div>
						<div class="radio-container bg-low">
							<input
								type="radio"
								name="priority"
								id="priority-low"
								value="low"
								bind:group={priority}
							/>
							<label htmlFor="priority-low">Low</label>
						</div>
						<div class="radio-container bg-medium">
							<input
								type="radio"
								name="priority"
								id="priority-medium"
								value="medium"
								bind:group={priority}
							/>
							<label htmlFor="priority-medium">Medium</label>
						</div>
						<div class="radio-container bg-danger">
							<input
								type="radio"
								name="priority"
								id="priority-high"
								value="high"
								bind:group={priority}
							/>
							<label htmlFor="priority-high">High</label>
						</div>
					</div>
				</form>
			</div>

			<div class="form-row">
				<label htmlFor="task-due-date" class="form-label" id="form-label-due-date">
					Due date <span class="validation-msg">{validation.dueDate}</span>
				</label>
				<input type="date" name="task-due-date" id="task-due-date" bind:value={dueDate} on:blur={validateDueDate}/>
			</div>

			<div class="form-row form-controls">
				<button
					class="btn btn-primary"
					id="new-task-submit"
					on:click|preventDefault={handleCreateClick}
				>
					Create
				</button>
			</div>
			<div class="close-btn" on:click={closeCreateTaskModal}>
				<i class="fas fa-times"></i>
			</div>
		</form>
	</div>
</div>

<style>
</style>

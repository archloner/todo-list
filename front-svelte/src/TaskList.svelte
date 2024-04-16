<script>
	import { onMount } from 'svelte';
	import AppConfig from './AppConfig';
	import Spinner from './Spinner.svelte';
	import NewTaskModal from './NewTaskModal.svelte';
	import { createEventDispatcher } from 'svelte';
	import NotificationType from './NotificationType';

	let dispatch = createEventDispatcher();

	function notify(title, text, type) {
		dispatch('notify', { title, text, type });
	}

	let pageContent;
	let projectData = {};
	let taskList = {};

	let createTaskModalWrapper;
	let createTaskModal;
	let deleteTaskModal;
	let newTaskButton;
	let taskDetails;

	let dummyProjectData = {
		title: 'Overview',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do \
  eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		taskList: [
			{
				title: 'Update about page header',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
				isComplete: false,
				dueDate: '',
				priority: '',
				isExpanded: false
			}
		]
	};

	projectData = dummyProjectData;
	taskList = dummyProjectData.taskList;

	async function fetchData() {
		try {
			let res = await fetch(AppConfig.API_URL + '/project');
			if (!res.ok) {
				throw new Error(`API request failed with status ${res.status}`);
			}
			let data = await res.json();
			notify('Data loaded', 'Data successfully fetched from the API', NotificationType.SUCCESS);
			return data;
		} catch (error) {
			console.log('Error fetching data: ', error);
			notify('Error', 'Error while loading data from the service', NotificationType.ERROR);
			showError();
			return null;
		}
	}

	async function loadData() {
		console.log('Getting data...');
		let data = await fetchData();
		console.log('Received data OK!');

		projectData = data[0];
		taskList = data[0].taskList;

		taskList.forEach((task) => {
			task.isExpanded = false;
			task.showMenu = false;
		});
		// Show content and hide spinner
		pageContent.classList.remove('hide');
		isSpinnerHidden = true;
		console.log(taskList);
	}
	let completedTasks = [1];

	let isSpinnerHidden;

	onMount(() => {
		console.log('Component mounted...');
		isSpinnerHidden = false;
		loadData();
	});

	let errorPage;

	function showError() {
		isSpinnerHidden = true;
		errorPage.classList.toggle('hide');
	}

	let Priority = {
		DEFALUT_PRIORITY: 'DEFAULT_PRIORITY',
		LOW_PRIORITY: 'LOW_PRIORITY',
		MEDIUM_PRIORITY: 'MEDIUM_PRIORITY',
		HIGH_PRIORITY: 'HIGH_PRIORITY'
	};

	function getPriorityPrettyName(priority) {
		if (priority === Priority.DEFALUT_PRIORITY) {
			return 'Default';
		} else if (priority === Priority.LOW_PRIORITY) {
			return 'Low';
		} else if (priority === Priority.MEDIUM_PRIORITY) {
			return 'Medium';
		} else if (priority === Priority.HIGH_PRIORITY) {
			return 'High';
		}
	}

	function getPriorityClassForWrapper(priorityFromDB) {
		if (priorityFromDB === Priority.DEFALUT_PRIORITY) {
			return '';
		} else if (priorityFromDB === Priority.LOW_PRIORITY) {
			return 'priority-low-border';
		} else if (priorityFromDB === Priority.MEDIUM_PRIORITY) {
			return 'priority-medium-border';
		} else if (priorityFromDB === Priority.HIGH_PRIORITY) {
			return 'priority-high-border';
		}
	}

	function getPriorityClassForLabel(priority) {
		if (priority === Priority.DEFALUT_PRIORITY) {
			return 'bg-default';
		} else if (priority === Priority.LOW_PRIORITY) {
			return 'bg-low';
		} else if (priority === Priority.MEDIUM_PRIORITY) {
			return 'bg-medium';
		} else if (priority === Priority.HIGH_PRIORITY) {
			return 'bg-danger';
		}
	}

	function getPrettyDate(timestamp) {
		return new Date(timestamp);
	}

	let escapePressedEventListener;

	let newTaskModal;

	function handleClickNewTaskButton() {
		newTaskModal.showModal();
	}

	// function closeCreateTaskModal() {
	// 	// createTaskModalWrapper.classList.remove('wrapper-fade-in-animation')
	// 	createTaskModal.classList.add('modal-dissmis-animation');
	// 	setTimeout(() => {
	// 		createTaskModal.classList.remove('modal-dissmis-animation');
	// 		createTaskModalWrapper.classList.add('hide');
	// 	}, 500);
	// }

	function handleExpandTaskClick(taskToExpand) {
		let taskListCpy = [...taskList];
		taskListCpy.forEach((task) => {
			if (task === taskToExpand) {
				task.isExpanded = !task.isExpanded;
			}
		});
		taskList = taskListCpy;
	}

	function handleShowTaskMenu(clickedTask) {
		let taskListCopy = [...taskList];
		taskListCopy.forEach((task) => {
			if (task === clickedTask) {
				task.showMenu = !task.showMenu;
			}
		});
		taskList = taskListCopy;
	}

	let expandAllLabels = ['Expand all', 'Collapse all'];
	let expandAllToggleLabel = expandAllLabels[0];

	function handleExpandAll() {
		let taskListCopy = [...taskList];
		if (expandAllToggleLabel === expandAllLabels[0]) {
			// expand all
			taskListCopy.forEach((task) => {
				task.isExpanded = true;
			});
			expandAllToggleLabel = expandAllLabels[1];
		} else {
			// collapse all
			taskListCopy.forEach((task) => {
				task.isExpanded = false;
			});
			expandAllToggleLabel = expandAllLabels[0];
		}
		taskList = taskListCopy;
	}
</script>

<div id="page-content" class="hide" bind:this={pageContent}>
	<div class="flex-1">
		<div class="flex-row">
			<h1 class="list-title">{projectData.name}</h1>
			<div class="push-right align-center">
				<i class="fas fa-ellipsis-v"></i>
			</div>
		</div>
		<p class="list-description">
			{projectData.description}
		</p>

		<div class="tasks-wrapper">
			<div class="flex-row">
				<div class="tasks-title">Todo</div>
				<div class="push-right">
					<span id="expand-all-hide-all-span" class="font-sm" on:click={handleExpandAll}>
						{expandAllToggleLabel}
					</span>
				</div>
			</div>

			<form class="task-list">
				{#if taskList.length > 0}
					{#each taskList as task, index}
						<div class="task {getPriorityClassForWrapper(task.priority)}" data-index={index}>
							<div class="task-content">
								<input type="checkbox" id="task-{index}" checked={task.completed} />
								<div class="checkbox-wrapper">
									<label for="task-{index}">
										<span class="checkbox">
											<span class="check"></span>
										</span>
									</label>
								</div>
								<div class="task-text">
									<div class="title">{task.title}</div>
									<div class="task-details {task.isExpanded ? '' : 'hide'}" bind:this={taskDetails}>
										<div class="description font-sm">
											{task.description}
										</div>
										<div class="flex-row">
											<div class="priority {getPriorityClassForLabel(task.priority)} font-sm">
												{getPriorityPrettyName(task.priority)}
											</div>
											<div class="due-date font-sm">
												Due date
												<span class="date"> {getPrettyDate(task.dueDate)} </span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="task-menu">
								<i
									class="fas {task.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} icon chevron"
									on:click={handleExpandTaskClick(task)}
								></i>
								<i class="fas fa-ellipsis-v icon more" on:click={handleShowTaskMenu(task)}></i>
								<div class="more-menu {task.showMenu ? '' : 'hide'}">
									<ul>
										<li class="more-menu-option edit">
											<i class="far fa-edit icon"></i>Edit
										</li>
										<li class="more-menu-option delete">
											<i class="far fa-trash-alt icon"></i> Delete
										</li>
									</ul>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<h1>Nothing to do, enjoy your free time</h1>
				{/if}
				{#if completedTasks.length > 0}
					<div class="tasks-title">Done</div>
					<div>
						<button class="btn btn-outline-primary"
							><i class="fa fa-trash-can"></i> Clear completed tasks</button
						>
					</div>
				{/if}
			</form>
		</div>
	</div>

	<NewTaskModal bind:this={newTaskModal} />

	<div
		class="modal-wrapper wrapper-fade-in-animation hide"
		id="confirm-task-delete-modal"
		bind:this={deleteTaskModal}
	>
		<div class="new-task-modal modal-show-animation">
			<h1 class="title">Delete task?</h1>
			<p>
				Delete task <span class="task-title"></span>?
			</p>
			<div class="form-row form-controls">
				<button class="btn btn-danger" id="delete-confirm"> Delete </button>
				<button class="btn btn-primary" id="delete-cancel"> Cancel </button>
			</div>
			<div class="close-btn">
				<i class="fas fa-times"></i>
			</div>
		</div>
	</div>

	<div class="new-task-btn" bind:this={newTaskButton} on:click={handleClickNewTaskButton}>
		<i class="fas fa-plus"></i>
	</div>
</div>

<div class="hide" bind:this={errorPage}>
	<h1>Something went wrong</h1>
	<p>Uh oh, uwu, sometwing went wong, please twy agwain lawter :(</p>
</div>

<Spinner hidden={isSpinnerHidden} />

<style>
	.tasks-wrapper {
		max-width: 950px;
	}

	.overflow-scroll {
		overflow-y: scroll;
	}

	.page-content {
		flex: 1 0 80vh;
		overflow: auto;
		padding: 2rem;
	}
</style>

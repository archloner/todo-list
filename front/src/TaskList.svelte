<script>
	import { onMount } from 'svelte';
	import AppConfig from './AppConfig';
	import Spinner from './Spinner.svelte';
	import NewTaskModal from './NewTaskModal.svelte';
	import { createEventDispatcher } from 'svelte';
	import NotificationType from './NotificationType';
	import { postRequest, deleteRequest } from './HttpUtils';
	import Task from './Task.svelte';
	import EditTaskModal from './EditTaskModal.svelte';
	import ProgressBar from './ProgressBar.svelte';

	let dispatch = createEventDispatcher();

	function notify(title, text, type) {
		dispatch('notify', { title, text, type });
	}

	function reload() {
		dispatch('reload', {});
	}

	let pageContent;

	export function toggleHide() {
		pageContent.classList.toggle('hide');
	}

	let projectData = {};
	let taskList = {};

	let createTaskModalWrapper;
	let createTaskModal;
	let editTaskModal;

	let deleteTaskModalWrapper;
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

	export function hideLoadingPage() {
		// Show content and hide spinner
		pageContent.classList.remove('hide');
		isSpinnerHidden = true;
	}

	let completedTasks;
	let allTasks;

	function updateCompleteTasks() {
		completedTasks = taskList.filter((tsk) => tsk.completed).length;
		allTasks = taskList.length;
		progressBar.setCompleteCounter(completedTasks, allTasks)
	}

	export function updateTaskList(newTaskData) {
		console.log('In TaskListView, project changed, new tasks: ' + newTaskData.projectId);
		console.log(newTaskData)
		console.log(`completed tasks (computed) : ${completedTasks}`);
		projectData = newTaskData;
		taskList = projectData.taskList;
		updateCompleteTasks();
		pageContent.classList.remove('hide');
		isSpinnerHidden = true;
	}

	let isSpinnerHidden;
	let deleteMode;

	onMount(() => {
		console.log('Component mounted...');
		isSpinnerHidden = false;
		deleteMode = DeleteMode.SINGLE_TASK;
		updateCompleteTasks();
	});

	let errorPage;

	function showError() {
		isSpinnerHidden = true;
		errorPage.classList.toggle('hide');
	}

	let escapePressedEventListener;

	let newTaskModal;

	function handleClickNewTaskButton() {
		newTaskModal.showModal();
	}

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

	function handleCheckTask(taskId) {
		let taskListCpy = [...taskList];

		taskListCpy.forEach((task) => {
			if (task.taskId === taskId) {
				task.completed = !task.completed;
			}
		});

		taskList = taskListCpy;
	}

	function handleTaskUpdate(event) {
		console.log('update task list... ' + event.detail.id);
		handleCheckTask(event.detail.id);
		updateCompleteTasks();
	}

	let taskTitleToDelete = '';
	let taskIdToDelete = null;

	function handleDeleteTask(event) {
		let taskId = event.detail.id;
		taskIdToDelete = taskId;
		let taskTitle = taskList.filter((task) => task.taskId === taskId)[0].title;
		taskTitleToDelete = taskTitle;
		deleteTaskModalWrapper.classList.remove('hide');
	}

	function showDeleteModal() {
		deleteTaskModalWrapper.classList.remove('hide');
	}

	let deleteTaskModal;

	async function confirmTaskDelete() {
		console.log(`Delete task ${taskIdToDelete}`);
		let url = `${AppConfig.API_URL}/project/${projectData.projectId}/task/${taskIdToDelete}`;
		let resp = await deleteRequest(url);

		notify(
			'Task deleted',
			`Task ${taskTitleToDelete} was successfully deleted`,
			NotificationType.ERROR
		);
		taskIdToDelete = null;
		taskTitleToDelete = '';

		// await loadData();
		dispatch('reload', {});
		hideDeleteModal();
	}

	function hideDeleteModal() {
		taskIdToDelete = null;
		deleteTaskModal.classList.toggle('modal-dissmis-animation');
		setTimeout(() => {
			deleteTaskModalWrapper.classList.toggle('hide');
			deleteTaskModal.classList.toggle('modal-dissmis-animation');
		}, 550);
	}

	function handleReload() {
		console.log('reload event received in taskList');
		dispatch('reload', {});
	}

	function handleClearCompleted() {
		deleteMode = DeleteMode.COMPLETED_TASKS;
		showDeleteModal();
	}

	let DeleteMode = {
		SINGLE_TASK: 1,
		COMPLETED_TASKS: 2
	};

	async function confirmCompletedTasksDelete() {
		console.log('confirm delete all completed');
		let url = `${AppConfig.API_URL}/project/${projectData.projectId}/task/clearcomplete`;
		let res = await deleteRequest(url);
		console.log(res);

		dispatch('reload', {});
		dispatch('notify', {
			title: 'Removed',
			text: 'All completed tasks removed successfully',
			type: NotificationType.SUCCESS
		});
		hideDeleteModal();
	}

	let taskToEdit;

	function handleEditTask(e) {
		console.log('Received edit event...')
		taskToEdit = e.detail.task;
		console.log(taskToEdit)
		editTaskModal.setTask(taskToEdit)
		editTaskModal.showModal();
	}

	function handleEditProject(project) {
		dispatch('editproject', { name: project.name, description: project.description, id: project.projectId })
	}

	function handleDeleteProject(project) {
		dispatch('deleteproj', { name: project.name, description: project.description, id: project.projectId })
	}

	export function show() {
		pageContent.classList.remove('hide')
	}

	export function hide() {
		pageContent.classList.add('hide')
	}

	let progressBar;

	onMount(() => {
		// progressBar.setCompleteCounter(1, 3)
	})
</script>

<div>
	<div id="page-content" bind:this={pageContent}>
		<div class="flex-1">
			<div class="flex-row">
				<h1 class="list-title">{projectData.name}</h1>
				<div class="push-right align-center task-menu">
					<i class="fa-solid fa-pen-to-square" on:click={handleEditProject(projectData)}></i>
					<i class="fa-solid fa-trash-can" on:click={handleDeleteProject(projectData)}></i>
					<i class="fas fa-ellipsis-v"></i>
				</div>
			</div>
			<p class="list-description">
				{projectData.description}
			</p>

			<ProgressBar bind:this={progressBar}/>
			
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
					{#if taskList.length != completedTasks}
						{#each taskList as task, index}
							{#if !task.completed}
								<Task
									{task}
									{index}
									projectId={projectData.projectId}
									on:update={handleTaskUpdate}
									on:delete={handleDeleteTask}
									on:edit={handleEditTask}
								/>
							{/if}
						{/each}
					{:else}
						<h1>Nothing to do, enjoy your free time 😌</h1>
					{/if}
					{#if completedTasks > 0}
						<div class="tasks-title">Done</div>
						<div>
							{#each taskList as task, index}
								{#if task.completed}
									<Task
										{task}
										{index}
										projectId={projectData.projectId}
										on:update={handleTaskUpdate}
										on:delete={handleDeleteTask}
										on:edit={handleEditTask}
									/>
								{/if}
							{/each}
						</div>
						<div class="bottom-buttons">
							<button class="btn btn-outline-primary" on:click={handleClearCompleted}
								><i class="fa fa-trash-can"></i> Clear completed tasks</button
							>
						</div>
					{/if}
				</form>
			</div>
		</div>

		<NewTaskModal
			bind:this={newTaskModal}
			projectId={projectData.projectId}
			on:notify
			on:reload={handleReload}
		/>

		<EditTaskModal bind:this={editTaskModal} projectId={projectData.projectId} on:notify on:reload={handleReload}/>

		<div
			class="modal-wrapper wrapper-fade-in-animation hide"
			id="confirm-task-delete-modal"
			bind:this={deleteTaskModalWrapper}
		>
			<div class="new-task-modal modal-show-animation" bind:this={deleteTaskModal}>
				{#if deleteMode === DeleteMode.SINGLE_TASK}
					<h1 class="title">Delete task?</h1>
					<p>
						Delete task <span class="task-title">{taskTitleToDelete}</span>?
					</p>
					<div class="form-row form-controls">
						<button class="btn btn-danger" id="delete-confirm" on:click={confirmTaskDelete}>
							Delete
						</button>
						<button class="btn btn-primary" id="delete-cancel" on:click={hideDeleteModal}>
							Cancel
						</button>
					</div>
					<div class="close-btn">
						<i class="fas fa-times" on:click={hideDeleteModal}></i>
					</div>
				{:else if deleteMode === DeleteMode.COMPLETED_TASKS}
					<h1 class="title">Delete completed task?</h1>
					<p>Delete all completed tasks?</p>
					<div class="form-row form-controls">
						<button
							class="btn btn-danger"
							id="delete-confirm"
							on:click={confirmCompletedTasksDelete}
						>
							Delete
						</button>
						<button class="btn btn-primary" id="delete-cancel" on:click={hideDeleteModal}>
							Cancel
						</button>
					</div>
					<div class="close-btn">
						<i class="fas fa-times" on:click={hideDeleteModal}></i>
					</div>
				{/if}
			</div>
		</div>

		<div class="new-task-btn" bind:this={newTaskButton} on:click={handleClickNewTaskButton}>
			<i class="fas fa-plus"></i>
		</div>
	</div>
</div>

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

	.more-menu-option:hover {
		cursor: pointer;
	}

	.bottom-buttons {
		margin-top: 2em;
	}

	.task-menu i {
		margin: 0 0.4em;
		cursor: pointer;
		transition: all 0.3s;
	}

	.task-menu i:hover {
		opacity: 0.8;
	}
</style>

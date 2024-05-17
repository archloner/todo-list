<script>
	import Header from '../Header.svelte';
	import NavLeft from '../NavLeft.svelte';
	import Notification from '../Notification.svelte';
	import NotificationType from '../NotificationType';
	import TaskList from '../TaskList.svelte';
	import Spinner from '../Spinner.svelte';
	import AppConfig from '../AppConfig';
	import ProjectList from '../ProjectList.svelte';
	import NewProjectModal from '../NewProjectModal.svelte';

	import { onMount } from 'svelte';

	import './styles.css';

	let appContainer;

	function toggleDarkMode() {
		appContainer.classList.toggle('dark-mode');
		let isDarkMode = appContainer.classList.contains('dark-mode');
		NotificationComponent.notify(
			'Dark mode',
			`Dark mode has been ${isDarkMode ? 'enabled' : 'disabled'}`,
			NotificationType.INFO
		);
	}

	let NotificationComponent;
	let taskListComponent;
	let projectListComponent;

	function handleNotify(event) {
		console.log(event.detail);
		NotificationComponent.notify(event.detail.title, event.detail.text, event.detail.type);
	}

	function handleProjectViewChange(event) {
		console.log(event);
		console.log(
			'At root level, received project change event, projectId: ' + event.detail.projectId
		);
		if (event.detail.projectId == 0 && page == Page.TASK_LIST || event.detail.projectId != 0 && page == Page.PROJECT_OVERVIEW) {
			taskListComponent.toggleHide();
			projectListComponent.toggleHide();
			if (page == Page.TASK_LIST) {
				page = Page.PROJECT_OVERVIEW
			} else if (page == Page.PROJECT_OVERVIEW) {
				page = Page.TASK_LIST
			}
		}
		let projectDataToRender = projectData.filter(
			(proj) => proj.projectId === event.detail.projectId
		)[0];
		taskListComponent.updateTaskList(projectDataToRender);
	}

	const Page = {
		TASK_LIST: {
			type: 'TASK_LIST',
			param: 1
		},
		PROJECT_OVERVIEW: {
			type: 'PROJECT_OVERVIEW',
			param: 1
		}
	};

	// Initial page to load
	let page = Page.PROJECT_OVERVIEW;

	let loadingPageErrorMsg = '';
	let loadingSpinner;
	let loadingPageShow = true;

	let projectData;

	async function fetchData(url) {
		try {
			let res = await fetch(url);
			if (!res.ok) {
				throw new Error(`API request failed with status ${res.status}`);
			}
			let data = await res.json();
			// NotificationComponent.notify(
			// 	'Data loaded',
			// 	'Data successfully fetched from the API',
			// 	NotificationType.SUCCESS
			// );
			return data;
		} catch (error) {
			console.log('Error fetching data: ', error);
			NotificationComponent.notify(
				'Error',
				'Error while loading data from the service',
				NotificationType.ERROR
			);

			loadingPageErrorMsg =
				'Error while loading data from the service, please try again later of contact support';
			loadingSpinner.hideSpinner();
			taskListComponent.hideLoadingPage();

			setTimeout(() => {
				loadData();
			}, 3000);

			return null;
		}
	}

	let activeProject;

	let projectListViewData = [];
	let projectOverview = [];

	async function loadData() {
		console.log('Getting data...');
		let data = await fetchData(AppConfig.API_URL + '/project');
		console.log('Received data OK!');

		projectData = data;
		projectListViewData = [];
		projectOverview = [];

		projectData.forEach((project) => {
			console.log(project);
			let taskList = project.taskList;

			taskList.forEach((task) => {
				task.isExpanded = false;
				task.showMenu = false;
			});

			projectListViewData.push({
				projectId: project.projectId,
				name: project.name,
				numberOfTasks: project.numberOfTasks
			});

			projectOverview.push({
				title: project.name,
				taskCount: project.numberOfTasks,
				id: project.projectId
			});
		});

		// render project list view
		projectListView.renderListViewData(projectListViewData);

		if (page == Page.PROJECT_OVERVIEW) {
			projectListView.setActiveItem(0);
		} else {
			// update TaskList component to render first project on the list TODO: init projects overview view
			console.log(projectData)
			let projectDataToRender = projectData.filter((item) => item.projectId == activeProject.projectId)[0];
			console.log(projectDataToRender)
			projectListView.setActiveItem(projectDataToRender.projectId);
			taskListComponent.updateTaskList(projectDataToRender);
		}

		// Show content and hide spinner
		loadingPageShow = false;
	}

	onMount(() => {
		loadData();
		taskListComponent.toggleHide();
	});

	function handleReload(e) {
		loadData();
	}

	let projectListView;

	function changeProj(e) {
		console.log('change proj at root level');
		let newProjId = e.detail;
		activeProject = newProjId;
		handleProjectViewChange(e);
		
		let projectDataToRender = projectData.filter((item) => item.projectId == activeProject.projectId)[0];
		
		projectListView.setActiveItem(projectDataToRender.projectId);
		taskListComponent.updateTaskList(projectDataToRender);
	}

	let newProjectModalComponent;

	function handleNewProject() {
		console.log('new project event received')
		newProjectModalComponent.show();
	}

</script>

<div class="app" bind:this={appContainer}>
	<div class="page-wrapper">
		<Header {toggleDarkMode} />
		<div class="wrapper">
			<NavLeft bind:this={projectListView} on:project-click={handleProjectViewChange} on:newproject={handleNewProject}/>
			<main class="content-right">
				<TaskList bind:this={taskListComponent} on:notify={handleNotify} on:reload={handleReload} />
				<ProjectList bind:this={projectListComponent} projectList={projectOverview} on:change-proj={changeProj} />
			</main>
		</div>
		<Notification bind:this={NotificationComponent} />
		<div class="loading-page {loadingPageShow ? '' : 'hide'}">
			<div class="loading-page-content">
				<h1>Loading</h1>
				<Spinner hidden={false} bind:this={loadingSpinner} />
				<p>{loadingPageErrorMsg}</p>
			</div>
		</div>
		<NewProjectModal bind:this={newProjectModalComponent} on:reload={handleReload}/>
	</div>


</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-height: calc(100vh - 20px);
	}

	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 95vh;
		max-width: 1350px;
		width: 100%;
		margin: auto;
		margin-bottom: 3rem;
	}

	.wrapper {
		display: flex;
		flex: 1 0 auto;
		margin-bottom: 0.5rem;
		align-items: start;
	}

	.content-right {
		overflow: auto;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		margin-left: 0.5em;
		margin-right: 0.5rem;
		border-radius: 15px;
	}

	.loading-page {
		position: absolute;
		z-index: 10;
		width: 100vw;
		height: 100vh;
		background: white;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

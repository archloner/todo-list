<script>
	import Header from '../Header.svelte';
	import NavLeft from '../NavLeft.svelte';
	import Notification from '../Notification.svelte';
	import NotificationType from '../NotificationType';
	import TaskList from '../TaskList.svelte';
	import Spinner from '../Spinner.svelte';
	import AppConfig from '../AppConfig';
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

	function handleNotify(event) {
		console.log(event.detail);
		NotificationComponent.notify(event.detail.title, event.detail.text, event.detail.type);
	}

	function handleProjectViewChange(event) {
		console.log(event);
		console.log(
			'At root level, received project change event, projectId: ' + event.detail.projectId
		);
		let projectDataToRender = projectData.filter(
			(proj) => proj.projectId === event.detail.projectId
		)[0];
		taskListComponent.updateTaskList(projectDataToRender);
	}

	let taskListComponent;

	const Page = {
		TASK_LIST: {
			type: 'TASK_LIST',
			param: 1
		}
	};

	let page = Page.TASK_LIST;

	let loadingPageErrorMsg = '';
	let loadingSpinner;
	let loadingPageShow = true;

	let projectData;

	let projectListViewData = [];

	async function fetchData(url) {
		try {
			let res = await fetch(url);
			if (!res.ok) {
				throw new Error(`API request failed with status ${res.status}`);
			}
			let data = await res.json();
			NotificationComponent.notify(
				'Data loaded',
				'Data successfully fetched from the API',
				NotificationType.SUCCESS
			);
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

	async function loadData() {
		console.log('Getting data...');
		let data = await fetchData(AppConfig.API_URL + '/project');
		console.log('Received data OK!');

		projectData = data;
		projectListViewData = []
		
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
		});

		// render project list view
		projectListView.renderListViewData(projectListViewData);

		// update TaskList component to render first project on the list TODO: init projects overview view
		let projectDataToRender = projectData[0];
		console.log(projectDataToRender.projectId);
		projectListView.setActiveItem(projectDataToRender.projectId);
		taskListComponent.updateTaskList(projectDataToRender);

		// Show content and hide spinner
		loadingPageShow = false;
	}

	onMount(() => {
		loadData();
	});

	function handleReload() {
		console.log('reloading');
		loadData();
	}

	let projectListView;
</script>

<div class="app" bind:this={appContainer}>
	<div class="page-wrapper">
		<Header {toggleDarkMode} />
		<div class="wrapper">
			<NavLeft bind:this={projectListView} on:project-click={handleProjectViewChange} />
			<main class="content-right">
				{#if page == Page.TASK_LIST}
					<TaskList bind:this={taskListComponent} on:notify={handleNotify} on:reload={handleReload} />
				{/if}
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

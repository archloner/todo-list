<script>
	import Header from '../Header.svelte';
	import NavLeft from '../NavLeft.svelte';
	import Notification from '../Notification.svelte';
	import NotificationType from '../NotificationType';
	import TaskList from '../TaskList.svelte';
	import './styles.css';

	let appContainer;

	function toggleDarkMode() {
		appContainer.classList.toggle('dark-mode')
		let isDarkMode = appContainer.classList.contains('dark-mode')
		NotificationComponent.notify('Dark mode', `Dark mode has been ${isDarkMode ? 'enabled' : 'disabled'}`, NotificationType.INFO)
	}

	let NotificationComponent;
	
	function handleNotify(event) {
		console.log(event.detail)
		NotificationComponent.notify(event.detail.title, event.detail.text, event.detail.type)
	}

	const Page = {
		TASK_LIST: {
			type: 'TASK_LIST',
			param: 1
		}
	}

	let page = Page.TASK_LIST
</script>

<div class="app" bind:this={appContainer}>
	<div class="page-wrapper">
		<Header {toggleDarkMode}/>
		<div class="wrapper">
			<NavLeft />
			<main class="content-right">
				{#if page == Page.TASK_LIST}
					<TaskList on:notify={handleNotify}/>
				{/if}
			</main>
		</div>
		<Notification bind:this={NotificationComponent}/>
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
</style>

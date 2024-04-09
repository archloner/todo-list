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
		NotificationComponent.notify('Dark mode', 'Dark mode has been enabled', NotificationType.INFO)
	}

	let NotificationComponent;
	
	function handleNotify(event) {
		console.log(event.detail)
		NotificationComponent.notify(event.detail.title, event.detail.text, event.detail.type)
	}
</script>

<div class="app" bind:this={appContainer}>
	<Header {toggleDarkMode}/>
	<div class="wrapper">
		<NavLeft />
		<main class="content-right">
			<TaskList on:notify={handleNotify}/>
		</main>
	</div>
	<Notification bind:this={NotificationComponent}/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.wrapper {
		display: flex;
		flex: 1 0 auto;
		margin-bottom: 0.5rem;
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

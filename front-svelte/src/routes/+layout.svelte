<script>
	import Header from './Header.svelte';
	import NavLeft from './NavLeft.svelte';
	import './styles.css';

	let appContainer;

	function toggleDarkMode() {
		appContainer.classList.toggle('dark-mode')
	}
</script>

<div class="app" bind:this={appContainer}>
	<Header {toggleDarkMode}/>
	<div class="wrapper">
		<NavLeft Notifications/>
		<main class="content-right">
			<slot />
		</main>
	</div>
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

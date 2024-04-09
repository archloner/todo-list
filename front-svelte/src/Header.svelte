<script>
	import userProfilePicture from '$lib/images/user-profile-picture.jpg';
	import AppConfig from './AppConfig';

	let darkMode = false;
	export let toggleDarkMode;

	function handleDarkModeToggle() {
		toggleDarkMode();
	}
</script>

<header>
	<div class="top-bar">
		<div class="brand menu-padding">.todoism</div>
		<nav class="top-bar-nav-wrapper">
			<a href="/task">
				<div class="nav-item active">
					Home
				</div>
			</a>
			<a href="/about">
				<div class="nav-item">
					About
				</div>
			</a>
			<a href="/contact">
				<div class="nav-item">
					Contact
				</div>
			</a>
		</nav>
		<div class="search-bar-wrapper">
			<i class="fas fa-search search-icon"></i>
			<input type="text" id="search-input" placeholder="Search" />
		</div>
		<div class="push-right account-controls flex-row">
			<div class="notifications-icon">
				<i class="far fa-bell"></i>
			</div>
			<div class="username-container">
				<span id="user-name">{AppConfig.DUMMY_USER_NAME}</span>
				<i class="fas fa-chevron-down chevron"></i>
			</div>
			<div>
				<img
					src={userProfilePicture}
					class="user-profile-picture"
					alt="User profile"
				/>
			</div>
			<div class="icon dark-mode-icon" on:click={handleDarkModeToggle}>
				<i class="fas fa-adjust"></i>
			</div>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.top-bar-nav-wrapper {
		display: flex;
		margin-right: 3rem;
	}

	.nav-item {
		padding: 0.5rem;
		margin: 0.5rem;
		cursor: pointer;
	}

	a:hover {
		text-decoration: none;
	}

	.nav-item.active {
		color: black;
		border-bottom: 2px solid black;
	}

</style>

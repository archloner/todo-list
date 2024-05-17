<script>
	import { onMount } from 'svelte';
	import AppConfig from './AppConfig.js';
	import NotificationType from './NotificationType.js';
	import { createEventDispatcher } from 'svelte';

	let projectListViewData;

	let menuItems = [
		{
			name: 'Overview',
			tasksAmount: 6,
			isHome: true,
			isActive: true
		}
		// {
		//   name: 'Groceries',
		//   tasksAmount: 10,
		//   isHome: false,
		//   isActive: false
		// },
		// {
		//   name: 'Workout',
		//   tasksAmount: 4,
		//   isHome: false,
		//   isActive: false
		// },
		// {
		//   name: 'Reading',
		//   tasksAmount: 5,
		//   isHome: false,
		//   isActive: false
		// }
	];

	export function renderListViewData(data) {
		console.log(data);
		projectListViewData = data;
		initProjectListView();
	}

	function initProjectListView() {
		menuItems = []
		menuItems.push({
			projectId: 0,
			name: 'Overview',
			tasksAmount: 0,
			isHome: true,
			isActive: false
		})
		projectListViewData.forEach((data) => {
			console.log(data.name);
			menuItems.push({
				projectId: data.projectId,
				name: data.name,
				tasksAmount: data.numberOfTasks,
				isHome: false,
				isActive: false
			});
		});
		menuItems = [...menuItems];
		console.log('update menu items');
	}

	function handleMenuItemClick(newActiveItem) {
		makeItemActive(newActiveItem.projectId);
		notifyProjectClick(newActiveItem.projectId);
	}

	function makeItemActive(projectId) {
		menuItems.forEach((item) => {
			item.isActive = item.projectId === projectId;
		});
		menuItems = [...menuItems];
	}

	let dispatch = createEventDispatcher();

	function notifyProjectClick(projectId) {
		dispatch('project-click', { projectId });
	}

	export function setActiveItem(projectId) {
		console.log('seting nav active item: ' + projectId);
		makeItemActive(projectId);
	}

	function showNewProjectModal() {
		dispatch('newproject', {})
	}

	onMount(() => {});
</script>

<div class="menu-left padding-top">
	<div class="menu-controls menu-padding">
		<button class="btn btn-outline-primary new-project-btn" on:click={showNewProjectModal}>
			<i class="fas fa-plus"></i> New list
		</button>
	</div>

	<div class="menu flex-1">
		<ul class="menu-items">
			{#each menuItems as menuItem, index (menuItem)}
				<a
					href="#"
					class="menu-item"
					class:active={menuItem.isActive}
					on:click={() => handleMenuItemClick(menuItem)}
				>
					<li class="menu-padding">
						<div class="flex-row">
							<i class="fa {menuItem.isHome ? 'fa-home' : 'fa-tasks'}"></i>
							<div class="menu-item-text">
								{menuItem.name}
								{#if !menuItem.isHome}
								<p class="tasks-amount">
									{menuItem.tasksAmount}
									{menuItem.tasksAmount !== 1 ? 'Tasks' : 'Task'}
								</p>
								{/if}
							</div>
						</div>
					</li>
				</a>
			{/each}

			<div class="line"></div>

			<a href="#" class="menu-item">
				<li class="menu-padding">
					<div class="flex-row">
						<i class="far fa-calendar-check"></i>
						<div class="menu-item-text">
							Done
							<p class="tasks-amount">15 Tasks</p>
						</div>
					</div>
				</li>
			</a>
		</ul>
		<ul class="push-bottom">
			<a href="#" class="menu-item">
				<li class="menu-padding">
					<i class="fa fa-cog"></i> Settings
				</li>
			</a>

			<a href="#" class="menu-item">
				<li class="menu-padding">
					<i class="fa fa-sign-out-alt"></i> Log out
				</li>
			</a>
		</ul>
	</div>

	<footer class="menu-padding menu-footer">
		&copy; Created by
		<a href={AppConfig.SITE_FOOTER_AUTHOR_URL} class="author-link">
			{AppConfig.SITE_FOOTER_AUTHOR}
		</a>
		{new Date().getFullYear()}
	</footer>
</div>

<style>
	.menu-left {
		border-radius: 15px;
		margin-left: 0.5em;
	}

	.menu-item:hover {
		text-decoration: none;
	}

	.new-project-btn {
		width: 100%;
		margin: auto;
	}

	.menu-controls {
		text-align: center;
	}
</style>

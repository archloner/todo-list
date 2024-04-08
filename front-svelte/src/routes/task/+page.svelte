<script>
	import { onMount } from 'svelte';
	import AppConfig from '../../AppConfig';

  let pageContent;
  let projectData = {};
  let taskList = {};

  async function fetchData() {
		try {
			console.log(`API URL = ${AppConfig.API_URL}`);
			let res = await fetch(AppConfig.API_URL + '/project');
			if (!res.ok) {
				throw new Error(`API request failed with status ${res.status}`);
			}

			let data = await res.json();
      return data;
		} catch (error) {
			console.log('Error fetching data: ', error);
			return null;
		}
	}

  async function loadData() {
    let data = await fetchData();
    console.log(data[0].taskList)
    projectData = data[0]
    taskList = data[0].taskList
  }

  onMount(() => {
    loadData();
    console.log(pageContent.classList)
    pageContent.classList.remove('hide')
  })

	let dummyProjectData = {
		projectTitle: 'Overview',
		projectDescription:
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
  
  projectData = dummyProjectData
  taskList = dummyProjectData.taskList

  let Priority = {
    DEFALUT_PRIORITY: 'DEFAULT_PRIORITY',
    LOW_PRIORITY: 'LOW_PRIORITY',
    MEDIUM_PRIORITY: 'MEDIUM_PRIORITY',
    HIGH_PRIORITY: 'HIGH_PRIORITY',
  }

  function getPriorityClassForWrapper(priorityFromDB) {
    if (priorityFromDB === Priority.DEFALUT_PRIORITY) {
      return ''
    } else if (priorityFromDB === Priority.LOW_PRIORITY) {

    }
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
					<span id="expand-all-hide-all-span" class="font-sm"> Expand all </span>
				</div>
			</div>

			<form>
				{#each taskList as task, index}
					<div class="task {getPriorityClassForWrapper(task.priority)}" data-index={index}>
						<div class="task-content">
							<input type="checkbox" id="task-{index}" checked={task.completed}/>
							<div class="checkbox-wrapper">
								<label for="task-{index}">
									<span class="checkbox">
										<span class="check"></span>
									</span>
								</label>
							</div>
							<div class="task-text">
								<div class="title">{task.title}</div>
								<div class="task-details hide">
									<div class="description font-sm">
										{task.description}
									</div>
									<div class="flex-row">
										<div class="priority bg-light font-sm">{task.priority}</div>
										<div class="due-date font-sm">
											Due date
											<span class="date"> {task.dueDate} </span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="task-menu">
							<i class="fas fa-chevron-down icon chevron"></i>
							<i class="fas fa-ellipsis-v icon more"></i>
							<div class="more-menu hide">
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
				<div class="tasks-title">Done</div>
			</form>
		</div>
	</div>
</div>

<style>
</style>

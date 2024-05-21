<script>
	import { TaskPriority } from './TaskPriority';
	import { createEventDispatcher } from 'svelte';
	import AppConfig from './AppConfig';
	import { postRequest } from './HttpUtils';

	let dispatch = createEventDispatcher();

	export let index;
	export let task;
	export let projectId;
	let taskDetails;

	function handleCheckTask(taskId) {
		let url = `${AppConfig.API_URL}/project/${projectId}/task/${taskId}/togglecomplete`;
		console.log(url);
		postRequest(url, taskId);
		dispatch('update', { id: taskId });
	}

	function getPriorityPrettyName(priority) {
		if (priority === TaskPriority.DEFALUT_PRIORITY) {
			return 'Default';
		} else if (priority === TaskPriority.LOW_PRIORITY) {
			return 'Low';
		} else if (priority === TaskPriority.MEDIUM_PRIORITY) {
			return 'Medium';
		} else if (priority === TaskPriority.HIGH_PRIORITY) {
			return 'High';
		}
	}

	function getPriorityClassForWrapper(priorityFromDB) {
		if (priorityFromDB === TaskPriority.DEFALUT_PRIORITY) {
			return '';
		} else if (priorityFromDB === TaskPriority.LOW_PRIORITY) {
			return 'priority-low-border';
		} else if (priorityFromDB === TaskPriority.MEDIUM_PRIORITY) {
			return 'priority-medium-border';
		} else if (priorityFromDB === TaskPriority.HIGH_PRIORITY) {
			return 'priority-high-border';
		}
	}

	function getPriorityClassForLabel(priority) {
		if (priority === TaskPriority.DEFALUT_PRIORITY) {
			return 'bg-default';
		} else if (priority === TaskPriority.LOW_PRIORITY) {
			return 'bg-low';
		} else if (priority === TaskPriority.MEDIUM_PRIORITY) {
			return 'bg-medium';
		} else if (priority === TaskPriority.HIGH_PRIORITY) {
			return 'bg-danger';
		}
	}

	function getPrettyDate(timestamp) {
		return new Date(timestamp);
	}

	function handleExpandTaskClick(taskToExpand) {
		task.isExpanded = !task.isExpanded;
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

  function handleDeleteTask(taskId) {
    dispatch('delete', {id: taskId});
  }

  function isOverdue(dueDate) {
    return new Date(dueDate) <= new Date();
  }

	function handleEditTask(task) {
		console.log(task);
		dispatch('edit', { task });
	}
</script>

<div class="task {getPriorityClassForWrapper(task.priority)}" data-index={index}>
	<div class="task-content">
		<input
			type="checkbox"
			id="task-{index}"
			checked={task.completed}
			on:click={handleCheckTask(task.taskId)}
		/>
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

    {#if isOverdue(task.dueDate)}
    <div class="overdue-label bg-danger">
      Overdue
    </div>
    {/if}
	</div>

	<div class="task-menu">
		<li class="more-menu-option edit" on:click={handleEditTask(task)}>
			<i class="far fa-edit icon"></i>
		</li>
		<li class="more-menu-option delete" on:click={handleDeleteTask(task.taskId)}>
			<i class="far fa-trash-alt icon"></i>
		</li>
		<i
			class="fas {task.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} icon chevron"
			on:click={handleExpandTaskClick(task)}
		></i>
		<i class="fas fa-ellipsis-v icon more hide" on:click={handleShowTaskMenu(task)}></i>
		<div class="more-menu {task.showMenu ? '' : 'hide'}">
			<ul></ul>
		</div>
	</div>
</div>

<style>
  .overdue-label {
    padding: 0.3em 0.4em;
    margin-right: 1.3rem;
    border-radius: 8px;
  }

  .task-content {
    align-items: start;
  }
</style>

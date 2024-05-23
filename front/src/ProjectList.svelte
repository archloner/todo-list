<script>
	import ProjectListItem from "./ProjectListItem.svelte";
  import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";

  let dispatch = createEventDispatcher();

	let pageText = {
		title: 'Projects Overview',
		description: 'List of all available projects'
	};

  let pageContent;
  export let projectList;

	onMount(() => {
		// console.log(projectList)
	})

	export function toggleHide() {
    pageContent.classList.toggle('hide')
  }
</script>

<div>
	<div id="page-content" bind:this={pageContent}>
		<div class="flex-1">
			<div class="flex-row">
				<h1 class="list-title">{pageText.title}</h1>
				<div class="push-right align-center project-menu">
					<i class="fas fa-ellipsis-v"></i>
				</div>
			</div>
			<p class="list-description">
				{pageText.description}
			</p>

          <div class="project-grid-wrapper">
            <div class="project-grid">
                <!-- project item -->
                {#each projectList as project}
                  <ProjectListItem projId={project.id} projectTitle={project.title} taskCount={project.taskCount} on:change-proj/>
                {/each}
            </div>
          </div>

				</div>
			
	</div>

  <!-- new project button -->
</div>

<style>
	.project-menu i {
		margin: 0 0.4em;
		cursor: pointer;
		transition: all 0.3s;
	}

	.project-menu i:hover {
		opacity: 0.8;
	}

</style>

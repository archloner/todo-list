<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let projectTitle;
  export let taskCount;
  export let projId;

  function handleChangeProj(id) {
    console.log('Change project, id=' + id)
    dispatch('change-proj', {projectId: id})
  }

  let projectComponent;
</script>

<div class="project-grid-item" on:click={handleChangeProj(projId)} bind:this={projectComponent}>
  <div class="bg">
    <div class="controls project-delete-btn">
      <i class="far fa-trash-alt icon"></i>
    </div>
    <div class="text">
      <h2 class="project-title">{projectTitle}</h2>
      <span class="task-count">{taskCount} {taskCount == 1 ? 'task' : 'tasks'}</span>
    </div>
  </div>

</div>

<style>

</style>
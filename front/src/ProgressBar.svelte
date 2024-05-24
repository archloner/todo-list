<script>
  let progressBar;
  let complete;
  let taskcount;


  export function setCompleteCounter(completed, alltasks) {
    complete = completed
    taskcount = alltasks

    let percent = completed / alltasks;
    setWidthPercent(percent * 100);
  }

  export function setWidthPercent(width) {
    progressBar.style.width = `${width}%`
  }
</script>

<div class="progress-bar-wrapper">
  <div class="counter">{complete}/{taskcount}</div>
  <div class="red-bar">
    <div class="progress-bar" bind:this={progressBar}></div>
  </div>
</div>

<style>
  .progress-bar-wrapper {
    display: flex;
    align-items: center;
  }

  .counter {
    padding: 0.5em;
    font-size: 1.6rem;
  }

  .progress-bar {
    width: 50%;
    background-color: lightgreen;
    border-radius: 5px;
    height: 10px;
    transition: all 0.3s ease-in-out;
  }

  .red-bar {
    background-color: lightcoral;
    width: 100%;
    border-radius: 5px;
  }
</style>
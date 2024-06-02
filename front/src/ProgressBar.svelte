<script>
  import confetti from 'canvas-confetti'; 
  let progressBar;
  let complete;
  let taskcount;


  export function setCompleteCounter(completed, alltasks) {
    complete = completed
    taskcount = alltasks

    let percent = completed / alltasks;
    setWidthPercent(percent * 100);
    if (complete == taskcount) {
      confetti({particleCount: 120, spread: 150});
    }
  }

  export function setWidthPercent(width) {
    progressBar.style.width = `${width}%`
  }
</script>

<div class="progress-bar-wrapper">
  <div class="counter">{complete} of {taskcount} complete</div>
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
    padding: 0.5em 0.5em 0.5em 0;
    font-size: 1.3rem;
  }

  .progress-bar {
    width: 50%;
    background-color: lightgreen;
    border-radius: 5px 0 0 5px;
    height: 10px;
    transition: all 0.3s ease-in-out;
    position: relative;
  }
/* 
  .progress-bar::after {
    content: '';
    width: 7px;
    height: 7px;
    background-color: lightgreen;
    transform: rotate(45deg);
    right: -4px;
    top: 1.5px;
    position: absolute;
  } */

  .red-bar {
    background-color: lightcoral;
    width: 100%;
    border-radius: 5px;
  }
</style>
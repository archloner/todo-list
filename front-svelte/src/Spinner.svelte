<script>
  export let hidden = true;
</script>

<div class="spinner-container {hidden ? 'hide' : ''}">

  <div class="spinner">
    <i class="fa fa-spinner"></i>
  </div>

</div>

<style>
  .spinner-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .spinner {
    margin: auto;
    animation: rotate-spinner 2s linear infinite;
  }

  @keyframes rotate-spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spinner i {
    font-size: 3.2rem;
  }
</style>
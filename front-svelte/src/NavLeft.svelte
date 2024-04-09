<script>
	import { onMount } from "svelte";
  import AppConfig from "./AppConfig.js";
  
  let menuItems = [
    {
      name: 'Overview',
      tasksAmount: 6,
      isHome: true,
      isActive: true
    },
    {
      name: 'Groceries',
      tasksAmount: 10,
      isHome: false,
      isActive: false
    },
    {
      name: 'Workout',
      tasksAmount: 4,
      isHome: false,
      isActive: false
    },
    {
      name: 'Reading',
      tasksAmount: 5,
      isHome: false,
      isActive: false
    }
  ]

  function showNewTask() {
    
  }

  function makeMenuItemActive(newActiveItem) {
    let itemsCopy = [...menuItems]
    itemsCopy.forEach(item => {
      item.isActive = item === newActiveItem;
    })
    menuItems = itemsCopy
  }

  onMount(() => {
    // console.log('Component mounted')
  })

</script>

<div class="menu-left padding-top">
  
  <div class="menu-controls menu-padding">
    <button class="btn btn-outline-primary new-project-btn" on:click={showNewTask}>
      <i class="fas fa-plus"></i> New list
    </button>
  </div>

  <div class="menu flex-1">
    <ul class="flex-1 menu-items">

      {#each menuItems as menuItem, index (menuItem)}
        <a href="/task" class="menu-item" class:active={menuItem.isActive} on:click={() => makeMenuItemActive(menuItem)}>
          <li class="menu-padding">
            <div class="flex-row">
              <i class="fa {menuItem.isHome ? 'fa-home' : 'fa-tasks'}"></i>
              <div class="menu-item-text">
                {menuItem.name}
                <p class="tasks-amount">{menuItem.tasksAmount} {menuItem.tasksAmount !== 1 ? 'Tasks' : 'Task'}</p>
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
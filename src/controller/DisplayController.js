import { TaskController } from "./TaskController";

export class DisplayController {
  content;
  taskController;
  view;
  model;

  constructor(dependencies) {
    this.content = document.querySelector(".wrapper");
    // this.taskController = new TaskController();
    if (dependencies.view) {
      this.view = dependencies.view;
    }
    if (dependencies.model) {
      this.model = dependencies.model;
    }
  }

  init() {
    // let project = this.model.getCurrentProject();
    // this.view.setProject(project);
    this.view.render()
    
    this.attachEventListeners();
  }

  getCurrentProject() {
    return this.model.getCurrentProject();
  }

  attachEventListeners() {
    // Showing and hiding task details
    this.addTaskDetailsToggleEventListeners();
    this.addExpandHideAllEventListener();
    // Task more menu open/close
    this.addToggleMoreMenuListener();
    this.addDeleteTaskClickListener();
    this.addEditTaskClickListener();
    // New Task modal show button and close
    this.addShowNewTaskModalEventListener();
    this.addHideNewTaskModalEventListener();
    this.addNewTaskSubmitListener();
    // Dark-mode/light-mode switch
    this.addToggleDarkModeClickListener();
  }

  addTaskDetailsToggleEventListeners() {
    const buttons = document.querySelectorAll(".task-menu .fa-chevron-down");
    for (let button of buttons) {
      button.addEventListener("click", (e) => {
        const icon = e.target;
        const task = icon.parentNode.parentNode;
        this.toggleTaskDetails(task);
      });
    }
  }

  toggleTaskDetails(taskElement) {
    if (taskElement) {
      const details = taskElement.querySelector(".task-details");
      details.classList.toggle("hide");

      const icon = taskElement.querySelector(".icon");
      icon.classList.toggle("fa-chevron-up");
      icon.classList.toggle("fa-chevron-down");
    }
  }

  addExpandHideAllEventListener() {
    const TEXT_CONTENT_TO_EXPAND = "Expand all";
    // Initial state is to expand
    const btn = document.querySelector("#expand-all-hide-all-span");
    btn.addEventListener("click", (e) => {
      const tasks = document.querySelectorAll(".task");
      if (tasks) {
        if (new String(btn.innerText.trim()).includes(TEXT_CONTENT_TO_EXPAND)) {
          for (let task of tasks) {
            this.showTaskDetails(task);
          }
          btn.textContent = "Collapse all";
        } else {
          for (let task of tasks) {
            this.hideTaskDetails(task);
          }
          btn.textContent = TEXT_CONTENT_TO_EXPAND;
        }
      }
    });
  }

  showTaskDetails(task) {
    const taskDetailsToShow = task.querySelector(".task-details");
    taskDetailsToShow.classList.remove("hide");
    const chevron = task.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-down");
    chevron.classList.add("fa-chevron-up");
  }

  hideTaskDetails(task) {
    const taskDetailsToShow = task.querySelector(".task-details");
    taskDetailsToShow.classList.add("hide");
    const chevron = task.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-up");
    chevron.classList.add("fa-chevron-down");
  }

  addShowNewTaskModalEventListener() {
    const btn = document.querySelector(".new-task-btn");
    const modalWrapper = document.querySelector("#new-task-modal-wrapper");
    btn.addEventListener("click", (e) => {
      this.showNewTaskModal(modalWrapper);
    });
  }

  showNewTaskModal(modalWrapper) {
    this.resetModalForm();
    window.scrollTo(0, 0)
    modalWrapper.classList.remove("hide");
  }

  resetModalForm() {
    const form = document.querySelector(".new-task-modal .form-row form");
    form.reset();
  }

  addHideNewTaskModalEventListener() {
    const wrapper = document.querySelector("#new-task-modal-wrapper");
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("modal-wrapper")) {
        this.animateModalClosing();
      }
    });

    const closeBtn = document.querySelector(".modal-wrapper .close-btn");
    closeBtn.addEventListener("click", (e) => {
      this.animateModalClosing();
    });
  }

  animateModalClosing() {
    const ANIMATION_DURATION_TIME = 600;

    const wrapper = document.querySelector("#new-task-modal-wrapper");
    const modal = wrapper.querySelector(".new-task-modal");

    modal.classList.add("modal-dissmis-animation");
    wrapper.classList.remove("wrapper-fade-in-animation");
    wrapper.classList.add("wrapper-fade-out-animation");
    setTimeout(() => {
      wrapper.classList.add("hide");
      modal.classList.remove("modal-dissmis-animation");
      wrapper.classList.remove("wrapper-fade-out-animation");
      wrapper.classList.add("wrapper-fade-in-animation");
    }, ANIMATION_DURATION_TIME);
  }

  addNewTaskSubmitListener() {
    const btn = document.querySelector("#new-task-submit");
    btn.addEventListener("click", (e) => {
      this.submitNewTaskModal();
      this.animateModalClosing();
    });
  }

  submitNewTaskModal() {
    console.log("New task submited!");
  }

  addToggleMoreMenuListener() {
    const btns = document.querySelectorAll(".task-menu .more");
    for (let btn of btns) {
      btn.addEventListener("click", (e) => {
        const menu = btn.nextElementSibling;
        setTimeout(() => {
          menu.classList.toggle("hide");
        }, 50);
      });
    }

    document.addEventListener("click", (e) => {
      // if clicked outside of .more-menu and not on more button
      if (
        !e.target.classList.contains("more-menu") &&
        !e.target.classList.contains("more-menu-option")
      ) {
        // hide all menus
        const menus = document.querySelectorAll(".more-menu:not(.hide)");
        for (let menu of menus) {
          menu.classList.add("hide"); // hide
        }
      }
    });
  }

  addDeleteTaskClickListener() {
    const deleteBtns = document.querySelectorAll(".more-menu-option.delete");
    for (let btn of deleteBtns) {
      const index =
        btn.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-index"
        );
      btn.addEventListener("click", this.handleDeleteTask.bind(this, index));
    }
  }

  handleDeleteTask(index) {
    console.log("Deleting task with id " + index);
    // this.confirmDeletingTask();
    // model.deleteTask(taskId);
  }

  addEditTaskClickListener() {
    const editBtns = document.querySelectorAll(".more-menu-option.edit");
    for (let btn of editBtns) {
      const index =
        btn.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-index"
        );
      btn.addEventListener("click", this.handleEditTask.bind(this, index));
    }
  }

  handleEditTask(index) {
    console.log("Editing task with id " + index);
    // open edit modal
  }

  addToggleDarkModeClickListener() {
    const btn = document.querySelector('.dark-mode-icon');
    if (btn) {
      btn.addEventListener('click', (e) => {
        const body = document.querySelector('body');
        body.classList.toggle('dark-mode');
      });
    } else {
      console.log('Dark-mode switch button not found')
    }
  }

}
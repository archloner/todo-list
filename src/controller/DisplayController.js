import { NewTaskModalValidationController } from "./NewTaskModalValidationController";

export class DisplayController {
  content;
  taskController;
  view;
  model;
  formValidation;

  constructor(dependencies) {
    this.content = document.querySelector(".wrapper");
    this.formValidation = new NewTaskModalValidationController();

    if (dependencies.view) {
      this.view = dependencies.view;
    }
    if (dependencies.model) {
      this.model = dependencies.model;
    }
  }

  init() {
    this.attachEventListeners();
    this.render();
  }

  getCurrentProject() {
    return this.model.getCurrentProject();
  }

  changeCurrentProject(projectId) {
    console.log(projectId);
    this.model.setCurrentProjectId(projectId);
    this.render();
  }

  render() {
    this.view.render();
    setTimeout(() => {
      if (this.model.getCurrentProjectId() !== 0) {
        // New task list element
        this.addNewListElementsEventListeners();
      } else {
        // Overview page
        this.addOverviewPageEventListeners();
      }
    }, 500);
  }

  attachEventListeners() {
    // New Task modal show button and close
    this.addShowNewTaskModalEventListener();
    this.addHideNewTaskModalEventListener();
    this.addNewTaskSubmitListener();
    // Dark-mode/light-mode switch
    this.addToggleDarkModeClickListener();
  }

  addNewListElementsEventListeners() {
    // Toggle done/not done task
    this.addToggleCompleteEventListener();
    // Showing and hiding task details
    this.addTaskDetailsToggleEventListeners();
    this.addExpandHideAllEventListener();
    // Task more menu open/close
    this.addToggleMoreMenuListener();
    this.addDeleteTaskClickListener();
    this.addEditTaskClickListener();
  }

  addToggleCompleteEventListener() {
    // update menu counters on each toggle?
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      checkbox.addEventListener("change", (e) => {
        const taskId = parseInt(e.target.id.split("-")[1]);
        this.toggleTaskComplete(taskId, e.target.checked);
      });
    }
  }

  toggleTaskComplete(taskId, isComplete) {
    console.log("toggle task complete");
    this.model.setTaskIsComplete(taskId, isComplete);
    this.render();
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
    window.scrollTo(0, 0);
    modalWrapper.classList.remove("hide");
  }

  resetModalForm() {
    const form = document.querySelector("#new-task-form");
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
    const MODAL_CLOSING_ANIMATION_DURATION = 600;

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
    }, MODAL_CLOSING_ANIMATION_DURATION);
  }

  addNewTaskSubmitListener() {
    const btn = document.querySelector("#new-task-submit");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // validate form
      this.formValidation.init();
      if (this.formValidation.isValid()) {
        const task = this.formValidation.getTask();
        console.log(task);
        this.submitNewTaskModal(task);
        this.animateModalClosing();
      }
    });
  }

  submitNewTaskModal(task) {
    console.log("New task submited! ");
    // store data in a model
    this.model.addTask(task);
    // rerender view
    this.render();
    console.log(this.model.getCurrentProject().tasks.length);
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
    console.log("Darkmode toggle listener attached");
    const btn = document.querySelector(".dark-mode-icon");
    if (btn) {
      btn.addEventListener("click", (e) => {
        const body = document.querySelector("body");
        console.log(body);
        body.classList.toggle("dark-mode");
      });
    } else {
      console.log("Dark-mode switch button not found");
    }
  }

  addOverviewPageEventListeners() {
    this.addProjectTileClickListener();
    this.addNewProjectButtonListener();
  }

  addProjectTileClickListener() {
    const tiles = document.querySelectorAll(
      ".project-grid-item:not(.new-project-btn)"
    );
    tiles.forEach((tile) => {
      tile.addEventListener("click", (e) => {
        console.log(e.target);
        const bg = e.target;
        console.log(bg.parentElement);
        const projectId = bg.parentElement.getAttribute("data-project-index");
        this.changeCurrentProject(projectId);
      });
    });
  }

  addNewProjectButtonListener() {
    const newProjectButtons = document.querySelectorAll(".new-project-btn");

    newProjectButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.openNewProjectModal();
      });
    });
  }

  openNewProjectModal() {
    console.log("New project modal opened");
  }
}

import { NewTaskModalValidationController } from "./NewTaskModalValidationController";
import { NewProjectFormValidationController } from "./NewProjectFormValidationController";

export class DisplayController {
  content;
  taskController;
  view;
  model;
  formValidation;

  constructor(dependencies) {
    this.content = document.querySelector(".wrapper");
    this.formValidation = new NewTaskModalValidationController();

    this.projectFormValidation = new NewProjectFormValidationController();

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
    this.model.setCurrentProjectId(projectId);
    this.render();
  }

  render() {
    this.view.render();
    const newTaskBtn = document.querySelector(".new-task-btn");

    setTimeout(() => {
      if (this.model.getCurrentProjectId() !== 0) {
        // New task list element
        this.addNewListElementsEventListeners();
        // show new task button
        newTaskBtn.classList.remove("hide");
      } else {
        // Overview page
        this.addOverviewPageEventListeners();
        // hide new task button
        newTaskBtn.classList.add("hide");
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

    this.addHideDeleteTaskModalEventListener();
    this.addConfirmDeleteTaskButtonClickListener();
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
    const buttons = document.querySelectorAll(".task-menu .icon.chevron");
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

      const task = this.model.getTaskById(
        taskElement.getAttribute("data-index")
      );
      task.toggleIsCollapsed();
      console.log(task.isCollapsed);
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
          this.view.allExpanded = true;
          for (let task of tasks) {
            this.showTaskDetails(task);
          }
        } else {
          this.view.allExpanded = false;
          for (let task of tasks) {
            this.hideTaskDetails(task);
          }
        }
        this.render();
      }
    });
  }

  showTaskDetails(taskEl) {
    const task = this.model.getTaskById(taskEl.getAttribute("data-index"));
    task.setIsCollapsed(false);

    const chevron = taskEl.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-down");
    chevron.classList.add("fa-chevron-up");
  }

  hideTaskDetails(taskEl) {
    const task = this.model.getTaskById(taskEl.getAttribute("data-index"));
    task.setIsCollapsed(true);

    const chevron = taskEl.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-up");
    chevron.classList.add("fa-chevron-down");
  }

  /* NEW TASK MODAL */

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
    // store data in a model
    this.model.addTask(task);
    // rerender view
    this.render();
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

  /* DELETING TASK */

  addDeleteTaskClickListener() {
    const deleteBtns = document.querySelectorAll(".more-menu-option.delete");
    for (let btn of deleteBtns) {
      const index =
        btn.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-index"
        );
      btn.addEventListener("click", this.handleDeleteTask.bind(this, index));
    }
  }

  handleDeleteTask(index) {
    console.log("Deleting task with id " + index);
    // Hide 'more' menu
    const moreMenu = document.querySelectorAll(".task-menu .more-menu");
    moreMenu.forEach((item) => {
      item.classList.add("hide");
    });

    // Confirm task deletion
    if (this.confirmDeletingTask(parseInt(index))) {
      this.model.deleteTask(index);
    }
  }

  confirmDeletingTask(id) {
    this.showConfirmDeleteModal(id);
    return false;
  }

  showConfirmDeleteModal(id) {
    const task = this.model.getTaskById(id);
    const modal = document.querySelector("#confirm-task-delete-modal");
    modal.querySelector(".task-title").textContent = task.title;
    modal.querySelector("#delete-confirm").setAttribute("data-id", id);
    modal.classList.remove("hide");
  }

  addConfirmDeleteTaskButtonClickListener() {
    const confirmButton = document.querySelector(
      "#confirm-task-delete-modal #delete-confirm"
    );
    confirmButton.addEventListener("click", (e) => {
      const id = confirmButton.getAttribute("data-id");
      this.model.deleteTaskById(id);
      this.animateDeleteTaskModalClosing();
      this.render();
    });
  }

  addHideDeleteTaskModalEventListener() {
    const wrapper = document.querySelector("#confirm-task-delete-modal");
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("modal-wrapper")) {
        this.animateDeleteTaskModalClosing();
      }
    });

    const closeBtn = document.querySelector(
      "#confirm-task-delete-modal .close-btn"
    );
    closeBtn.addEventListener("click", (e) => {
      this.animateDeleteTaskModalClosing();
    });

    const cancelButton = wrapper.querySelector("#delete-cancel");
    cancelButton.addEventListener("click", (e) => {
      this.animateDeleteTaskModalClosing();
    });
  }

  animateDeleteTaskModalClosing() {
    const MODAL_CLOSING_ANIMATION_DURATION = 600;

    const wrapper = document.querySelector("#confirm-task-delete-modal");
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

  /* EDIT MODAL */

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
        body.classList.toggle("dark-mode");
      });
    } else {
      console.log("Dark-mode switch button not found");
    }
  }

  addOverviewPageEventListeners() {
    this.addProjectTileClickListener();
    this.addNewProjectButtonListener();
    this.addHideNewProjectModalEventListener();
    this.addNewProjectSubmitListener();
  }

  addProjectTileClickListener() {
    const tiles = document.querySelectorAll(
      ".project-grid-item:not(.new-project-btn)"
    );
    tiles.forEach((tile) => {
      tile.addEventListener("click", (e) => {
        const bg = e.target;
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
    this.resetNewProjectModalForm();
    const modal = document.querySelector("#new-project-modal-wrapper");
    modal.classList.remove("hide");
  }

  resetNewProjectModalForm() {
    const form = document.querySelector("#new-project-form");
    form.reset();
  }

  addHideNewProjectModalEventListener() {
    const wrapper = document.querySelector("#new-project-modal-wrapper");
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("modal-wrapper")) {
        this.animateNewProjectModalClosing();
      }
    });

    const closeBtn = document.querySelector(
      "#new-project-modal-wrapper .close-btn"
    );
    closeBtn.addEventListener("click", (e) => {
      this.animateNewProjectModalClosing();
    });
  }

  animateNewProjectModalClosing() {
    const MODAL_CLOSING_ANIMATION_DURATION = 600;

    const wrapper = document.querySelector("#new-project-modal-wrapper");
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

  addNewProjectSubmitListener() {
    const btn = document.querySelector("#new-project-submit");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // validate form
      this.projectFormValidation.init();
      if (this.projectFormValidation.isValid()) {
        const project = this.projectFormValidation.getProject();
        console.log(project);
        this.submitNewProjectModal(project);
        this.animateNewProjectModalClosing();
      }
    });
  }

  submitNewProjectModal(project) {
    console.log("Submitting new project");
    this.model.addProject(project);
    this.render();
  }
}

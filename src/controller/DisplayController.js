import { TaskFormValidationController } from "./TaskFormValidationController";
import { NewProjectFormValidationController } from "./NewProjectFormValidationController";
import { PriorityType } from "../entity/PriorityType";
import { formatISO } from "date-fns";
import { AppConfig } from "../config/AppConfig";

export class DisplayController {
  content;
  taskController;
  view;
  model;
  formValidation;

  constructor(dependencies) {
    this.content = document.querySelector(".wrapper");
    this.formValidation = new TaskFormValidationController();
    this.formValidation.init();

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
    this.chooseTheme();
    this.render();
  }

  getCurrentProject() {
    return this.model.getCurrentProject();
  }

  changeCurrentProject(projectId) {
    this.model.setCurrentProjectId(projectId);
    this.render();
  }

  chooseTheme() {
    const body = document.querySelector("body");
    if (AppConfig.DARK_MODE_DEFAULT) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
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
    }, 100);
  }

  attachEventListeners() {
    // New Task modal show button and close
    this.addShowNewTaskModalEventListener();
    this.addHideNewTaskModalEventListener();
    this.addNewTaskSubmitListener();
    // Dark-mode/light-mode switch
    this.addToggleDarkModeClickListener();
    // new project modal
    this.addHideNewProjectModalEventListener();
    this.addNewProjectSubmitListener();
    // Delete task confirm modal
    this.addHideDeleteTaskModalEventListener();
    this.addConfirmDeleteTaskButtonClickListener();
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
    // Delete project confirm modal open
    this.addDeleteProjectClickListener();
    // Edit project details
    this.addEditProjectClickListener();
  }

  addOverviewPageEventListeners() {
    // Project tile click listeners
    this.addProjectTileClickListener();
    this.addNewProjectButtonListener();
    // Delete confirm modal
    this.addHideDeleteTaskModalEventListener();
    this.addConfirmDeleteProjectButtonClickListener();
  }

  addToggleCompleteEventListener() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      checkbox.addEventListener("change", (e) => {
        const taskId = e.target.getAttribute("data-id");
        this.toggleTaskComplete(taskId, e.target.checked);
      });
    }
  }

  toggleTaskComplete(taskId, isComplete) {
    this.model.setTaskIsComplete(parseInt(taskId), isComplete);
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
    }
  }

  addExpandHideAllEventListener() {
    const TEXT_CONTENT_TO_EXPAND = "Expand all";
    // Initial state is collapsed
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
    this.formValidation.reset();
    modalWrapper.classList.remove("hide");
  }

  resetModalForm() {
    const modal = document.querySelector("#new-task-modal-wrapper");
    const modalTitle = modal.querySelector(".title");
    modalTitle.textContent = "Add new task";

    const button = modal.querySelector("#new-task-submit");
    button.textContent = "Create";
    button.setAttribute("data-action", "create");
    button.setAttribute("data-index", -1);

    const datePicker = modal.querySelector("#task-due-date");
    datePicker.value = "";

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

      const action = e.target.getAttribute("data-action");
      if (action.includes("create")) {
        // validate form
        this.formValidation.action = action;
        if (this.formValidation.isValid()) {
          const task = this.formValidation.getTask();
          this.submitNewTaskModal(task);
          this.animateModalClosing();
          this.formValidation.reset();
        }
      } else if (action.includes("edit")) {
        this.formValidation.action = action;
        const taskId = e.target.getAttribute("data-index");
        if (this.formValidation.isValidEdit()) {
          const task = this.formValidation.getTask();
          task.id = parseInt(taskId);
          this.submitEditTask(task);
          this.animateModalClosing();
          this.formValidation.reset();
        }
      }
    });
  }

  submitNewTaskModal(task) {
    // store data in a model
    this.model.addTask(task);
    // rerender view
    this.render();
  }

  submitEditTask(task) {
    this.model.updateTask(task);
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
    this.fillDeleteModalWithTaskData(id);
    this.showConfirmDeleteModal();
    return false;
  }

  fillDeleteModalWithTaskData(id) {
    const task = this.model.getTaskById(id);
    const modal = document.querySelector("#confirm-task-delete-modal");
    modal.querySelector(".task-title").textContent = task.title;
    modal.querySelector("#delete-confirm").setAttribute("data-id", id);
    modal
      .querySelector("#delete-confirm")
      .setAttribute("data-delete-type", "task");
  }

  showConfirmDeleteModal() {
    const modal = document.querySelector("#confirm-task-delete-modal");
    modal.classList.remove("hide");
  }

  addConfirmDeleteTaskButtonClickListener() {
    const confirmButton = document.querySelector(
      "#confirm-task-delete-modal #delete-confirm"
    );
    confirmButton.addEventListener("click", (e) => {
      const deleteType = confirmButton.getAttribute("data-delete-type");
      if (deleteType.includes("project")) {
      } else if (deleteType.includes("task")) {
        const taskId = confirmButton.getAttribute("data-id");
        this.model.deleteTaskById(taskId);
      }
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

  /* EDIT TASK MODAL */
  addEditTaskClickListener() {
    const editBtns = document.querySelectorAll(".more-menu-option.edit");
    for (let btn of editBtns) {
      const index =
        btn.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-index"
        );
      btn.addEventListener("click", this.handleEditTask.bind(this, index));
    }
  }

  handleEditTask(index) {
    const modal = document.querySelector("#new-task-modal-wrapper");
    this.formValidation.reset();
    // Fill modal with task data
    this.fillFormWithTaskData(index);
    // open edit modal
    modal.classList.remove("hide");
  }

  fillFormWithTaskData(taskId) {
    const task = this.model.getTaskById(taskId);

    const modal = document.querySelector("#new-task-modal-wrapper");
    const modalTitle = modal.querySelector(".title");
    modalTitle.textContent = "Edit task";

    const taskTitle = modal.querySelector("#task-title");
    taskTitle.value = task.title;

    const taskDescription = modal.querySelector("#task-description");
    taskDescription.value = task.description;

    const priorityRadios = modal.querySelectorAll('input[type="radio"]');

    switch (task.priority) {
      case PriorityType.DEFAULT:
        priorityRadios[0].checked = true;
        break;
      case PriorityType.LOW:
        priorityRadios[1].checked = true;
        break;
      case PriorityType.MEDIUM:
        priorityRadios[2].checked = true;
        break;
      case PriorityType.HIGH:
        priorityRadios[3].checked = true;
        break;
    }

    const datePicker = modal.querySelector("#task-due-date");
    const date = formatISO(task.dueDate, { representation: "date" });
    datePicker.value = date;

    const button = modal.querySelector("#new-task-submit");
    button.textContent = "Edit";
    button.setAttribute("data-action", "edit");
    button.setAttribute("data-index", task.id);
  }

  addToggleDarkModeClickListener() {
    const btn = document.querySelector(".dark-mode-icon");
    if (btn) {
      btn.addEventListener("click", (e) => {
        const body = document.querySelector("body");
        body.classList.toggle("dark-mode");
      });
    } else {
      console.error("Dark-mode switch button not found");
    }
  }

  /* NEW PROJECT MODAL */
  addProjectTileClickListener() {
    const tiles = document.querySelectorAll(
      ".project-grid-item:not(.new-project-btn)"
    );
    tiles.forEach((tile) => {
      tile.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;
        if (target.classList.contains("bg")) {
          const projectId =
            target.parentElement.getAttribute("data-project-index");
          this.changeCurrentProject(projectId);
        } else {
          // delete project
          const projectId =
            target.parentElement.parentElement.getAttribute(
              "data-project-index"
            );
          this.showConfirmDeleteProjectModal(projectId);
        }
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
    this.showProjectModal();
  }

  showProjectModal() {
    const modal = document.querySelector("#new-project-modal-wrapper");
    modal.classList.remove("hide");
  }

  resetNewProjectModalForm() {
    const form = document.querySelector("#new-project-form");
    form.reset();

    const modal = document.querySelector("#new-project-modal-wrapper");
    const title = modal.querySelector(".title");
    title.textContent = "Add new project";

    const btn = modal.querySelector("#new-project-submit");
    btn.textContent = "Create";
    btn.setAttribute("data-action", "create");
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
        if (e.target.getAttribute("data-action").includes("create")) {
          this.submitNewProjectModal(project);
        } else if (e.target.getAttribute("data-action").includes("edit")) {
          this.editProjectDetails(project);
        }
        this.animateNewProjectModalClosing();
      }
    });
  }

  submitNewProjectModal(project) {
    this.model.addProject(project);
    this.render();
  }

  showConfirmDeleteProjectModal(projectId) {
    this.fillDeleteModalWithProjectData(projectId);
    this.showConfirmDeleteModal();
  }

  fillDeleteModalWithProjectData(id) {
    const modal = document.querySelector("#confirm-task-delete-modal");
    const titleEl = modal.querySelector(".title");
    titleEl.textContent = "Delete project?";

    const projectTitle = this.model.getProjectById(id).title;

    const paragraph = modal.querySelector("p");
    paragraph.innerHTML = `Delete project <span class="task-title">${projectTitle}</span>?`;

    const deleteConfirmBtn = modal.querySelector("#delete-confirm");
    deleteConfirmBtn.setAttribute("data-id", id);
    deleteConfirmBtn.setAttribute("data-delete-type", "project");
  }

  addConfirmDeleteProjectButtonClickListener() {
    const btn = document.querySelector("#delete-confirm");
    btn.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-delete-type").includes("project")) {
        const projectId = e.target.getAttribute("data-id");
        if (this.model.deleteProjectById(projectId)) {
          this.animateDeleteTaskModalClosing();
          this.render();
        } else {
          console.error("Error while deleting project");
        }
      } else {
        console.error("Deleting project but task id given");
      }
    });
  }

  addDeleteProjectClickListener() {
    const btn = document.querySelector(".project-delete-btn");
    btn.addEventListener("click", (e) => {
      const projectId = e.target.getAttribute("data-project-id");
      this.showConfirmDeleteProjectModal(projectId);
    });
  }

  /* EDIT PROJECT MODAL */
  addEditProjectClickListener() {
    const btn = document.querySelector(".push-right .fa-edit");
    btn.addEventListener("click", (e) => {
      this.openEditProjectModal(e.target.getAttribute("data-project-id"));
    });
  }

  openEditProjectModal(projectId) {
    this.fillFormWithProjectData(projectId);
    this.showProjectModal();
  }

  fillFormWithProjectData(projectId) {
    const project = this.model.getProjectById(projectId);

    const modal = document.querySelector("#new-project-modal-wrapper");
    const modalTitle = modal.querySelector(".title");
    modalTitle.textContent = "Edit project";

    const projectTitle = modal.querySelector("#project-title");
    projectTitle.value = project.title;

    const projectDescription = modal.querySelector("#project-description");
    projectDescription.value = project.description;

    const btn = modal.querySelector("#new-project-submit");
    btn.textContent = "Edit";
    btn.setAttribute("data-action", "edit");
    btn.setAttribute("data-id", project.id);
  }

  editProjectDetails(project) {
    this.model.updateProject(project);
    this.render();
  }
}

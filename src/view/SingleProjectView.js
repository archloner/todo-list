import { PriorityType } from "../entity/PriorityType";
import { Utils } from "../util/Utils";
import { format, formatDistance, isAfter } from "date-fns";

const OVERVIEW_PAGE_ID = 0;

export class SingleProjectView {
  container;
  project;
  controller;
  model;
  menuView;

  constructor(dependencies) {
    this.wrapper = document.querySelector(".content-right");
    this.container = document.createElement("div");
    this.container.classList.add("container");

    if (dependencies.menuView) {
      this.menuView = dependencies.menuView;
    }

    this.init();
  }

  init() {}

  setController(controller) {
    this.controller = controller;
    this.setCurrentProject();
  }

  setCurrentProject() {
    this.project = this.controller.getCurrentProject();
  }

  setProject(project) {
    this.project = project;
  }

  setModel(model) {
    console.log('model set')
    this.model = model;
  }

  updateProject() {
    this.project = this.model.getCurrentProject();
  }

  render() {
    this.updateProject();
    this.renderMenu();
    if (this.project.id === OVERVIEW_PAGE_ID) {
      this.renderOverview();
    } else {
      this.renderTasksList();
    }
  }

  renderMenu() {
    this.menuView.render();
  }

  renderOverview() {
    this.clearContainer();

    const flexRow = document.createElement("div");
    flexRow.classList.add("flex-row");

    const title = document.createElement("h1");
    title.classList.add("list-title");
    title.textContent = "Overview";

    flexRow.appendChild(title);

    const projectGridWrapper = document.createElement("div");
    projectGridWrapper.classList.add("project-grid-wrapper");

    const projectGrid = document.createElement("div");
    projectGrid.classList.add("project-grid");

    this.model.getProjectOverview().map((project) => {
      projectGrid.appendChild(this.getProjectGridItem(project));
    });

    projectGrid.appendChild(this.getNewProjectGridButton());
    projectGridWrapper.appendChild(projectGrid);

    this.container.appendChild(flexRow);
    this.container.appendChild(projectGridWrapper);
  }

  getProjectGridItem(project) {
    const element = document.createElement("div");
    element.classList.add("project-grid-item");
    element.setAttribute("data-project-index", project.id);

    const bg = document.createElement("div");
    bg.classList.add("bg");
    element.appendChild(bg);

    const text = document.createElement("div");
    text.classList.add("text");

    const title = document.createElement("h2");
    title.classList.add("project-title");
    title.textContent = project.name;
    text.appendChild(title);

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = `${project.tasks} ${(project.tasks === 1 ? "task" : "tasks")}`;
    text.appendChild(taskCount);

    element.appendChild(text);

    return element;
  }

  getNewProjectGridButton() {
    const element = document.createElement("div");
    element.classList.add("project-grid-item", "new-project-btn");

    const bg = document.createElement("div");
    bg.classList.add("bg");
    element.appendChild(bg);

    const text = document.createElement("div");
    text.classList.add("text");

    const title = document.createElement("h2");
    title.classList.add("project-title");
    title.innerHTML = "<i class='fa fa-plus'></i>";
    text.appendChild(title);

    const taskCount = document.createElement("span");
    taskCount.classList.add("task-count");
    taskCount.textContent = 'New project';
    text.appendChild(taskCount);

    element.appendChild(text);

    return element;
  }

  renderTasksList() {
    this.clearContainer();
    this.container.classList.add("fade-in-animation");
    this.container.appendChild(this.createProjectTitleAndMenu());
    this.container.appendChild(this.createProjectDescription());
    this.container.appendChild(this.createTasks());

    this.wrapper.removeChild(document.querySelector(".container"));
    this.wrapper.appendChild(this.container);
  }

  clearContainer() {
    this.container.textContent = "";
  }

  createProjectTitleAndMenu() {
    const flexRow = document.createElement("div");
    flexRow.classList.add("flex-row");

    const heading = document.createElement("h1");
    heading.classList.add("list-title");
    heading.textContent = this.project.title;

    const menu1 = document.createElement("div");
    menu1.classList.add("push-right", "align-center");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-ellipsis-v");

    menu1.appendChild(icon);

    flexRow.appendChild(heading);
    flexRow.appendChild(menu1);

    return flexRow;
  }

  createProjectDescription() {
    const description = document.createElement("p");
    description.classList.add("list-description");
    description.textContent = this.project.description;

    return description;
  }

  createTasks() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("tasks-wrapper");

    const sectionTodo = document.createElement("div");
    sectionTodo.classList.add("flex-row");

    const headingTodo = document.createElement("div");
    headingTodo.classList.add("tasks-title");
    headingTodo.textContent = "Todo";

    sectionTodo.appendChild(headingTodo);

    const expandAll = document.createElement("div");
    expandAll.classList.add("push-right");

    const expandAllSpan = document.createElement("span");
    expandAllSpan.classList.add("font-sm");
    expandAllSpan.id = "expand-all-hide-all-span";
    expandAllSpan.textContent = "Expand all";

    expandAll.appendChild(expandAllSpan);
    sectionTodo.appendChild(expandAll);
    wrapper.appendChild(sectionTodo);

    const form = document.createElement("form");
    for (let task of this.project.tasks) {
      // form.appendChild(task.getDOMElement());
      // or
      form.appendChild(this.getTaskDOMElement(task));
    }

    wrapper.appendChild(form);

    if (this.project.done && this.project.done.length > 0) {
      const headingDone = document.createElement("div");
      headingDone.classList.add("tasks-title");
      headingDone.textContent = "Done";

      const doneForm = document.createElement("form");
      for (let doneTask of this.project.done) {
        doneForm.appendChild(this.getTaskDOMElement(doneTask));
      }

      wrapper.appendChild(headingDone);
      wrapper.appendChild(doneForm);
    }

    return wrapper;
  }

  getTaskDOMElement(task) {
    const DATE_FNS_FORMAT_STRING = "EEEE d LLLL y";

    let backgroundColorClass;
    let borderColorClass;

    switch (task.priority) {
      case PriorityType.DEFAULT:
        backgroundColorClass = "bg-light";
        borderColorClass = "priority-default-border";
        break;

      case PriorityType.HIGH:
        backgroundColorClass = "bg-danger";
        borderColorClass = "priority-high-border";
        break;

      case PriorityType.MEDIUM:
        backgroundColorClass = "bg-medium";
        borderColorClass = "priority-medium-border";
        break;

      case PriorityType.LOW:
        backgroundColorClass = "bg-low";
        borderColorClass = "priority-low-border";
        break;
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task", borderColorClass);
    taskElement.setAttribute("data-index", task.id);

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    if (task.isComplete) {
      checkboxInput.setAttribute("checked", "");
    }
    checkboxInput.id = `task-${task.id}`;

    taskContent.appendChild(checkboxInput);

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-wrapper");
    const label = document.createElement("label");
    label.setAttribute("for", `task-${task.id}`);
    const spanCheckbox = document.createElement("span");
    spanCheckbox.classList.add("checkbox");
    const spanCheck = document.createElement("span");
    spanCheck.classList.add("check");

    spanCheckbox.appendChild(spanCheck);
    label.appendChild(spanCheckbox);
    checkboxWrapper.appendChild(label);

    taskContent.appendChild(checkboxWrapper);

    const taskText = document.createElement("div");
    taskText.classList.add("task-text");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = task.title;

    taskText.appendChild(title);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details", "hide");

    const taskDescription = document.createElement("div");
    taskDescription.classList.add("description", "font-sm");
    taskDescription.textContent = task.description;

    const flexRow1 = document.createElement("div");
    flexRow1.classList.add("flex-row");

    const priority = document.createElement("div");
    priority.classList.add("priority", backgroundColorClass, "font-sm");
    priority.textContent = Utils.capitalize(task.priority);

    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date", "font-sm");

    const dueDateString = format(task.dueDate, DATE_FNS_FORMAT_STRING);

    let dueIn;
    const distance = formatDistance(task.dueDate, new Date());
    if (isAfter(new Date(), task.dueDate)) {
      // Overdue
      dueIn = `Overdue ${distance}`;
    } else {
      dueIn = `Due in ${distance}`;
    }

    dueDate.innerHTML = `${dueIn} <span class='date'>(${dueDateString})</span>`;

    taskDetails.appendChild(taskDescription);

    flexRow1.appendChild(priority);
    flexRow1.appendChild(dueDate);
    taskDetails.appendChild(flexRow1);

    taskText.appendChild(taskDetails);

    taskContent.appendChild(taskText);
    taskElement.appendChild(taskContent);

    const taskMenu = document.createElement("div");
    taskMenu.classList.add("task-menu");

    const chevronIcon = document.createElement("i");
    chevronIcon.classList.add("fas", "fa-chevron-down", "icon", "chevron");
    taskMenu.appendChild(chevronIcon);

    const moreIcon = document.createElement("i");
    moreIcon.classList.add("fas", "fa-ellipsis-v", "icon", "more");
    taskMenu.appendChild(moreIcon);

    const moreMenu = document.createElement("more-menu");
    moreMenu.classList.add("more-menu", "hide");

    const list = document.createElement("ul");

    const editListItem = document.createElement("li");
    editListItem.classList.add("more-menu-option", "edit");
    editListItem.innerHTML = "<i class='far fa-edit icon'></i> Edit";

    const deleteListItem = document.createElement("li");
    deleteListItem.classList.add("more-menu-option", "delete");
    deleteListItem.innerHTML = "<i class='far fa-trash-alt icon'></i> Delete";

    list.appendChild(editListItem);
    list.appendChild(deleteListItem);

    moreMenu.appendChild(list);
    taskMenu.appendChild(moreMenu);

    taskElement.appendChild(taskMenu);

    return taskElement;
  }
}

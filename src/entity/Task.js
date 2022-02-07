import { IndexGenerator } from "../util/IndexGenerator";

export class Task {
  createdDate;
  title;
  description;
  dueDate;
  priority;
  isComplete;
  log;
  // optional?
  notes;
  checklist;

  constructor(title, description, dueDate, priority) {
    this.id = IndexGenerator.nextIndex();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdDate = new Date();
    this.isComplete = false;

    this.notes = null;
    this.checklist = [];
    this.log = [];
  }

  isComplete() {
    return isComplete === true;
  }

  markAsComplete() {
    this.isComplete = true;
  }

  markAsNotComplete() {
    this.isComplete = false;
  }

  getDOMElement() {
    let backgroundColorClass;
    let borderColorClass;

    switch (this.priority) {
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
    taskElement.setAttribute("data-index", this.id);

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    if (this.isComplete) {
      checkboxInput.setAttribute("checked", "");
    }
    checkboxInput.id = `task-${this.id}`;

    taskContent.appendChild(checkboxInput);

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-wrapper");
    const label = document.createElement("label");
    label.setAttribute("for", `task-${this.id}`);
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
    title.textContent = this.title;

    taskText.appendChild(title);

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details", "hide");

    const taskDescription = document.createElement("div");
    taskDescription.classList.add("description", "font-sm");
    taskDescription.textContent = this.description;

    const flexRow1 = document.createElement("div");
    flexRow1.classList.add("flex-row");

    const priority = document.createElement("div");
    priority.classList.add("priority", backgroundColorClass, "font-sm");
    priority.textContent = Utils.capitalize(this.priority);

    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date", "font-sm");
    dueDate.innerHTML = `Due date <span class='date'>${this.dueDate}</span>`;

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

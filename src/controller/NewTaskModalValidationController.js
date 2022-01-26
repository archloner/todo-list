import { isAfter } from "date-fns";
import { Task } from "../entity/Task";

export class NewTaskModalValidationController {
  validationMessages;
  isFormEmpty;
  validTask;
  form = document.querySelector(".new-task-modal");

  constructor() {
    this.validTask = {};
    this.isFormEmpty = true;
    this.init();
  }

  init() {
    this.resetValidationMessages();
    this.addBlurEventListeners();
  }

  resetValidationMessages() {
    this.validationMessages = {
      title: [],
      description: [],
      dueDate: [],
    };
    this.clearValidationMessages();
  }

  isValid() {
    this.validateInputs();
    
    for (let msg in this.validationMessages) {
      if (this.validationMessages[msg].length !== 0) {
        return false;
      }
    }

    return true;
  }

  validateInputs() {
    this.validateTitleInput();
    this.validateDescriptionInput();
    this.validateDueDateInput();
  }

  validateTitleInput() {
    const title = this.form.querySelector("#task-title").value;
    const validationMsgSpan = this.form.querySelector(
      "#form-label-title .validation-msg"
    );

    validationMsgSpan.textContent = "";

    if (title) {
      this.validTask.title = title;
    } else {
      const msg = "*  Please enter task title";
      if (!this.validationMessages.title.includes(msg)) {
        this.validationMessages.title.push(msg);
      }
      validationMsgSpan.textContent = msg;
    }
  }

  validateDescriptionInput() {
    const description = this.form.querySelector("#task-description").value;
    const validationMsgSpan = this.form.querySelector(
      "#form-label-description .validation-msg"
    );

    validationMsgSpan.textContent = "";

    if (description) {
      this.validTask.description = description;
    } else {
      const msg = "* Please enter task description";
      if (!this.validationMessages.description.includes(msg)) {
        this.validationMessages.description.push(msg);
      }
      validationMsgSpan.textContent = msg;
    }
  }

  validateDueDateInput() {
    const dueDate = this.form.querySelector("#task-due-date").value;
    const validationMsgSpan = this.form.querySelector(
      "#form-label-due-date .validation-msg"
    );

    validationMsgSpan.textContent = "";

    if (dueDate && isAfter(new Date(dueDate), new Date())) {
      this.validTask.dueDate = new Date(dueDate);
    } else {
      const msg = "* Please enter task due date that's in the future";
      if (!this.validationMessages.dueDate.includes(msg)) {
        this.validationMessages.dueDate.push(msg);
      }
      validationMsgSpan.textContent = msg;
    }
  }

  addBlurEventListeners() {
    const title = this.form.querySelector("#task-title");
    title.addEventListener("blur", (e) => {
      this.validateTitleInput();
    });

    const description = this.form.querySelector("#task-description");
    description.addEventListener("blur", (e) => {
      this.validateDescriptionInput();
    });

    const dueDate = this.form.querySelector("#task-due-date");
    dueDate.addEventListener("input", (e) => {
      this.validateDueDateInput();
    });
  }

  clearValidationMessages() {
    const validationMessages = document.querySelectorAll(".validation-msg");
    for (let msg of validationMessages) {
      msg.textContent = "";
    }
  }

  getTask() {
    const task = new Task(
      this.validTask.title,
      this.validTask.description,
      this.validTask.dueDate
    );

    task.priority = this.getPriorityValue();

    return task;
  }

  getPriorityValue() {
    const priority = this.form.querySelector(
      '#new-task-form input[type="radio"]:checked'
    );
    return priority.value;
  }
}

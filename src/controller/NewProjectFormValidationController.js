export class NewProjectFormValidationController {
  validationMessages;
  isFormEmpty;
  validProject;
  form = document.querySelector("#new-project-modal-wrapper .new-task-modal");

  constructor() {
    this.validProject = {};
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
  }

  validateTitleInput() {
    const title = this.form.querySelector("#project-title").value;
    const validationMsgSpan = this.form.querySelector(
      "#form-label-project-title .validation-msg"
    );

    validationMsgSpan.textContent = "";

    if (title) {
      this.validProject.title = title;
    } else {
      const msg = "*  Please enter project title";
      if (!this.validationMessages.title.includes(msg)) {
        this.validationMessages.title.push(msg);
      }
      validationMsgSpan.textContent = msg;
    }
  }

  validateDescriptionInput() {
    const description = this.form.querySelector("#project-description").value;
    const validationMsgSpan = this.form.querySelector(
      "#form-label-project-description .validation-msg"
    );

    validationMsgSpan.textContent = "";

    if (description) {
      this.validProject.description = description;
    } else {
      const msg = "* Please enter project description";
      if (!this.validationMessages.description.includes(msg)) {
        this.validationMessages.description.push(msg);
      }
      validationMsgSpan.textContent = msg;
    }
  }

  addBlurEventListeners() {
    const title = this.form.querySelector("#project-title");
    title.addEventListener("blur", (e) => {
      this.validateTitleInput();
    });

    const description = this.form.querySelector("#project-description");
    description.addEventListener("blur", (e) => {
      this.validateDescriptionInput();
    });
  }

  clearValidationMessages() {
    const validationMessages = document.querySelectorAll(
      "#new-project-modal-wrapper .validation-msg"
    );
    for (let msg of validationMessages) {
      msg.textContent = "";
    }
  }

  getProject() {
    const project = {
      title: this.validProject.title,
      description: this.validProject.description,
      tasks: [],
      done: [],
    };

    return project;
  }
}

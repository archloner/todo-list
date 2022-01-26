export class MenuView {
  model;
  controller;

  constructor(dependencies) {
    if (dependencies.model) {
      this.model = dependencies.model;
    }
  }

  setController(controller) {
    this.controller = controller;
  }

  getMenuDOM() {
    const DEFAULT_LIST_ITEM_ICON_CLASSES = ["fas", "fa-tasks"];

    const menu = document.createElement("div");
    menu.classList.add("menu");

    const list = document.createElement("ul");
    list.classList.add("flex-grow");

    let projects = this.model.getProjects();

    // Overview and projects
    for (let project of this.model.getProjects()) {
      let tasksAmount = this.calculateProjectTasksAmount(project);
      if (project.id === 0) {
        list.appendChild(
          this.getMenuItem(project, ["fa", "fa-home"])
        );
      } else {
        list.appendChild(
          this.getMenuItem(project, DEFAULT_LIST_ITEM_ICON_CLASSES)
        );
      }
    }

    const line = document.createElement("div");
    line.classList.add("line");
    list.appendChild(line);

    // Done
    const done = this.getMenuItem({ title: "Done", tasks: [] }, [
      "far",
      "fa-calendar-check",
    ]);
    list.appendChild(done);

    menu.appendChild(list);

    // Logs
    const pushBottom = document.createElement("ul");
    pushBottom.classList.add("push-bottom");

    const logsLink = document.createElement("a");
    logsLink.href = "#";
    logsLink.classList.add("menu-item");
    const logsLinkLi = document.createElement("li");
    logsLinkLi.innerHTML = `<i class='fa fa-cog'></i> Logs`;
    logsLink.appendChild(logsLinkLi);
    pushBottom.appendChild(logsLink);

    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.classList.add("menu-item");
    const logoutLinkLi = document.createElement("li");
    logoutLinkLi.innerHTML = `<i class='fa fa-sign-out-alt'></i> Log out`;
    logoutLink.appendChild(logoutLinkLi);
    pushBottom.appendChild(logoutLink);

    menu.appendChild(pushBottom);

    return menu;
  }

  calculateProjectTasksAmount(project) {
    return project.tasks.reduce((accumulator, currentValue, index) => {
      return accumulator + (currentValue.isComplete ? 0 : 1);
    }, 0);
  }

  getMenuItem(project, iconClassesArray) {
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("data-menu-index", project.id);
    link.classList.add("menu-item");
    if (this.model.getCurrentProjectId() === project.id) {
      link.classList.add("active");
    }

    const li = document.createElement("li");

    const flexRow = document.createElement("div");
    flexRow.classList.toggle("flex-row");

    const icon = document.createElement("i");
    icon.classList.add(...iconClassesArray);

    const menuItemText = document.createElement("div");
    menuItemText.classList.toggle("menu-item-text");

    if (project.tasks) {
      const todoTasks = this.calculateProjectTasksAmount(project);
      menuItemText.innerHTML = `${
        project.title
      } <p class='tasks-amount'>${todoTasks} ${
        todoTasks === 1 ? "Task" : "Tasks"
      }</p>`;
    }

    flexRow.appendChild(icon);
    flexRow.appendChild(menuItemText);
    li.appendChild(flexRow);
    link.appendChild(li);

    link.addEventListener("click", (e) => {
      e.preventDefault();
      // change project
      this.controller.changeCurrentProject(project.id);
    });

    return link;
  }
}

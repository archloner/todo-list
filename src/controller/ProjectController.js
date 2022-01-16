import { Model } from "../model/Model";

export class ProjectController {
  constructor() {
    this.model = new Model();
    this.projects = this.model.getData();
  }

  getProjectTasks(projectId) {
    // console.log(this.projects);
    // console.log(this.projects.filter((project) => project.id === projectId)[0].tasks);
    return this.projects.filter((project) => project.id === projectId)[0].tasks;
  }
}

export class Model {
  currentProject;
  projects;

  constructor() {
    this.currentProject = null;
    this.projects = [];
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }
}
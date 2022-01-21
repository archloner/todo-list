import { sampleData } from "./SampleData";

const DEFAULT_PROJECT_ID = 1;

export class Model {
  currentProject;
  projects;
  data;

  constructor() {
    this.data = sampleData;
    this.projects = this.data.projects;
    this.currentProject = this.getInitialProject();
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  setCurrentProjectId(projectId) {
    this.currentProject = this.projects.filter(
      (project) => project.id === projectId
    )[0];
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getData() {
    return this.data.projects;
  }

  getInitialProject() {
    return this.projects.filter(
      (project) => project.id === DEFAULT_PROJECT_ID
    )[0];
  }

  getTaskById(taskId) {
    // get task by id,
    // global tasks ids?
  }

  setTaskAsComplete(task) {
    task.isComplete = true;    
  }

  // debug() {
  //   const task = this.currentProject.tasks[0];
  //   console.log(this.currentProject.tasks)
  //   this.setTaskAsComplete(task);
  // }
}

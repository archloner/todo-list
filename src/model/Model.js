import { sampleData } from "./SampleData";

const DEFAULT_PROJECT_ID = 1;

export class Model {
  currentProject;
  currentProjectId;
  projects;
  data;

  constructor() {
    this.data = sampleData;
    this.projects = this.data.projects;
    this.currentProject = this.getInitialProject();
    this.currentProjectId = DEFAULT_PROJECT_ID;
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  setCurrentProjectId(projectId) {
    this.currentProject = this.projects.filter(
      (project) => project.id === projectId
    )[0];
    this.currentProjectId = projectId;
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getCurrentProjectId() {
    return this.currentProject.id;
  }

  getProjects() {
    return this.data.projects;
  }

  getData() {
    return this.data;
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

  addTask(task) {
    this.currentProject.tasks.unshift(task);
  }

  setTaskIsComplete(taskId, isComplete) {
    this.currentProject.tasks
      .filter((task) => task.id === taskId)
      .map((task) => (task.isComplete = isComplete));
  }
}

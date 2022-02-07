import { sampleData } from "./SampleData";

const DEFAULT_PROJECT_ID = 0;

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
    this.currentProjectId = parseInt(projectId);
    this.setCurrentProject(this.getProjectById(this.currentProjectId));
  }

  getCurrentProject() {
    return this.currentProject;
  }

  getCurrentProjectId() {
    return this.currentProjectId;
  }

  getProjects() {
    return this.data.projects;
  }

  getProjectById(projectId) {
    const project = this.data.projects.filter(
      (project) => project.id === projectId
    )[0];
    console.log(project);
    return project;
  }

  getProjectOverview() {
    let projects = [];
    this.data.projects.map((project) => {
      if (project.id !== 0) {
        projects.push({
          name: project.title,
          id: project.id,
          tasks: this.calculateTasks(project.tasks),
        });
      }
    });
    
    return projects;
  }

  getProjectsCount() {
    return this.getProjectOverview().length;
  }

  calculateTasks(tasks) {
    return tasks.reduce(
      (acc, current) => acc + (current.isComplete ? 0 : 1),
      0
    );
  }

  getData() {
    return this.data;
  }

  getInitialProject() {
    return this.projects.filter(
      (project) => project.id === DEFAULT_PROJECT_ID
    )[0];
  }

  setTaskAsComplete(task) {
    task.isComplete = true;
  }

  addTask(task) {
    this.currentProject.tasks.unshift(task);
  }

  setTaskIsComplete(taskId, isComplete) {
    let removeFrom;
    let addTo;
    if (isComplete === true) {
      removeFrom = this.currentProject.tasks;
      addTo = this.currentProject.done;
    } else {
      removeFrom = this.currentProject.done;
      addTo = this.currentProject.tasks;
    }

    const task = removeFrom.filter((task) => task.id === taskId)[0];
    task.isComplete = isComplete;

    const taskIndex = removeFrom.indexOf(task);

    // Move task from one array to other
    removeFrom.splice(taskIndex, 1);
    addTo.unshift(task);
  }
}
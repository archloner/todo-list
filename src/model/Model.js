import { sampleData } from "./SampleData";

export class Model {
  currentProject;
  projects;
  data;

  constructor() {
    this.currentProject = null;
    this.projects = [];
    this.data = sampleData;
    this.projects = this.data.projects;
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  getData() {
    return this.data.projects;
  }
}
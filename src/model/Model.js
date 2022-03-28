import { IDSupplier } from '../util/IDSupplier';
import { sampleData } from './SampleData';
import { AppConfig } from '../config/AppConfig';
import { emptyData } from './EmptyData';
import { Task } from '../entity/Task';

export default class Model {
  currentProject;

  currentProjectId;

  projects;

  data;

  projectIDSupplier;

  constructor() {
    this.data = sampleData;
    this.projects = this.data.projects;
    this.currentProjectId = AppConfig.DEFAULT_PROJECT_ID;
    this.projectIDSupplier = new IDSupplier();

    this.init();
  }

  init() {
    // Attempt to load from LocalStorage
    if (!this.retrieveFromLocalStorage()) {
      // Load defaults (config deciding if there should be sample data or not)
      console.log('LocalStorage empty!');
      if (AppConfig.LOAD_WITH_SAMPLE_DATA) {
        this.data = sampleData;
      } else {
        this.data = emptyData;
      }
      this.saveToLocalStorage();
    } else {
      console.log('Loaded data from LocalStorage');
    }

    // Determine project ID starting value
    if (this.projects && this.projects.length > 0) {
      const startingIdentifier = this.projects.length;
      this.projectIDSupplier.setStartingValue(startingIdentifier);
    }

    // set initial current project
    this.currentProject = this.getInitialProject();
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  setCurrentProjectId(projectId) {
    this.currentProject = this.projects.filter(
      (project) => project.id === projectId,
    )[0];
    this.currentProjectId = parseInt(projectId);
    this.setCurrentProject(this.getProjectById(this.currentProjectId));
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

  /* PROJECT */

  getProjectById(projectId) {
    projectId = parseInt(projectId);

    const project = this.data.projects.filter(
      (project) => project.id === projectId,
    )[0];
    if (project) {
      return project;
    }
    return -1;
  }

  getProjectOverview() {
    const projects = [];
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
      0,
    );
  }

  getInitialProject() {
    return this.projects.filter(
      (project) => project.id === AppConfig.DEFAULT_PROJECT_ID,
    )[0];
  }

  addProject(project) {
    project.id = this.projectIDSupplier.getID();
    this.projects.push(project);
    this.saveToLocalStorage();
  }

  deleteProjectById(id) {
    id = parseInt(id);
    if (this.currentProject.id === id) {
      this.setCurrentProject(this.getProjectById(AppConfig.DEFAULT_PROJECT_ID));
    }
    const project = this.getProjectById(id);
    if (project !== -1) {
      const projectIndex = this.projects.indexOf(project);
      // delete project and return true
      this.projects.splice(projectIndex, 1);
      this.saveToLocalStorage();
      return true;
    }
    console.error(`Project with id ${id} not found`);
    return false;
  }

  updateProject(updatedProject) {
    const project = this.getProjectById(updatedProject.id);
    if (project) {
      project.title = updatedProject.title;
      project.description = updatedProject.description;
      this.saveToLocalStorage();
    } else {
      console.error('Project not found');
    }
  }

  /* TASK */

  getTaskById(id) {
    id = parseInt(id);
    const task = this.currentProject.tasks.filter((task) => task.id === id)[0];
    if (task) {
      return task;
    }
    const doneTask = this.currentProject.done.filter(
      (task) => task.id === id,
    )[0];
    if (doneTask) {
      return doneTask;
    }
    console.error('Model.getTaskById(): Done task not found');
  }

  setTaskAsComplete(task) {
    task.isComplete = true;
    this.saveToLocalStorage();
  }

  addTask(task) {
    this.currentProject.tasks.unshift(task);
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
  }

  deleteTaskById(id) {
    const task = this.getTaskById(id);
    if (task) {
      const index = this.currentProject.tasks.indexOf(task);
      if (index !== -1) {
        this.currentProject.tasks.splice(index, 1);
        console.log('task deleted');
      } else {
        const doneIndex = this.currentProject.done.indexOf(task);
        if (doneIndex != -1) {
          this.currentProject.done.splice(doneIndex, 1);
          console.log('done task deleted');
        }
      }
      this.saveToLocalStorage();
    }
  }

  updateTask(task) {
    const taskId = task.id;
    if (taskId) {
      let taskIndex = -1;
      for (let i = 0; i < this.currentProject.tasks.length; i++) {
        if (this.currentProject.tasks[i].id === taskId) {
          taskIndex = i;
        }
      }
      if (taskIndex !== -1) {
        this.currentProject.tasks.splice(taskIndex, 1, task);
      } else {
        for (let i = 0; i < this.currentProject.done.length; i++) {
          if (this.currentProject.done[i].id === taskId) {
            taskIndex = i;
            task.isComplete = true;
          }
        }
        this.currentProject.done.splice(taskIndex, 1, task);
      }
      this.saveToLocalStorage();
    }
  }

  /* LOCALSTORAGE */

  saveToLocalStorage() {
    localStorage.setItem(
      AppConfig.LOCAL_STORAGE_KEY,
      JSON.stringify(this.data),
    );
    console.log('Saved to localStorage');
  }

  retrieveFromLocalStorage() {
    const retrieved = localStorage.getItem(AppConfig.LOCAL_STORAGE_KEY);
    if (retrieved) {
      const data = JSON.parse(retrieved);
      // restore functions in Task objects
      this.restoreTaskMethods(data);
      this.data = data;
      this.projects = this.data.projects;
      return true;
    }
    return false;
  }

  clearLocalStorage() {
    localStorage.removeItem(AppConfig.LOCAL_STORAGE_KEY);
  }

  restoreTaskMethods(data) {
    for (const project of data.projects) {
      if (project.id === 0) {
        continue;
      }

      // tasks
      for (let task of project.tasks) {
        task = Object.setPrototypeOf(task, Task.prototype);
        task.dueDate = new Date(task.dueDate);
        task.createdDate = new Date(task.createdDate);
      }
      // done
      for (let task of project.done) {
        task = Object.setPrototypeOf(task, Task.prototype);
        task.dueDate = new Date(task.dueDate);
        task.createdDate = new Date(task.createdDate);
      }
    }
  }
}

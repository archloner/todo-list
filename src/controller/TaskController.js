import { ProjectController } from './ProjectController';

// export class TaskController {
//   projectController;
//   tasks;
//   projects;

//   constructor() {
//     this.tasks = [];
//     this.projectController = new ProjectController();
//   }

//   createTask(title, description, priority, dueDate) {
//     console.log('Creating new task', title, description, priority, dueDate);
//   }

//   getProjectTasks(projectId) {
//     // console.log(this.projectController.getProjectTasks(1))
//     return this.projectController.getProjectTasks(projectId);
//     return this.projects.filter((project) => project.id === projectId).tasks;
//   }

//   setProjectTasks(projectId) {
//     this.tasks = this.getProjectTasks(projectId);
//   }

//   markTaskAsComplete(taskId) {
//     let task = this.tasks.filter((task) => task.id === taskId);
//     task.markComplete();
//     // move to complete/done section?
//   }
// }
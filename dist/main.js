/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/Model */ "./src/model/Model.js");
/* harmony import */ var _controller_DisplayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/DisplayController */ "./src/controller/DisplayController.js");
/* harmony import */ var _view_SingleProjectView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/SingleProjectView */ "./src/view/SingleProjectView.js");




class App {
  model;
  controller;
  view;

  constructor() {
    this.model = new _model_Model__WEBPACK_IMPORTED_MODULE_0__.Model();
    this.controller = new _controller_DisplayController__WEBPACK_IMPORTED_MODULE_1__.DisplayController();
    this.view = new _view_SingleProjectView__WEBPACK_IMPORTED_MODULE_2__.SingleProjectView();
  }

  init() {
    this.controller.init();
  }

  start() {}
}

/***/ }),

/***/ "./src/controller/DisplayController.js":
/*!*********************************************!*\
  !*** ./src/controller/DisplayController.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayController": () => (/* binding */ DisplayController)
/* harmony export */ });
/* harmony import */ var _TaskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskController */ "./src/controller/TaskController.js");


class DisplayController {
  content;
  taskController;

  constructor() {
    this.content = document.querySelector(".wrapper");
    this.taskController = new _TaskController__WEBPACK_IMPORTED_MODULE_0__.TaskController();
  }

  init() {
    this.attachEventListeners();
    console.log(this.taskController.getProjectTasks(1));
    // view.render(project)
  }

  attachEventListeners() {
    // Showing and hiding task details
    this.addTaskDetailsToggleEventListeners();
    this.addExpandHideAllEventListener();
    // New Task modal show button and close
    this.addShowNewTaskModalEventListener();
    this.addHideNewTaskModalEventListener();
    this.addNewTaskSubmitListener();
    this.addDeleteTaskListener();
  }

  addTaskDetailsToggleEventListeners() {
    const buttons = document.querySelectorAll(".task-menu .fa-chevron-down");
    for (let button of buttons) {
      button.addEventListener("click", (e) => {
        const icon = e.target;
        const task = icon.parentNode.parentNode;
        this.toggleTaskDetails(task);
      });
    }
  }

  toggleTaskDetails(taskElement) {
    if (taskElement) {
      const details = taskElement.querySelector(".task-details");
      details.classList.toggle("hide");

      const icon = taskElement.querySelector(".icon");
      icon.classList.toggle("fa-chevron-up");
      icon.classList.toggle("fa-chevron-down");
    }
  }

  addExpandHideAllEventListener() {
    const TEXT_CONTENT_TO_EXPAND = "Expand all";
    // Initial state is to expand
    const btn = document.querySelector("#expand-all-hide-all-span");
    btn.addEventListener("click", (e) => {
      const tasks = document.querySelectorAll(".task");
      if (tasks) {
        if (new String(btn.innerText.trim()).includes(TEXT_CONTENT_TO_EXPAND)) {
          for (let task of tasks) {
            this.showTaskDetails(task);
          }
          btn.textContent = "Collapse all";
        } else {
          for (let task of tasks) {
            this.hideTaskDetails(task);
          }
          btn.textContent = TEXT_CONTENT_TO_EXPAND;
        }
      }
    });
  }

  showTaskDetails(task) {
    const taskDetailsToShow = task.querySelector(".task-details");
    taskDetailsToShow.classList.remove("hide");
    const chevron = task.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-down");
    chevron.classList.add("fa-chevron-up");
  }

  hideTaskDetails(task) {
    const taskDetailsToShow = task.querySelector(".task-details");
    taskDetailsToShow.classList.add("hide");
    const chevron = task.querySelector(".task-menu .icon");
    chevron.classList.remove("fa-chevron-up");
    chevron.classList.add("fa-chevron-down");
  }

  addShowNewTaskModalEventListener() {
    const btn = document.querySelector(".new-task-btn");
    const modalWrapper = document.querySelector("#new-task-modal-wrapper");
    btn.addEventListener("click", (e) => {
      this.showNewTaskModal(modalWrapper);
    });
  }

  showNewTaskModal(modalWrapper) {
    this.resetModalForm();
    modalWrapper.classList.remove("hide");
  }

  resetModalForm() {
    const form = document.querySelector(".new-task-modal .form-row form");
    form.reset();
  }

  addHideNewTaskModalEventListener() {
    const wrapper = document.querySelector("#new-task-modal-wrapper");
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("modal-wrapper")) {
        this.animateModalClosing();
      }
    });

    const closeBtn = document.querySelector(".modal-wrapper .close-btn");
    closeBtn.addEventListener("click", (e) => {
      this.animateModalClosing();
    });
  }

  animateModalClosing() {
    const ANIMATION_DURATION_TIME = 600;

    const wrapper = document.querySelector("#new-task-modal-wrapper");
    const modal = wrapper.querySelector(".new-task-modal");

    modal.classList.add("modal-dissmis-animation");
    wrapper.classList.remove("wrapper-fade-in-animation");
    wrapper.classList.add("wrapper-fade-out-animation");
    setTimeout(() => {
      wrapper.classList.add("hide");
      modal.classList.remove("modal-dissmis-animation");
      wrapper.classList.remove("wrapper-fade-out-animation");
      wrapper.classList.add("wrapper-fade-in-animation");
    }, ANIMATION_DURATION_TIME);
  }

  addNewTaskSubmitListener() {
    const btn = document.querySelector("#new-task-submit");
    btn.addEventListener("click", (e) => {
      this.submitNewTaskModal();
      this.animateModalClosing();
    });
  }

  submitNewTaskModal() {
    console.log("New task submited!");
  }

  addDeleteTaskListener() {
    const btns = document.querySelectorAll('.task-menu .delete');
    for (let btn of btns) {
      const task = btn.parentElement.parentElement.parentElement;
      const taskId = task.getAttribute('data-index');
      btn.addEventListener('click', this.handleDeleteTask.bind(this, taskId));
    }
  }

  handleDeleteTask(taskId) {
    console.log('delete task with id ' + taskId);
    // this.confirmTaskDelete();
  }
}


/***/ }),

/***/ "./src/controller/ProjectController.js":
/*!*********************************************!*\
  !*** ./src/controller/ProjectController.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectController": () => (/* binding */ ProjectController)
/* harmony export */ });
/* harmony import */ var _model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Model */ "./src/model/Model.js");


class ProjectController {
  constructor() {
    this.model = new _model_Model__WEBPACK_IMPORTED_MODULE_0__.Model();
    this.projects = this.model.getData();
  }

  getProjectTasks(projectId) {
    // console.log(this.projects);
    // console.log(this.projects.filter((project) => project.id === projectId)[0].tasks);
    return this.projects.filter((project) => project.id === projectId)[0].tasks;
  }
}


/***/ }),

/***/ "./src/controller/TaskController.js":
/*!******************************************!*\
  !*** ./src/controller/TaskController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskController": () => (/* binding */ TaskController)
/* harmony export */ });
/* harmony import */ var _ProjectController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectController */ "./src/controller/ProjectController.js");


class TaskController {
  projectController;
  tasks;
  projects;

  constructor() {
    this.tasks = [];
    this.projectController = new _ProjectController__WEBPACK_IMPORTED_MODULE_0__.ProjectController();
  }

  createTask(title, description, priority, dueDate) {
    console.log('Creating new task', title, description, priority, dueDate);
  }

  getProjectTasks(projectId) {
    // console.log(this.projectController.getProjectTasks(1))
    return this.projectController.getProjectTasks(projectId);
    return this.projects.filter((project) => project.id === projectId).tasks;
  }

  setProjectTasks(projectId) {
    this.tasks = this.getProjectTasks(projectId);
  }

  markTaskAsComplete(taskId) {
    let task = this.tasks.filter((task) => task.id === taskId);
    task.markComplete();
    // move to complete/done section?
  }
}

/***/ }),

/***/ "./src/entity/PriorityType.js":
/*!************************************!*\
  !*** ./src/entity/PriorityType.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorityType": () => (/* binding */ PriorityType)
/* harmony export */ });
class PriorityType {
  static LOW = 'low';
  static MEDIUM = 'medium';
  static HIGH = 'high';
  static DEFAULT = 'default';
}

/***/ }),

/***/ "./src/entity/Task.js":
/*!****************************!*\
  !*** ./src/entity/Task.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _util_IndexSupplier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/IndexSupplier */ "./src/util/IndexSupplier.js");
// export const sampleTask = {
//   createdDate: new Date(),
//   title: 'Sample task',
//   description: 'More informations about new task',
//   dueDate: new Date(),
//   priority: PriorityType.HIGH,
//   notes: '?',
//   checklist: '?',
//   log: []
// }



class Task {
  createdDate;
  title;
  description;
  dueDate;
  priority;
  isComplete;
  log;
  // optional?
  notes;
  checklist;

  constructor(title, description, dueDate, priority) {
    this.id = _util_IndexSupplier__WEBPACK_IMPORTED_MODULE_0__.IndexSupplier.nextIndex();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdDate = new Date();
    this.isComplete = false;
    this.notes = null;
    this.checklist = [];
    this.log = [];
  }

  isComplete() {
    return isComplete === true;
  }

  markAsComplete() {
    this.isComplete = true;
  }

  markAsNotComplete() {
    this.isComplete = false;
  }

}

/***/ }),

/***/ "./src/model/Model.js":
/*!****************************!*\
  !*** ./src/model/Model.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _SampleData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SampleData */ "./src/model/SampleData.js");


class Model {
  currentProject;
  projects;
  data;

  constructor() {
    this.currentProject = null;
    this.projects = [];
    this.data = _SampleData__WEBPACK_IMPORTED_MODULE_0__.sampleData;
    this.projects = this.data.projects;
  }

  setCurrentProject(project) {
    this.currentProject = project;
  }

  getData() {
    return this.data.projects;
  }
}

/***/ }),

/***/ "./src/model/SampleData.js":
/*!*********************************!*\
  !*** ./src/model/SampleData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sampleData": () => (/* binding */ sampleData)
/* harmony export */ });
/* harmony import */ var _entity_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/Task */ "./src/entity/Task.js");
/* harmony import */ var _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entity/PriorityType */ "./src/entity/PriorityType.js");



// constructor(title, description, dueDate, priority)
const sampleData = {
  projects: [
    {
      id: 1,
      title: "Website development",
      tasks: [
        new _entity_Task__WEBPACK_IMPORTED_MODULE_0__.Task(
          "Update about page header",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 20),
          _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__.PriorityType.DEFAULT
        ),
        new _entity_Task__WEBPACK_IMPORTED_MODULE_0__.Task(
          "About page wording",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 22),
          _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__.PriorityType.HIGH
        ),
        new _entity_Task__WEBPACK_IMPORTED_MODULE_0__.Task(
          "New landing page layout",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 17),
          _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__.PriorityType.MEDIUM
        ),
        new _entity_Task__WEBPACK_IMPORTED_MODULE_0__.Task(
          "Update global iconset",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 27),
          _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__.PriorityType.LOW
        ),
        new _entity_Task__WEBPACK_IMPORTED_MODULE_0__.Task(
          "New case study thumbnails",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 28),
          _entity_PriorityType__WEBPACK_IMPORTED_MODULE_1__.PriorityType.DEFAULT
        ),
      ],
    },
    {
      id: 2,
      title: 'Groceries',
      tasks: [],
    }
  ],
};


/***/ }),

/***/ "./src/util/IndexSupplier.js":
/*!***********************************!*\
  !*** ./src/util/IndexSupplier.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexSupplier": () => (/* binding */ IndexSupplier)
/* harmony export */ });
class IndexSupplier {
  static startingIndex = 0;

  // static?
  // constructor() {
  //   this.startingIndex = 0;
  // }

  // constructor(startingIndex) {
  //   this.startingIndex = startingIndex;
  // }

  static nextIndex() {
    return this.startingIndex++;
  }

  static reset() {
    this.startingIndex = 0;
  }

}

/***/ }),

/***/ "./src/view/SingleProjectView.js":
/*!***************************************!*\
  !*** ./src/view/SingleProjectView.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SingleProjectView": () => (/* binding */ SingleProjectView)
/* harmony export */ });
class SingleProjectView {

  constructor() {}
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");


let app = new _App__WEBPACK_IMPORTED_MODULE_0__.App();
app.init();
app.start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5QjtBQUNBLFlBQVksOENBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtRUFBaUI7QUFDM0I7QUFDQSxZQUFZLDhDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLFVBQVUscUVBQW1CO0FBQzdCO0FBQ0EsWUFBWSw4Q0FBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxVQUFVLGtFQUFnQjtBQUMxQjtBQUNBLFlBQVksOENBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsVUFBVSxzRUFBb0I7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaERPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDcEJPOztBQUVQO0FBQ0E7Ozs7OztVQ0hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEI7O0FBRTVCLGNBQWMscUNBQUc7QUFDakI7QUFDQSxZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlci9EaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlci9Qcm9qZWN0Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlci9UYXNrQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZW50aXR5L1ByaW9yaXR5VHlwZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZW50aXR5L1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVsL01vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbC9TYW1wbGVEYXRhLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91dGlsL0luZGV4U3VwcGxpZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3ZpZXcvU2luZ2xlUHJvamVjdFZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9Nb2RlbCc7XG5pbXBvcnQgeyBEaXNwbGF5Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci9EaXNwbGF5Q29udHJvbGxlcic7XG5pbXBvcnQgeyBTaW5nbGVQcm9qZWN0VmlldyB9IGZyb20gJy4vdmlldy9TaW5nbGVQcm9qZWN0Vmlldyc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBtb2RlbDtcbiAgY29udHJvbGxlcjtcbiAgdmlldztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgdGhpcy5jb250cm9sbGVyID0gbmV3IERpc3BsYXlDb250cm9sbGVyKCk7XG4gICAgdGhpcy52aWV3ID0gbmV3IFNpbmdsZVByb2plY3RWaWV3KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29udHJvbGxlci5pbml0KCk7XG4gIH1cblxuICBzdGFydCgpIHt9XG59IiwiaW1wb3J0IHsgVGFza0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9UYXNrQ29udHJvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgRGlzcGxheUNvbnRyb2xsZXIge1xuICBjb250ZW50O1xuICB0YXNrQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndyYXBwZXJcIik7XG4gICAgdGhpcy50YXNrQ29udHJvbGxlciA9IG5ldyBUYXNrQ29udHJvbGxlcigpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmF0dGFjaEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgY29uc29sZS5sb2codGhpcy50YXNrQ29udHJvbGxlci5nZXRQcm9qZWN0VGFza3MoMSkpO1xuICAgIC8vIHZpZXcucmVuZGVyKHByb2plY3QpXG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBTaG93aW5nIGFuZCBoaWRpbmcgdGFzayBkZXRhaWxzXG4gICAgdGhpcy5hZGRUYXNrRGV0YWlsc1RvZ2dsZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5hZGRFeHBhbmRIaWRlQWxsRXZlbnRMaXN0ZW5lcigpO1xuICAgIC8vIE5ldyBUYXNrIG1vZGFsIHNob3cgYnV0dG9uIGFuZCBjbG9zZVxuICAgIHRoaXMuYWRkU2hvd05ld1Rhc2tNb2RhbEV2ZW50TGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZEhpZGVOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGROZXdUYXNrU3VibWl0TGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZERlbGV0ZVRhc2tMaXN0ZW5lcigpO1xuICB9XG5cbiAgYWRkVGFza0RldGFpbHNUb2dnbGVFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLW1lbnUgLmZhLWNoZXZyb24tZG93blwiKTtcbiAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpY29uID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBpY29uLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgdGhpcy50b2dnbGVUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRhc2tEZXRhaWxzKHRhc2tFbGVtZW50KSB7XG4gICAgaWYgKHRhc2tFbGVtZW50KSB7XG4gICAgICBjb25zdCBkZXRhaWxzID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHNcIik7XG4gICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXG4gICAgICBjb25zdCBpY29uID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uXCIpO1xuICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtY2hldnJvbi11cFwiKTtcbiAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLWNoZXZyb24tZG93blwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRFeHBhbmRIaWRlQWxsRXZlbnRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBURVhUX0NPTlRFTlRfVE9fRVhQQU5EID0gXCJFeHBhbmQgYWxsXCI7XG4gICAgLy8gSW5pdGlhbCBzdGF0ZSBpcyB0byBleHBhbmRcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4cGFuZC1hbGwtaGlkZS1hbGwtc3BhblwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcbiAgICAgIGlmICh0YXNrcykge1xuICAgICAgICBpZiAobmV3IFN0cmluZyhidG4uaW5uZXJUZXh0LnRyaW0oKSkuaW5jbHVkZXMoVEVYVF9DT05URU5UX1RPX0VYUEFORCkpIHtcbiAgICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJDb2xsYXBzZSBhbGxcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gVEVYVF9DT05URU5UX1RPX0VYUEFORDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd1Rhc2tEZXRhaWxzKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGV0YWlsc1RvU2hvdyA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHNcIik7XG4gICAgdGFza0RldGFpbHNUb1Nob3cuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgY29uc3QgY2hldnJvbiA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW1lbnUgLmljb25cIik7XG4gICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtY2hldnJvbi1kb3duXCIpO1xuICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZChcImZhLWNoZXZyb24tdXBcIik7XG4gIH1cblxuICBoaWRlVGFza0RldGFpbHModGFzaykge1xuICAgIGNvbnN0IHRhc2tEZXRhaWxzVG9TaG93ID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsc1wiKTtcbiAgICB0YXNrRGV0YWlsc1RvU2hvdy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBjb25zdCBjaGV2cm9uID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbWVudSAuaWNvblwiKTtcbiAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1jaGV2cm9uLXVwXCIpO1xuICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZChcImZhLWNoZXZyb24tZG93blwiKTtcbiAgfVxuXG4gIGFkZFNob3dOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stYnRuXCIpO1xuICAgIGNvbnN0IG1vZGFsV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXRhc2stbW9kYWwtd3JhcHBlclwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLnNob3dOZXdUYXNrTW9kYWwobW9kYWxXcmFwcGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dOZXdUYXNrTW9kYWwobW9kYWxXcmFwcGVyKSB7XG4gICAgdGhpcy5yZXNldE1vZGFsRm9ybSgpO1xuICAgIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgfVxuXG4gIHJlc2V0TW9kYWxGb3JtKCkge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLW1vZGFsIC5mb3JtLXJvdyBmb3JtXCIpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfVxuXG4gIGFkZEhpZGVOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLW1vZGFsLXdyYXBwZXJcIik7XG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtd3JhcHBlclwiKSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVNb2RhbENsb3NpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC13cmFwcGVyIC5jbG9zZS1idG5cIik7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGVNb2RhbENsb3NpbmcoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVNb2RhbENsb3NpbmcoKSB7XG4gICAgY29uc3QgQU5JTUFUSU9OX0RVUkFUSU9OX1RJTUUgPSA2MDA7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFzay1tb2RhbC13cmFwcGVyXCIpO1xuICAgIGNvbnN0IG1vZGFsID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLW1vZGFsXCIpO1xuXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWRpc3NtaXMtYW5pbWF0aW9uXCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcIndyYXBwZXItZmFkZS1pbi1hbmltYXRpb25cIik7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwid3JhcHBlci1mYWRlLW91dC1hbmltYXRpb25cIik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWRpc3NtaXMtYW5pbWF0aW9uXCIpO1xuICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwid3JhcHBlci1mYWRlLW91dC1hbmltYXRpb25cIik7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ3cmFwcGVyLWZhZGUtaW4tYW5pbWF0aW9uXCIpO1xuICAgIH0sIEFOSU1BVElPTl9EVVJBVElPTl9USU1FKTtcbiAgfVxuXG4gIGFkZE5ld1Rhc2tTdWJtaXRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLXN1Ym1pdFwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLnN1Ym1pdE5ld1Rhc2tNb2RhbCgpO1xuICAgICAgdGhpcy5hbmltYXRlTW9kYWxDbG9zaW5nKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXROZXdUYXNrTW9kYWwoKSB7XG4gICAgY29uc29sZS5sb2coXCJOZXcgdGFzayBzdWJtaXRlZCFcIik7XG4gIH1cblxuICBhZGREZWxldGVUYXNrTGlzdGVuZXIoKSB7XG4gICAgY29uc3QgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLW1lbnUgLmRlbGV0ZScpO1xuICAgIGZvciAobGV0IGJ0biBvZiBidG5zKSB7XG4gICAgICBjb25zdCB0YXNrID0gYnRuLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgdGFza0lkID0gdGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlRGVsZXRlVGFzay5iaW5kKHRoaXMsIHRhc2tJZCkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURlbGV0ZVRhc2sodGFza0lkKSB7XG4gICAgY29uc29sZS5sb2coJ2RlbGV0ZSB0YXNrIHdpdGggaWQgJyArIHRhc2tJZCk7XG4gICAgLy8gdGhpcy5jb25maXJtVGFza0RlbGV0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9Nb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMubW9kZWwuZ2V0RGF0YSgpO1xuICB9XG5cbiAgZ2V0UHJvamVjdFRhc2tzKHByb2plY3RJZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpWzBdLnRhc2tzKTtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZClbMF0udGFza3M7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi9Qcm9qZWN0Q29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ29udHJvbGxlciB7XG4gIHByb2plY3RDb250cm9sbGVyO1xuICB0YXNrcztcbiAgcHJvamVjdHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIHRoaXMucHJvamVjdENvbnRyb2xsZXIgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKCdDcmVhdGluZyBuZXcgdGFzaycsIHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpO1xuICB9XG5cbiAgZ2V0UHJvamVjdFRhc2tzKHByb2plY3RJZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdENvbnRyb2xsZXIuZ2V0UHJvamVjdFRhc2tzKDEpKVxuICAgIHJldHVybiB0aGlzLnByb2plY3RDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhwcm9qZWN0SWQpO1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKS50YXNrcztcbiAgfVxuXG4gIHNldFByb2plY3RUYXNrcyhwcm9qZWN0SWQpIHtcbiAgICB0aGlzLnRhc2tzID0gdGhpcy5nZXRQcm9qZWN0VGFza3MocHJvamVjdElkKTtcbiAgfVxuXG4gIG1hcmtUYXNrQXNDb21wbGV0ZSh0YXNrSWQpIHtcbiAgICBsZXQgdGFzayA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkID09PSB0YXNrSWQpO1xuICAgIHRhc2subWFya0NvbXBsZXRlKCk7XG4gICAgLy8gbW92ZSB0byBjb21wbGV0ZS9kb25lIHNlY3Rpb24/XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgUHJpb3JpdHlUeXBlIHtcbiAgc3RhdGljIExPVyA9ICdsb3cnO1xuICBzdGF0aWMgTUVESVVNID0gJ21lZGl1bSc7XG4gIHN0YXRpYyBISUdIID0gJ2hpZ2gnO1xuICBzdGF0aWMgREVGQVVMVCA9ICdkZWZhdWx0Jztcbn0iLCIvLyBleHBvcnQgY29uc3Qgc2FtcGxlVGFzayA9IHtcbi8vICAgY3JlYXRlZERhdGU6IG5ldyBEYXRlKCksXG4vLyAgIHRpdGxlOiAnU2FtcGxlIHRhc2snLFxuLy8gICBkZXNjcmlwdGlvbjogJ01vcmUgaW5mb3JtYXRpb25zIGFib3V0IG5ldyB0YXNrJyxcbi8vICAgZHVlRGF0ZTogbmV3IERhdGUoKSxcbi8vICAgcHJpb3JpdHk6IFByaW9yaXR5VHlwZS5ISUdILFxuLy8gICBub3RlczogJz8nLFxuLy8gICBjaGVja2xpc3Q6ICc/Jyxcbi8vICAgbG9nOiBbXVxuLy8gfVxuXG5pbXBvcnQgeyBJbmRleFN1cHBsaWVyIH0gZnJvbSBcIi4uL3V0aWwvSW5kZXhTdXBwbGllclwiO1xuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gIGNyZWF0ZWREYXRlO1xuICB0aXRsZTtcbiAgZGVzY3JpcHRpb247XG4gIGR1ZURhdGU7XG4gIHByaW9yaXR5O1xuICBpc0NvbXBsZXRlO1xuICBsb2c7XG4gIC8vIG9wdGlvbmFsP1xuICBub3RlcztcbiAgY2hlY2tsaXN0O1xuXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLmlkID0gSW5kZXhTdXBwbGllci5uZXh0SW5kZXgoKTtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY3JlYXRlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMubm90ZXMgPSBudWxsO1xuICAgIHRoaXMuY2hlY2tsaXN0ID0gW107XG4gICAgdGhpcy5sb2cgPSBbXTtcbiAgfVxuXG4gIGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIGlzQ29tcGxldGUgPT09IHRydWU7XG4gIH1cblxuICBtYXJrQXNDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSB0cnVlO1xuICB9XG5cbiAgbWFya0FzTm90Q29tcGxldGUoKSB7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gIH1cblxufSIsImltcG9ydCB7IHNhbXBsZURhdGEgfSBmcm9tIFwiLi9TYW1wbGVEYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG4gIGN1cnJlbnRQcm9qZWN0O1xuICBwcm9qZWN0cztcbiAgZGF0YTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gbnVsbDtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgdGhpcy5kYXRhID0gc2FtcGxlRGF0YTtcbiAgICB0aGlzLnByb2plY3RzID0gdGhpcy5kYXRhLnByb2plY3RzO1xuICB9XG5cbiAgc2V0Q3VycmVudFByb2plY3QocHJvamVjdCkge1xuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnByb2plY3RzO1xuICB9XG59IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9lbnRpdHkvVGFza1wiO1xuaW1wb3J0IHsgUHJpb3JpdHlUeXBlIH0gZnJvbSBcIi4uL2VudGl0eS9Qcmlvcml0eVR5cGVcIjtcblxuLy8gY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSlcbmV4cG9ydCBjb25zdCBzYW1wbGVEYXRhID0ge1xuICBwcm9qZWN0czogW1xuICAgIHtcbiAgICAgIGlkOiAxLFxuICAgICAgdGl0bGU6IFwiV2Vic2l0ZSBkZXZlbG9wbWVudFwiLFxuICAgICAgdGFza3M6IFtcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgXCJVcGRhdGUgYWJvdXQgcGFnZSBoZWFkZXJcIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIixcbiAgICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxLCAyMCksXG4gICAgICAgICAgUHJpb3JpdHlUeXBlLkRFRkFVTFRcbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgXCJBYm91dCBwYWdlIHdvcmRpbmdcIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIixcbiAgICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxLCAyMiksXG4gICAgICAgICAgUHJpb3JpdHlUeXBlLkhJR0hcbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgXCJOZXcgbGFuZGluZyBwYWdlIGxheW91dFwiLFxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdFwiLFxuICAgICAgICAgIG5ldyBEYXRlKDIwMjIsIDEsIDE3KSxcbiAgICAgICAgICBQcmlvcml0eVR5cGUuTUVESVVNXG4gICAgICAgICksXG4gICAgICAgIG5ldyBUYXNrKFxuICAgICAgICAgIFwiVXBkYXRlIGdsb2JhbCBpY29uc2V0XCIsXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0XCIsXG4gICAgICAgICAgbmV3IERhdGUoMjAyMiwgMSwgMjcpLFxuICAgICAgICAgIFByaW9yaXR5VHlwZS5MT1dcbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgXCJOZXcgY2FzZSBzdHVkeSB0aHVtYm5haWxzXCIsXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0XCIsXG4gICAgICAgICAgbmV3IERhdGUoMjAyMiwgMSwgMjgpLFxuICAgICAgICAgIFByaW9yaXR5VHlwZS5ERUZBVUxUXG4gICAgICAgICksXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0aXRsZTogJ0dyb2NlcmllcycsXG4gICAgICB0YXNrczogW10sXG4gICAgfVxuICBdLFxufTtcbiIsImV4cG9ydCBjbGFzcyBJbmRleFN1cHBsaWVyIHtcbiAgc3RhdGljIHN0YXJ0aW5nSW5kZXggPSAwO1xuXG4gIC8vIHN0YXRpYz9cbiAgLy8gY29uc3RydWN0b3IoKSB7XG4gIC8vICAgdGhpcy5zdGFydGluZ0luZGV4ID0gMDtcbiAgLy8gfVxuXG4gIC8vIGNvbnN0cnVjdG9yKHN0YXJ0aW5nSW5kZXgpIHtcbiAgLy8gICB0aGlzLnN0YXJ0aW5nSW5kZXggPSBzdGFydGluZ0luZGV4O1xuICAvLyB9XG5cbiAgc3RhdGljIG5leHRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydGluZ0luZGV4Kys7XG4gIH1cblxuICBzdGF0aWMgcmVzZXQoKSB7XG4gICAgdGhpcy5zdGFydGluZ0luZGV4ID0gMDtcbiAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFNpbmdsZVByb2plY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHAgfSBmcm9tICcuL0FwcCc7XG5cbmxldCBhcHAgPSBuZXcgQXBwKCk7XG5hcHAuaW5pdCgpO1xuYXBwLnN0YXJ0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
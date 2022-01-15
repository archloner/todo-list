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
class DisplayController {
  content;

  constructor() {
    this.content = document.querySelector('.wrapper');
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Showing and hiding task details
    this.addTaskDetailsToggleEventListeners();
    this.addExpandHideAllEventListener();
    // New Task modal show button and close
    this.addShowNewTaskModalEventListener();
    this.addHideNewTaskModalEventListener();
    this.addNewTaskSubmitListener();
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
          btn.textContent = "Hide all";
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
    const btn = document.querySelector('.new-task-btn');
    const modalWrapper = document.querySelector('#new-task-modal-wrapper');
    btn.addEventListener('click', (e) => {
      this.showNewTaskModal(modalWrapper);
    })
  }

  showNewTaskModal(modalWrapper) {
    this.resetModalForm();
    modalWrapper.classList.remove('hide');
  }

  resetModalForm() {
    const form = document.querySelector('.new-task-modal .form-row form');
    form.reset();
  }

  addHideNewTaskModalEventListener() {
    const wrapper = document.querySelector('#new-task-modal-wrapper');
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.classList.contains('modal-wrapper')) {
        this.animateModalClosing();
      }
    });

    const closeBtn = document.querySelector('.modal-wrapper .close-btn');
    closeBtn.addEventListener('click', (e) => {
      this.animateModalClosing();
    });
  }

  animateModalClosing() {
    const ANIMATION_DURATION_TIME = 600;
    
    const wrapper = document.querySelector('#new-task-modal-wrapper');
    const modal = wrapper.querySelector('.new-task-modal')

    modal.classList.add('modal-dissmis-animation');
    wrapper.classList.remove('wrapper-fade-in-animation');
    wrapper.classList.add('wrapper-fade-out-animation');
    setTimeout(() => {
      wrapper.classList.add('hide');
      modal.classList.remove('modal-dissmis-animation');
      wrapper.classList.remove('wrapper-fade-out-animation');
      wrapper.classList.add('wrapper-fade-in-animation');
    }, ANIMATION_DURATION_TIME);
  }

  addNewTaskSubmitListener() {
    const btn = document.querySelector('#new-task-submit');
    btn.addEventListener('click', (e) => {
      this.submitNewTaskModal();
      this.animateModalClosing();
    });
  }

  submitNewTaskModal() {
    console.log('New task submited!');
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
class Model {
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


console.log('test')

let app = new _App__WEBPACK_IMPORTED_MODULE_0__.App();
app.init();
app.start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzQztBQUM2QjtBQUNOOztBQUV0RDtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQiwrQ0FBSztBQUMxQiwwQkFBMEIsNEVBQWlCO0FBQzNDLG9CQUFvQixzRUFBaUI7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDcEJPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0lPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNaTzs7QUFFUDtBQUNBOzs7Ozs7VUNIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjRCOztBQUU1Qjs7QUFFQSxjQUFjLHFDQUFHO0FBQ2pCO0FBQ0EsWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbnRyb2xsZXIvRGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVsL01vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3L1NpbmdsZVByb2plY3RWaWV3LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4vbW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgRGlzcGxheUNvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIvRGlzcGxheUNvbnRyb2xsZXInO1xuaW1wb3J0IHsgU2luZ2xlUHJvamVjdFZpZXcgfSBmcm9tICcuL3ZpZXcvU2luZ2xlUHJvamVjdFZpZXcnO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgbW9kZWw7XG4gIGNvbnRyb2xsZXI7XG4gIHZpZXc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBEaXNwbGF5Q29udHJvbGxlcigpO1xuICAgIHRoaXMudmlldyA9IG5ldyBTaW5nbGVQcm9qZWN0VmlldygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIuaW5pdCgpO1xuICB9XG5cbiAgc3RhcnQoKSB7fVxufSIsImV4cG9ydCBjbGFzcyBEaXNwbGF5Q29udHJvbGxlciB7XG4gIGNvbnRlbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hdHRhY2hFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gU2hvd2luZyBhbmQgaGlkaW5nIHRhc2sgZGV0YWlsc1xuICAgIHRoaXMuYWRkVGFza0RldGFpbHNUb2dnbGVFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuYWRkRXhwYW5kSGlkZUFsbEV2ZW50TGlzdGVuZXIoKTtcbiAgICAvLyBOZXcgVGFzayBtb2RhbCBzaG93IGJ1dHRvbiBhbmQgY2xvc2VcbiAgICB0aGlzLmFkZFNob3dOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGRIaWRlTmV3VGFza01vZGFsRXZlbnRMaXN0ZW5lcigpO1xuICAgIHRoaXMuYWRkTmV3VGFza1N1Ym1pdExpc3RlbmVyKCk7XG4gIH1cblxuICBhZGRUYXNrRGV0YWlsc1RvZ2dsZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stbWVudSAuZmEtY2hldnJvbi1kb3duXCIpO1xuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGljb24gPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgdGFzayA9IGljb24ucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB0aGlzLnRvZ2dsZVRhc2tEZXRhaWxzKHRhc2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlVGFza0RldGFpbHModGFza0VsZW1lbnQpIHtcbiAgICBpZiAodGFza0VsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsc1wiKTtcbiAgICAgIGRldGFpbHMuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG5cbiAgICAgIGNvbnN0IGljb24gPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIik7XG4gICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1jaGV2cm9uLXVwXCIpO1xuICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtY2hldnJvbi1kb3duXCIpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV4cGFuZEhpZGVBbGxFdmVudExpc3RlbmVyKCkge1xuICAgIGNvbnN0IFRFWFRfQ09OVEVOVF9UT19FWFBBTkQgPSBcIkV4cGFuZCBhbGxcIjtcbiAgICAvLyBJbml0aWFsIHN0YXRlIGlzIHRvIGV4cGFuZFxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhwYW5kLWFsbC1oaWRlLWFsbC1zcGFuXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpO1xuICAgICAgaWYgKHRhc2tzKSB7XG4gICAgICAgIGlmIChuZXcgU3RyaW5nKGJ0bi5pbm5lclRleHQudHJpbSgpKS5pbmNsdWRlcyhURVhUX0NPTlRFTlRfVE9fRVhQQU5EKSkge1xuICAgICAgICAgIGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Rhc2tEZXRhaWxzKHRhc2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidG4udGV4dENvbnRlbnQgPSBcIkhpZGUgYWxsXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgdGFzayBvZiB0YXNrcykge1xuICAgICAgICAgICAgdGhpcy5oaWRlVGFza0RldGFpbHModGFzayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ0bi50ZXh0Q29udGVudCA9IFRFWFRfQ09OVEVOVF9UT19FWFBBTkQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3dUYXNrRGV0YWlscyh0YXNrKSB7XG4gICAgY29uc3QgdGFza0RldGFpbHNUb1Nob3cgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kZXRhaWxzXCIpO1xuICAgIHRhc2tEZXRhaWxzVG9TaG93LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIGNvbnN0IGNoZXZyb24gPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1tZW51IC5pY29uXCIpO1xuICAgIGNoZXZyb24uY2xhc3NMaXN0LnJlbW92ZShcImZhLWNoZXZyb24tZG93blwiKTtcbiAgICBjaGV2cm9uLmNsYXNzTGlzdC5hZGQoXCJmYS1jaGV2cm9uLXVwXCIpO1xuICB9XG5cbiAgaGlkZVRhc2tEZXRhaWxzKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGV0YWlsc1RvU2hvdyA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHNcIik7XG4gICAgdGFza0RldGFpbHNUb1Nob3cuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgY29uc3QgY2hldnJvbiA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW1lbnUgLmljb25cIik7XG4gICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtY2hldnJvbi11cFwiKTtcbiAgICBjaGV2cm9uLmNsYXNzTGlzdC5hZGQoXCJmYS1jaGV2cm9uLWRvd25cIik7XG4gIH1cblxuICBhZGRTaG93TmV3VGFza01vZGFsRXZlbnRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2stYnRuJyk7XG4gICAgY29uc3QgbW9kYWxXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLW1vZGFsLXdyYXBwZXInKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdGhpcy5zaG93TmV3VGFza01vZGFsKG1vZGFsV3JhcHBlcik7XG4gICAgfSlcbiAgfVxuXG4gIHNob3dOZXdUYXNrTW9kYWwobW9kYWxXcmFwcGVyKSB7XG4gICAgdGhpcy5yZXNldE1vZGFsRm9ybSgpO1xuICAgIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIH1cblxuICByZXNldE1vZGFsRm9ybSgpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrLW1vZGFsIC5mb3JtLXJvdyBmb3JtJyk7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9XG5cbiAgYWRkSGlkZU5ld1Rhc2tNb2RhbEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay1tb2RhbC13cmFwcGVyJyk7XG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtd3JhcHBlcicpKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZU1vZGFsQ2xvc2luZygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtd3JhcHBlciAuY2xvc2UtYnRuJyk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRlTW9kYWxDbG9zaW5nKCk7XG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlTW9kYWxDbG9zaW5nKCkge1xuICAgIGNvbnN0IEFOSU1BVElPTl9EVVJBVElPTl9USU1FID0gNjAwO1xuICAgIFxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stbW9kYWwtd3JhcHBlcicpO1xuICAgIGNvbnN0IG1vZGFsID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2stbW9kYWwnKVxuXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlzc21pcy1hbmltYXRpb24nKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3dyYXBwZXItZmFkZS1pbi1hbmltYXRpb24nKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXItZmFkZS1vdXQtYW5pbWF0aW9uJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLWRpc3NtaXMtYW5pbWF0aW9uJyk7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3dyYXBwZXItZmFkZS1vdXQtYW5pbWF0aW9uJyk7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXItZmFkZS1pbi1hbmltYXRpb24nKTtcbiAgICB9LCBBTklNQVRJT05fRFVSQVRJT05fVElNRSk7XG4gIH1cblxuICBhZGROZXdUYXNrU3VibWl0TGlzdGVuZXIoKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLXN1Ym1pdCcpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0aGlzLnN1Ym1pdE5ld1Rhc2tNb2RhbCgpO1xuICAgICAgdGhpcy5hbmltYXRlTW9kYWxDbG9zaW5nKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXROZXdUYXNrTW9kYWwoKSB7XG4gICAgY29uc29sZS5sb2coJ05ldyB0YXNrIHN1Ym1pdGVkIScpO1xuICB9XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBNb2RlbCB7XG4gIGN1cnJlbnRQcm9qZWN0O1xuICBwcm9qZWN0cztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gbnVsbDtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gIH1cblxuICBzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdCA9IHByb2plY3Q7XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgU2luZ2xlUHJvamVjdFZpZXcge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcCB9IGZyb20gJy4vQXBwJztcblxuY29uc29sZS5sb2coJ3Rlc3QnKVxuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmluaXQoKTtcbmFwcC5zdGFydCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
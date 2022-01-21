(()=>{"use strict";class e{createdDate;title;description;dueDate;priority;isComplete;log;notes;checklist;constructor(e,t,s,o){this.id=class{static startingIndex=0;static nextIndex(){return this.startingIndex++}static reset(){this.startingIndex=0}}.nextIndex(),this.title=e,this.description=t,this.dueDate=s,this.priority=o,this.createdDate=new Date,this.isComplete=!1,this.notes=null,this.checklist=[],this.log=[]}isComplete(){return!0===isComplete}markAsComplete(){this.isComplete=!0}markAsNotComplete(){this.isComplete=!1}}class t{static LOW="low";static MEDIUM="medium";static HIGH="high";static DEFAULT="default"}const s={projects:[{id:1,title:"Website development",tasks:[new e("Update about page header","Lorem ipsum dolor sit amet, consectetur adipiscing elit",new Date(2022,1,20),t.DEFAULT),new e("About page wording","Lorem ipsum dolor sit amet, consectetur adipiscing elit",new Date(2022,1,22),t.HIGH),new e("New landing page layout","Lorem ipsum dolor sit amet, consectetur adipiscing elit",new Date(2022,1,17),t.MEDIUM),new e("Update global iconset","Lorem ipsum dolor sit amet, consectetur adipiscing elit",new Date(2022,1,27),t.LOW),new e("New case study thumbnails","Lorem ipsum dolor sit amet, consectetur adipiscing elit",new Date(2022,1,28),t.DEFAULT)]},{id:2,title:"Groceries",tasks:[]}]};class o{currentProject;projects;data;constructor(){this.currentProject=null,this.projects=[],this.data=s,this.projects=this.data.projects}setCurrentProject(e){this.currentProject=e}getData(){return this.data.projects}}class a{constructor(){this.model=new o,this.projects=this.model.getData()}getProjectTasks(e){return this.projects.filter((t=>t.id===e))[0].tasks}}class i{projectController;tasks;projects;constructor(){this.tasks=[],this.projectController=new a}createTask(e,t,s,o){console.log("Creating new task",e,t,s,o)}getProjectTasks(e){return this.projectController.getProjectTasks(e)}setProjectTasks(e){this.tasks=this.getProjectTasks(e)}markTaskAsComplete(e){this.tasks.filter((t=>t.id===e)).markComplete()}}class n{content;taskController;constructor(){this.content=document.querySelector(".wrapper"),this.taskController=new i}init(){this.attachEventListeners(),console.log(this.taskController.getProjectTasks(1))}attachEventListeners(){this.addTaskDetailsToggleEventListeners(),this.addExpandHideAllEventListener(),this.addToggleMoreMenuListener(),this.addDeleteTaskClickListener(),this.addEditTaskClickListener(),this.addShowNewTaskModalEventListener(),this.addHideNewTaskModalEventListener(),this.addNewTaskSubmitListener(),this.addToggleDarkModeClickListener()}addTaskDetailsToggleEventListeners(){const e=document.querySelectorAll(".task-menu .fa-chevron-down");for(let t of e)t.addEventListener("click",(e=>{const t=e.target.parentNode.parentNode;this.toggleTaskDetails(t)}))}toggleTaskDetails(e){if(e){e.querySelector(".task-details").classList.toggle("hide");const t=e.querySelector(".icon");t.classList.toggle("fa-chevron-up"),t.classList.toggle("fa-chevron-down")}}addExpandHideAllEventListener(){const e="Expand all",t=document.querySelector("#expand-all-hide-all-span");t.addEventListener("click",(s=>{const o=document.querySelectorAll(".task");if(o)if(new String(t.innerText.trim()).includes(e)){for(let e of o)this.showTaskDetails(e);t.textContent="Collapse all"}else{for(let e of o)this.hideTaskDetails(e);t.textContent=e}}))}showTaskDetails(e){e.querySelector(".task-details").classList.remove("hide");const t=e.querySelector(".task-menu .icon");t.classList.remove("fa-chevron-down"),t.classList.add("fa-chevron-up")}hideTaskDetails(e){e.querySelector(".task-details").classList.add("hide");const t=e.querySelector(".task-menu .icon");t.classList.remove("fa-chevron-up"),t.classList.add("fa-chevron-down")}addShowNewTaskModalEventListener(){const e=document.querySelector(".new-task-btn"),t=document.querySelector("#new-task-modal-wrapper");e.addEventListener("click",(e=>{this.showNewTaskModal(t)}))}showNewTaskModal(e){this.resetModalForm(),window.scrollTo(0,0),e.classList.remove("hide")}resetModalForm(){document.querySelector(".new-task-modal .form-row form").reset()}addHideNewTaskModalEventListener(){document.querySelector("#new-task-modal-wrapper").addEventListener("click",(e=>{e.stopPropagation(),e.target.classList.contains("modal-wrapper")&&this.animateModalClosing()})),document.querySelector(".modal-wrapper .close-btn").addEventListener("click",(e=>{this.animateModalClosing()}))}animateModalClosing(){const e=document.querySelector("#new-task-modal-wrapper"),t=e.querySelector(".new-task-modal");t.classList.add("modal-dissmis-animation"),e.classList.remove("wrapper-fade-in-animation"),e.classList.add("wrapper-fade-out-animation"),setTimeout((()=>{e.classList.add("hide"),t.classList.remove("modal-dissmis-animation"),e.classList.remove("wrapper-fade-out-animation"),e.classList.add("wrapper-fade-in-animation")}),600)}addNewTaskSubmitListener(){document.querySelector("#new-task-submit").addEventListener("click",(e=>{this.submitNewTaskModal(),this.animateModalClosing()}))}submitNewTaskModal(){console.log("New task submited!")}addToggleMoreMenuListener(){const e=document.querySelectorAll(".task-menu .more");for(let t of e)t.addEventListener("click",(e=>{const s=t.nextElementSibling;setTimeout((()=>{s.classList.toggle("hide")}),50)}));document.addEventListener("click",(e=>{if(!e.target.classList.contains("more-menu")&&!e.target.classList.contains("more-menu-option")){const e=document.querySelectorAll(".more-menu:not(.hide)");for(let t of e)t.classList.add("hide")}}))}addDeleteTaskClickListener(){const e=document.querySelectorAll(".more-menu-option.delete");for(let t of e){const e=t.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-index");t.addEventListener("click",this.handleDeleteTask.bind(this,e))}}handleDeleteTask(e){console.log("Deleting task with id "+e)}addEditTaskClickListener(){const e=document.querySelectorAll(".more-menu-option.edit");for(let t of e){const e=t.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-index");t.addEventListener("click",this.handleEditTask.bind(this,e))}}handleEditTask(e){console.log("Editing task with id "+e)}addToggleDarkModeClickListener(){const e=document.querySelector(".dark-mode-icon");e?e.addEventListener("click",(e=>{document.querySelector("body").classList.toggle("dark-mode")})):console.log("Dark-mode switch button not found")}}class r{constructor(){}}let l=new class{model;controller;view;constructor(){this.model=new o,this.controller=new n,this.view=new r}init(){this.controller.init()}start(){}};l.init(),l.start()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksc0NDL05YLE1BQU15RyxFQUVYdEcsZ0JDQUYsSUFBSXVHLEVBQU0sSUNFSCxNQUNML0UsTUFDQWdGLFdBQ0FDLEtBRUF6RyxjQUNFQyxLQUFLdUIsTUFBUSxJQUFJUCxFQUNqQmhCLEtBQUt1RyxXQUFhLElBQUluRSxFQUN0QnBDLEtBQUt3RyxLQUFPLElBQUlILEVBR2xCNUQsT0FDRXpDLEtBQUt1RyxXQUFXOUQsT0FHbEJnRSxXRGhCRkgsRUFBSTdELE9BQ0o2RCxFQUFJRyxTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2VudGl0eS9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91dGlsL0luZGV4U3VwcGxpZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2VudGl0eS9Qcmlvcml0eVR5cGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVsL1NhbXBsZURhdGEuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVsL01vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250cm9sbGVyL1Byb2plY3RDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250cm9sbGVyL1Rhc2tDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250cm9sbGVyL0Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3L1NpbmdsZVByb2plY3RWaWV3LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvQXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4cG9ydCBjb25zdCBzYW1wbGVUYXNrID0ge1xuLy8gICBjcmVhdGVkRGF0ZTogbmV3IERhdGUoKSxcbi8vICAgdGl0bGU6ICdTYW1wbGUgdGFzaycsXG4vLyAgIGRlc2NyaXB0aW9uOiAnTW9yZSBpbmZvcm1hdGlvbnMgYWJvdXQgbmV3IHRhc2snLFxuLy8gICBkdWVEYXRlOiBuZXcgRGF0ZSgpLFxuLy8gICBwcmlvcml0eTogUHJpb3JpdHlUeXBlLkhJR0gsXG4vLyAgIG5vdGVzOiAnPycsXG4vLyAgIGNoZWNrbGlzdDogJz8nLFxuLy8gICBsb2c6IFtdXG4vLyB9XG5cbmltcG9ydCB7IEluZGV4U3VwcGxpZXIgfSBmcm9tIFwiLi4vdXRpbC9JbmRleFN1cHBsaWVyXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgY3JlYXRlZERhdGU7XG4gIHRpdGxlO1xuICBkZXNjcmlwdGlvbjtcbiAgZHVlRGF0ZTtcbiAgcHJpb3JpdHk7XG4gIGlzQ29tcGxldGU7XG4gIGxvZztcbiAgLy8gb3B0aW9uYWw/XG4gIG5vdGVzO1xuICBjaGVja2xpc3Q7XG5cbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMuaWQgPSBJbmRleFN1cHBsaWVyLm5leHRJbmRleCgpO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jcmVhdGVkRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgdGhpcy5ub3RlcyA9IG51bGw7XG4gICAgdGhpcy5jaGVja2xpc3QgPSBbXTtcbiAgICB0aGlzLmxvZyA9IFtdO1xuICB9XG5cbiAgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gaXNDb21wbGV0ZSA9PT0gdHJ1ZTtcbiAgfVxuXG4gIG1hcmtBc0NvbXBsZXRlKCkge1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IHRydWU7XG4gIH1cblxuICBtYXJrQXNOb3RDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIEluZGV4U3VwcGxpZXIge1xuICBzdGF0aWMgc3RhcnRpbmdJbmRleCA9IDA7XG5cbiAgLy8gc3RhdGljP1xuICAvLyBjb25zdHJ1Y3RvcigpIHtcbiAgLy8gICB0aGlzLnN0YXJ0aW5nSW5kZXggPSAwO1xuICAvLyB9XG5cbiAgLy8gY29uc3RydWN0b3Ioc3RhcnRpbmdJbmRleCkge1xuICAvLyAgIHRoaXMuc3RhcnRpbmdJbmRleCA9IHN0YXJ0aW5nSW5kZXg7XG4gIC8vIH1cblxuICBzdGF0aWMgbmV4dEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0aW5nSW5kZXgrKztcbiAgfVxuXG4gIHN0YXRpYyByZXNldCgpIHtcbiAgICB0aGlzLnN0YXJ0aW5nSW5kZXggPSAwO1xuICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgUHJpb3JpdHlUeXBlIHtcbiAgc3RhdGljIExPVyA9ICdsb3cnO1xuICBzdGF0aWMgTUVESVVNID0gJ21lZGl1bSc7XG4gIHN0YXRpYyBISUdIID0gJ2hpZ2gnO1xuICBzdGF0aWMgREVGQVVMVCA9ICdkZWZhdWx0Jztcbn0iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL2VudGl0eS9UYXNrXCI7XG5pbXBvcnQgeyBQcmlvcml0eVR5cGUgfSBmcm9tIFwiLi4vZW50aXR5L1ByaW9yaXR5VHlwZVwiO1xuXG4vLyBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KVxuZXhwb3J0IGNvbnN0IHNhbXBsZURhdGEgPSB7XG4gIHByb2plY3RzOiBbXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICB0aXRsZTogXCJXZWJzaXRlIGRldmVsb3BtZW50XCIsXG4gICAgICB0YXNrczogW1xuICAgICAgICBuZXcgVGFzayhcbiAgICAgICAgICBcIlVwZGF0ZSBhYm91dCBwYWdlIGhlYWRlclwiLFxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdFwiLFxuICAgICAgICAgIG5ldyBEYXRlKDIwMjIsIDEsIDIwKSxcbiAgICAgICAgICBQcmlvcml0eVR5cGUuREVGQVVMVFxuICAgICAgICApLFxuICAgICAgICBuZXcgVGFzayhcbiAgICAgICAgICBcIkFib3V0IHBhZ2Ugd29yZGluZ1wiLFxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdFwiLFxuICAgICAgICAgIG5ldyBEYXRlKDIwMjIsIDEsIDIyKSxcbiAgICAgICAgICBQcmlvcml0eVR5cGUuSElHSFxuICAgICAgICApLFxuICAgICAgICBuZXcgVGFzayhcbiAgICAgICAgICBcIk5ldyBsYW5kaW5nIHBhZ2UgbGF5b3V0XCIsXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0XCIsXG4gICAgICAgICAgbmV3IERhdGUoMjAyMiwgMSwgMTcpLFxuICAgICAgICAgIFByaW9yaXR5VHlwZS5NRURJVU1cbiAgICAgICAgKSxcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgXCJVcGRhdGUgZ2xvYmFsIGljb25zZXRcIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIixcbiAgICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxLCAyNyksXG4gICAgICAgICAgUHJpb3JpdHlUeXBlLkxPV1xuICAgICAgICApLFxuICAgICAgICBuZXcgVGFzayhcbiAgICAgICAgICBcIk5ldyBjYXNlIHN0dWR5IHRodW1ibmFpbHNcIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIixcbiAgICAgICAgICBuZXcgRGF0ZSgyMDIyLCAxLCAyOCksXG4gICAgICAgICAgUHJpb3JpdHlUeXBlLkRFRkFVTFRcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMixcbiAgICAgIHRpdGxlOiAnR3JvY2VyaWVzJyxcbiAgICAgIHRhc2tzOiBbXSxcbiAgICB9XG4gIF0sXG59O1xuIiwiaW1wb3J0IHsgc2FtcGxlRGF0YSB9IGZyb20gXCIuL1NhbXBsZURhdGFcIjtcblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgY3VycmVudFByb2plY3Q7XG4gIHByb2plY3RzO1xuICBkYXRhO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBudWxsO1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICB0aGlzLmRhdGEgPSBzYW1wbGVEYXRhO1xuICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLmRhdGEucHJvamVjdHM7XG4gIH1cblxuICBzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEucHJvamVjdHM7XG4gIH1cbn0iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9Nb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMubW9kZWwuZ2V0RGF0YSgpO1xuICB9XG5cbiAgZ2V0UHJvamVjdFRhc2tzKHByb2plY3RJZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpWzBdLnRhc2tzKTtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZClbMF0udGFza3M7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb2plY3RDb250cm9sbGVyIH0gZnJvbSAnLi9Qcm9qZWN0Q29udHJvbGxlcic7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ29udHJvbGxlciB7XG4gIHByb2plY3RDb250cm9sbGVyO1xuICB0YXNrcztcbiAgcHJvamVjdHM7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIHRoaXMucHJvamVjdENvbnRyb2xsZXIgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKCdDcmVhdGluZyBuZXcgdGFzaycsIHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpO1xuICB9XG5cbiAgZ2V0UHJvamVjdFRhc2tzKHByb2plY3RJZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdENvbnRyb2xsZXIuZ2V0UHJvamVjdFRhc2tzKDEpKVxuICAgIHJldHVybiB0aGlzLnByb2plY3RDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhwcm9qZWN0SWQpO1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKS50YXNrcztcbiAgfVxuXG4gIHNldFByb2plY3RUYXNrcyhwcm9qZWN0SWQpIHtcbiAgICB0aGlzLnRhc2tzID0gdGhpcy5nZXRQcm9qZWN0VGFza3MocHJvamVjdElkKTtcbiAgfVxuXG4gIG1hcmtUYXNrQXNDb21wbGV0ZSh0YXNrSWQpIHtcbiAgICBsZXQgdGFzayA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkID09PSB0YXNrSWQpO1xuICAgIHRhc2subWFya0NvbXBsZXRlKCk7XG4gICAgLy8gbW92ZSB0byBjb21wbGV0ZS9kb25lIHNlY3Rpb24/XG4gIH1cbn0iLCJpbXBvcnQgeyBUYXNrQ29udHJvbGxlciB9IGZyb20gXCIuL1Rhc2tDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5Q29udHJvbGxlciB7XG4gIGNvbnRlbnQ7XG4gIHRhc2tDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3JhcHBlclwiKTtcbiAgICB0aGlzLnRhc2tDb250cm9sbGVyID0gbmV3IFRhc2tDb250cm9sbGVyKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhc2tDb250cm9sbGVyLmdldFByb2plY3RUYXNrcygxKSk7XG4gICAgLy8gdmlldy5yZW5kZXIocHJvamVjdClcbiAgfVxuXG4gIGF0dGFjaEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIFNob3dpbmcgYW5kIGhpZGluZyB0YXNrIGRldGFpbHNcbiAgICB0aGlzLmFkZFRhc2tEZXRhaWxzVG9nZ2xlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmFkZEV4cGFuZEhpZGVBbGxFdmVudExpc3RlbmVyKCk7XG4gICAgLy8gVGFzayBtb3JlIG1lbnUgb3Blbi9jbG9zZVxuICAgIHRoaXMuYWRkVG9nZ2xlTW9yZU1lbnVMaXN0ZW5lcigpO1xuICAgIHRoaXMuYWRkRGVsZXRlVGFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZEVkaXRUYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgIC8vIE5ldyBUYXNrIG1vZGFsIHNob3cgYnV0dG9uIGFuZCBjbG9zZVxuICAgIHRoaXMuYWRkU2hvd05ld1Rhc2tNb2RhbEV2ZW50TGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZEhpZGVOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGROZXdUYXNrU3VibWl0TGlzdGVuZXIoKTtcbiAgICAvLyBEYXJrLW1vZGUvbGlnaHQtbW9kZSBzd2l0Y2hcbiAgICB0aGlzLmFkZFRvZ2dsZURhcmtNb2RlQ2xpY2tMaXN0ZW5lcigpO1xuICB9XG5cbiAgYWRkVGFza0RldGFpbHNUb2dnbGVFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLW1lbnUgLmZhLWNoZXZyb24tZG93blwiKTtcbiAgICBmb3IgKGxldCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpY29uID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBpY29uLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgdGhpcy50b2dnbGVUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRhc2tEZXRhaWxzKHRhc2tFbGVtZW50KSB7XG4gICAgaWYgKHRhc2tFbGVtZW50KSB7XG4gICAgICBjb25zdCBkZXRhaWxzID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHNcIik7XG4gICAgICBkZXRhaWxzLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXG4gICAgICBjb25zdCBpY29uID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uXCIpO1xuICAgICAgaWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtY2hldnJvbi11cFwiKTtcbiAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLWNoZXZyb24tZG93blwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRFeHBhbmRIaWRlQWxsRXZlbnRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBURVhUX0NPTlRFTlRfVE9fRVhQQU5EID0gXCJFeHBhbmQgYWxsXCI7XG4gICAgLy8gSW5pdGlhbCBzdGF0ZSBpcyB0byBleHBhbmRcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4cGFuZC1hbGwtaGlkZS1hbGwtc3BhblwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcbiAgICAgIGlmICh0YXNrcykge1xuICAgICAgICBpZiAobmV3IFN0cmluZyhidG4uaW5uZXJUZXh0LnRyaW0oKSkuaW5jbHVkZXMoVEVYVF9DT05URU5UX1RPX0VYUEFORCkpIHtcbiAgICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJDb2xsYXBzZSBhbGxcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVUYXNrRGV0YWlscyh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnRuLnRleHRDb250ZW50ID0gVEVYVF9DT05URU5UX1RPX0VYUEFORDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd1Rhc2tEZXRhaWxzKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGV0YWlsc1RvU2hvdyA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHNcIik7XG4gICAgdGFza0RldGFpbHNUb1Nob3cuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgY29uc3QgY2hldnJvbiA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW1lbnUgLmljb25cIik7XG4gICAgY2hldnJvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtY2hldnJvbi1kb3duXCIpO1xuICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZChcImZhLWNoZXZyb24tdXBcIik7XG4gIH1cblxuICBoaWRlVGFza0RldGFpbHModGFzaykge1xuICAgIGNvbnN0IHRhc2tEZXRhaWxzVG9TaG93ID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGV0YWlsc1wiKTtcbiAgICB0YXNrRGV0YWlsc1RvU2hvdy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBjb25zdCBjaGV2cm9uID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbWVudSAuaWNvblwiKTtcbiAgICBjaGV2cm9uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1jaGV2cm9uLXVwXCIpO1xuICAgIGNoZXZyb24uY2xhc3NMaXN0LmFkZChcImZhLWNoZXZyb24tZG93blwiKTtcbiAgfVxuXG4gIGFkZFNob3dOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stYnRuXCIpO1xuICAgIGNvbnN0IG1vZGFsV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXRhc2stbW9kYWwtd3JhcHBlclwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLnNob3dOZXdUYXNrTW9kYWwobW9kYWxXcmFwcGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dOZXdUYXNrTW9kYWwobW9kYWxXcmFwcGVyKSB7XG4gICAgdGhpcy5yZXNldE1vZGFsRm9ybSgpO1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgfVxuXG4gIHJlc2V0TW9kYWxGb3JtKCkge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLW1vZGFsIC5mb3JtLXJvdyBmb3JtXCIpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfVxuXG4gIGFkZEhpZGVOZXdUYXNrTW9kYWxFdmVudExpc3RlbmVyKCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLW1vZGFsLXdyYXBwZXJcIik7XG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtd3JhcHBlclwiKSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVNb2RhbENsb3NpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC13cmFwcGVyIC5jbG9zZS1idG5cIik7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGVNb2RhbENsb3NpbmcoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVNb2RhbENsb3NpbmcoKSB7XG4gICAgY29uc3QgQU5JTUFUSU9OX0RVUkFUSU9OX1RJTUUgPSA2MDA7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFzay1tb2RhbC13cmFwcGVyXCIpO1xuICAgIGNvbnN0IG1vZGFsID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLW1vZGFsXCIpO1xuXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWRpc3NtaXMtYW5pbWF0aW9uXCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcIndyYXBwZXItZmFkZS1pbi1hbmltYXRpb25cIik7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwid3JhcHBlci1mYWRlLW91dC1hbmltYXRpb25cIik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWRpc3NtaXMtYW5pbWF0aW9uXCIpO1xuICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwid3JhcHBlci1mYWRlLW91dC1hbmltYXRpb25cIik7XG4gICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ3cmFwcGVyLWZhZGUtaW4tYW5pbWF0aW9uXCIpO1xuICAgIH0sIEFOSU1BVElPTl9EVVJBVElPTl9USU1FKTtcbiAgfVxuXG4gIGFkZE5ld1Rhc2tTdWJtaXRMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLXN1Ym1pdFwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLnN1Ym1pdE5ld1Rhc2tNb2RhbCgpO1xuICAgICAgdGhpcy5hbmltYXRlTW9kYWxDbG9zaW5nKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXROZXdUYXNrTW9kYWwoKSB7XG4gICAgY29uc29sZS5sb2coXCJOZXcgdGFzayBzdWJtaXRlZCFcIik7XG4gIH1cblxuICBhZGRUb2dnbGVNb3JlTWVudUxpc3RlbmVyKCkge1xuICAgIGNvbnN0IGJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stbWVudSAubW9yZVwiKTtcbiAgICBmb3IgKGxldCBidG4gb2YgYnRucykge1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBtZW51ID0gYnRuLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICAgICAgfSwgNTApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAvLyBpZiBjbGlja2VkIG91dHNpZGUgb2YgLm1vcmUtbWVudSBhbmQgbm90IG9uIG1vcmUgYnV0dG9uXG4gICAgICBpZiAoXG4gICAgICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb3JlLW1lbnVcIikgJiZcbiAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vcmUtbWVudS1vcHRpb25cIilcbiAgICAgICkge1xuICAgICAgICAvLyBoaWRlIGFsbCBtZW51c1xuICAgICAgICBjb25zdCBtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9yZS1tZW51Om5vdCguaGlkZSlcIik7XG4gICAgICAgIGZvciAobGV0IG1lbnUgb2YgbWVudXMpIHtcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpOyAvLyBoaWRlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZERlbGV0ZVRhc2tDbGlja0xpc3RlbmVyKCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vcmUtbWVudS1vcHRpb24uZGVsZXRlXCIpO1xuICAgIGZvciAobGV0IGJ0biBvZiBkZWxldGVCdG5zKSB7XG4gICAgICBjb25zdCBpbmRleCA9XG4gICAgICAgIGJ0bi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwiZGF0YS1pbmRleFwiXG4gICAgICAgICk7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlRGVsZXRlVGFzay5iaW5kKHRoaXMsIGluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRGVsZXRlVGFzayhpbmRleCkge1xuICAgIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcgdGFzayB3aXRoIGlkIFwiICsgaW5kZXgpO1xuICAgIC8vIHRoaXMuY29uZmlybURlbGV0aW5nVGFzaygpO1xuICAgIC8vIG1vZGVsLmRlbGV0ZVRhc2sodGFza0lkKTtcbiAgfVxuXG4gIGFkZEVkaXRUYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBlZGl0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9yZS1tZW51LW9wdGlvbi5lZGl0XCIpO1xuICAgIGZvciAobGV0IGJ0biBvZiBlZGl0QnRucykge1xuICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICBidG4ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICAgICAgICBcImRhdGEtaW5kZXhcIlxuICAgICAgICApO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUVkaXRUYXNrLmJpbmQodGhpcywgaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0VGFzayhpbmRleCkge1xuICAgIGNvbnNvbGUubG9nKFwiRWRpdGluZyB0YXNrIHdpdGggaWQgXCIgKyBpbmRleCk7XG4gICAgLy8gb3BlbiBlZGl0IG1vZGFsXG4gIH1cblxuICBhZGRUb2dnbGVEYXJrTW9kZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstbW9kZS1pY29uJyk7XG4gICAgaWYgKGJ0bikge1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrLW1vZGUnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnRGFyay1tb2RlIHN3aXRjaCBidXR0b24gbm90IGZvdW5kJylcbiAgICB9XG4gIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIFNpbmdsZVByb2plY3RWaWV3IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmluaXQoKTtcbmFwcC5zdGFydCgpOyIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9tb2RlbC9Nb2RlbCc7XG5pbXBvcnQgeyBEaXNwbGF5Q29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci9EaXNwbGF5Q29udHJvbGxlcic7XG5pbXBvcnQgeyBTaW5nbGVQcm9qZWN0VmlldyB9IGZyb20gJy4vdmlldy9TaW5nbGVQcm9qZWN0Vmlldyc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBtb2RlbDtcbiAgY29udHJvbGxlcjtcbiAgdmlldztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgdGhpcy5jb250cm9sbGVyID0gbmV3IERpc3BsYXlDb250cm9sbGVyKCk7XG4gICAgdGhpcy52aWV3ID0gbmV3IFNpbmdsZVByb2plY3RWaWV3KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29udHJvbGxlci5pbml0KCk7XG4gIH1cblxuICBzdGFydCgpIHt9XG59Il0sIm5hbWVzIjpbIlRhc2siLCJjcmVhdGVkRGF0ZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJkdWVEYXRlIiwicHJpb3JpdHkiLCJpc0NvbXBsZXRlIiwibG9nIiwibm90ZXMiLCJjaGVja2xpc3QiLCJjb25zdHJ1Y3RvciIsInRoaXMiLCJpZCIsInN0YXRpYyIsInN0YXJ0aW5nSW5kZXgiLCJuZXh0SW5kZXgiLCJEYXRlIiwibWFya0FzQ29tcGxldGUiLCJtYXJrQXNOb3RDb21wbGV0ZSIsIlByaW9yaXR5VHlwZSIsInNhbXBsZURhdGEiLCJwcm9qZWN0cyIsInRhc2tzIiwiREVGQVVMVCIsIkhJR0giLCJNRURJVU0iLCJMT1ciLCJNb2RlbCIsImN1cnJlbnRQcm9qZWN0IiwiZGF0YSIsInNldEN1cnJlbnRQcm9qZWN0IiwicHJvamVjdCIsImdldERhdGEiLCJQcm9qZWN0Q29udHJvbGxlciIsIm1vZGVsIiwiZ2V0UHJvamVjdFRhc2tzIiwicHJvamVjdElkIiwiZmlsdGVyIiwiVGFza0NvbnRyb2xsZXIiLCJwcm9qZWN0Q29udHJvbGxlciIsImNyZWF0ZVRhc2siLCJjb25zb2xlIiwic2V0UHJvamVjdFRhc2tzIiwibWFya1Rhc2tBc0NvbXBsZXRlIiwidGFza0lkIiwidGFzayIsIm1hcmtDb21wbGV0ZSIsIkRpc3BsYXlDb250cm9sbGVyIiwiY29udGVudCIsInRhc2tDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsImF0dGFjaEV2ZW50TGlzdGVuZXJzIiwiYWRkVGFza0RldGFpbHNUb2dnbGVFdmVudExpc3RlbmVycyIsImFkZEV4cGFuZEhpZGVBbGxFdmVudExpc3RlbmVyIiwiYWRkVG9nZ2xlTW9yZU1lbnVMaXN0ZW5lciIsImFkZERlbGV0ZVRhc2tDbGlja0xpc3RlbmVyIiwiYWRkRWRpdFRhc2tDbGlja0xpc3RlbmVyIiwiYWRkU2hvd05ld1Rhc2tNb2RhbEV2ZW50TGlzdGVuZXIiLCJhZGRIaWRlTmV3VGFza01vZGFsRXZlbnRMaXN0ZW5lciIsImFkZE5ld1Rhc2tTdWJtaXRMaXN0ZW5lciIsImFkZFRvZ2dsZURhcmtNb2RlQ2xpY2tMaXN0ZW5lciIsImJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwidG9nZ2xlVGFza0RldGFpbHMiLCJ0YXNrRWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImljb24iLCJURVhUX0NPTlRFTlRfVE9fRVhQQU5EIiwiYnRuIiwiU3RyaW5nIiwiaW5uZXJUZXh0IiwidHJpbSIsImluY2x1ZGVzIiwic2hvd1Rhc2tEZXRhaWxzIiwidGV4dENvbnRlbnQiLCJoaWRlVGFza0RldGFpbHMiLCJyZW1vdmUiLCJjaGV2cm9uIiwiYWRkIiwibW9kYWxXcmFwcGVyIiwic2hvd05ld1Rhc2tNb2RhbCIsInJlc2V0TW9kYWxGb3JtIiwid2luZG93Iiwic2Nyb2xsVG8iLCJyZXNldCIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRhaW5zIiwiYW5pbWF0ZU1vZGFsQ2xvc2luZyIsIndyYXBwZXIiLCJtb2RhbCIsInNldFRpbWVvdXQiLCJzdWJtaXROZXdUYXNrTW9kYWwiLCJidG5zIiwibWVudSIsIm5leHRFbGVtZW50U2libGluZyIsIm1lbnVzIiwiZGVsZXRlQnRucyIsImluZGV4IiwicGFyZW50RWxlbWVudCIsImdldEF0dHJpYnV0ZSIsImhhbmRsZURlbGV0ZVRhc2siLCJiaW5kIiwiZWRpdEJ0bnMiLCJoYW5kbGVFZGl0VGFzayIsIlNpbmdsZVByb2plY3RWaWV3IiwiYXBwIiwiY29udHJvbGxlciIsInZpZXciLCJzdGFydCJdLCJzb3VyY2VSb290IjoiIn0=
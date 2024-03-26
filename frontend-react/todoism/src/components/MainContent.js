import Task from "./Task";
import { v4 as uuid } from 'uuid'

function MainContent() {
  const tasks = [
    {
      taskTitle: "Update about page header",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      priority: "Default",
      dueDate: "20 January 2022",
      isComplete: true
    },
    {
      taskTitle: "About page wording",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      priority: "High",
      dueDate: "22 January 2022",
      isComplete: false
    },
    {
      taskTitle: "Update about page header",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      priority: "Default",
      dueDate: "20 January 2022",
      isComplete: false
    },
    {
      taskTitle: "New landing page layout",
      taskDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      priority: "Medium",
      dueDate: "20 January 2022",
      isComplete: false
    },
  ];

  return (
    <div className="container flex-1">
      <div className="flex-row">
        <h1 className="list-title">Overview</h1>
        <div className="push-right align-center">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <p className="list-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="tasks-wrapper">
        <div className="flex-row">
          <div className="tasks-title">Todo</div>
          <div className="push-right">
            <span id="expand-all-hide-all-span" className="font-sm">
              Expand all
            </span>
          </div>
        </div>
          {tasks.map((task, index) => <Task key={uuid()} task={task} index={index}/>)}
      </div>
    </div>
  );
}

export default MainContent;

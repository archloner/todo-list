import { Task } from "../entity/Task";
import { PriorityType } from "../entity/PriorityType";

// constructor(title, description, dueDate, priority)
export const sampleData = {
  projects: [
    {
      id: 0,
      title: 'Overview',
      description: 'Look at all your projects and choose which one you want to check',
      tasks: []
    },
    {
      id: 1,
      title: "Website development",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      tasks: [
        new Task(
          "Update about page header",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 20),
          PriorityType.DEFAULT
        ),
        new Task(
          "Fix bug in deployment script",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 19),
          PriorityType.MEDIUM
        ),
        new Task(
        "Update about page header",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 20),
          PriorityType.DEFAULT
        ),
        new Task(
          "About page wording",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 22),
          PriorityType.HIGH
        ),
        new Task(
          "New landing page layout",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 17),
          PriorityType.MEDIUM
        ),
        new Task(
          "Update global iconset",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 27),
          PriorityType.LOW
        ),
        new Task(
          "New case study thumbnails",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 28),
          PriorityType.DEFAULT
        ),
      ],
      done: [],
      todoCount: 0 // ? update on every isComplete change
    },
    {
      id: 2,
      title: 'Groceries',
      tasks: [
        new Task(
          "Buy Pizza",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.HIGH
        ),
      ],
    }
  ],
};

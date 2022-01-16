import { Task } from "../entity/Task";
import { PriorityType } from "../entity/PriorityType";

// constructor(title, description, dueDate, priority)
export const sampleData = {
  projects: [
    {
      id: 1,
      title: "Website development",
      tasks: [
        new Task(
          "Update about page header",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 20),
          PriorityType.DEFAULT
        ),
        new Task(
          "About page wording",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 22),
          PriorityType.HIGH
        ),
        new Task(
          "New landing page layout",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 1, 17),
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
          new Date(2022, 1, 28),
          PriorityType.DEFAULT
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

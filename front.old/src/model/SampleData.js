import Task from '../entity/Task';
import { PriorityType } from '../entity/PriorityType';

export const sampleData = {
  projects: [
    {
      id: 0,
      title: "Overview",
      description:
        "Look at all your projects and choose which one you want to check",
    },
    {
      id: 1,
      title: "Website redesign",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
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
          "Update contact page header",
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
    },
    {
      id: 2,
      title: "Groceries",
      description:
        "List of groceries to buy on the nearest trip to the shop. Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tasks: [
        new Task(
          "Buy Pizza",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.HIGH
        ),
        new Task(
          "Tomatoes",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.DEFAULT
        ),
      ],
      done: [],
    },
    {
      id: 3,
      title: "Workout",
      description:
        "Exercises to do to stay fit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tasks: [
        new Task(
          "50 Brzuszków",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.DEFAULT
        ),
        new Task(
          "50 Pompek",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.DEFAULT
        ),
      ],
      done: [],
    },
    {
      id: 4,
      title: "Reading",
      description:
        "List of books to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tasks: [
        new Task(
          "Lord of The Rings: The Fellowship of the Ring",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.MEDIUM
        ),
        new Task(
          "Do Androids Dream of Electric Sheep",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit",
          new Date(2022, 0, 30),
          PriorityType.LOW
        ),
      ],
      done: [],
    },
  ],
  logs: []
};

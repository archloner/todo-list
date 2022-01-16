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

import { IndexSupplier } from "../util/IndexSupplier";

export class Task {
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
    this.id = IndexSupplier.nextIndex();
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
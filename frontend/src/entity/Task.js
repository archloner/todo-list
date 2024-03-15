import { isBefore } from 'date-fns';
import { IndexGenerator } from '../util/IndexGenerator';
import ContentView from '../view/ContentView';

export default class Task {
  createdDate;

  title;

  description;

  dueDate;

  priority;

  isComplete;

  isCollapsed;

  log;

  // optional?
  notes;
  
  checklist;

  constructor(title, description, dueDate, priority) {
    this.id = IndexGenerator.nextIndex();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdDate = new Date();
    this.isComplete = false;
    this.isCollapsed = true;

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

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  setIsCollapsed(value) {
    this.isCollapsed = value;
  }

  toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  getDOMElement() {
    let contentView = new ContentView();
    return contentView.getTaskDOMElement(this);
  }

  isOverdue() {
    return isBefore(this.dueDate, new Date()) && !this.isComplete;
  }
}

export class Notification {
  title;
  description;
  level;

  constructor(title, description, level) {
    this.title = title;
    this.description = description;
    this.level = level;
  }
}
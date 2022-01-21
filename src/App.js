import { Model } from './model/Model';
import { DisplayController } from './controller/DisplayController';
import { SingleProjectView } from './view/SingleProjectView';

export class App {
  model;
  controller;
  view;

  constructor() {
    this.model = new Model();
    this.view = new SingleProjectView();
    this.controller = new DisplayController({ view: this.view, model: this.model });
    this.view.setController(this.controller);
  }

  init() {
    this.controller.init();
  }

  start() {}
}
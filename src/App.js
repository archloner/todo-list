import { Model } from './model/Model';
import { DisplayController } from './controller/DisplayController';
import { SingleProjectView } from './view/SingleProjectView';

export class App {
  model;
  controller;
  view;

  constructor() {
    this.model = new Model();
    this.controller = new DisplayController();
    this.view = new ProjectView();
  }

  init() {}

  start() {}
}
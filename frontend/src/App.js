import Model from './model/Model';
import DisplayController from './controller/DisplayController';
import ContentView from './view/ContentView';
import { MenuView } from './view/MenuView';
import { NotificationsController } from './controller/NotificationsController';

export default class App {
  model;

  controller;

  view;

  menuView;

  notificationController;

  constructor() {
    this.model = new Model();
    this.menuView = new MenuView({ model: this.model });
    this.view = new ContentView({ menuView: this.menuView });
    this.view.setModel(this.model);

    this.controller = new DisplayController({
      view: this.view,
      model: this.model,
    });

    this.view.setController(this.controller);

    this.menuView.setController(this.controller);

    this.notificationController = new NotificationsController();
  }

  init() {
    this.controller.init();
  }
}

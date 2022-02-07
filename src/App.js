import { Model } from "./model/Model";
import { DisplayController } from "./controller/DisplayController";
import { SingleProjectView } from "./view/SingleProjectView";
import { MenuView } from "./view/MenuView";

export class App {
  model;
  controller;
  view;
  menuView;

  constructor() {
    this.model = new Model();
    
    this.menuView = new MenuView({ model: this.model });
    
    this.view = new SingleProjectView({ menuView: this.menuView });
    this.view.setModel(this.model);

    this.controller = new DisplayController({
      view: this.view,
      model: this.model,
    });

    this.view.setController(this.controller);

    this.menuView.setController(this.controller);
  }

  init() {
    this.controller.init();
  }
}

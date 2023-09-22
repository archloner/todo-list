import { AppConfig } from "../config/AppConfig";
import { PriorityType } from "../entity/PriorityType";
import { Notification } from "../entity/Notification";

export class NotificationsController {
  wrapper;

  constructor() {
    this.wrapper = document.querySelector(".notification-wrapper");
    this.init();
  }

  init() {
    const notification = new Notification(
      "Welcome",
      "Welcome to our app, we hope you will find it useful!",
      PriorityType.MEDIUM
    );

    // show welcome notification after some delay
    setTimeout(() => {
      this.showNotification(notification);
    }, 1000);

    // setTimeout(() => {
    //   notification.level = PriorityType.DEFAULT;
    //   this.showNotification(notification);
    // }, 1500);
  }

  addCloseEventListeners() {
    const closeBtns = this.wrapper.querySelectorAll(
      ".notification-icon .close"
    );
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.animateNotificationClosing(e.target.parentElement.parentElement);
      });
    });
  }

  animateNotificationClosing(el) {
    el.classList.add("notification-animate-hide");
    setTimeout(() => {
      el.classList.remove("notification-animate-hide");
      el.classList.add("hide");
      this.wrapper.removeChild(el);
    }, AppConfig.NOTIFICATION_HIDE_ANIMATION_DURATION);
  }

  showNotification(notification) {
    const el = this.createNotificationElement(notification);
    this.wrapper.appendChild(el);
    this.addCloseEventListeners();
    setTimeout(() => {
      this.animateNotificationClosing(el);
    }, AppConfig.NOTIFICATION_SHOW_TIME);
  }

  createNotificationElement(notification) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("notification");

    let background;
    switch (notification.level) {
      case PriorityType.HIGH:
        background = "bg-danger";
        break;
      case PriorityType.MEDIUM:
        background = "bg-medium";
        break;
      case PriorityType.LOW:
        background = "bg-low";
        break;
      case PriorityType.DEFAULT:
        background = "bg-default";
        break;
    }

    wrapper.classList.add(background);

    const bellIconWrapper = document.createElement("div");
    bellIconWrapper.classList.add("notification-icon");

    const bellIcon = document.createElement("i");
    bellIcon.classList.add("fa-solid", "fa-bell");

    bellIconWrapper.appendChild(bellIcon);
    wrapper.appendChild(bellIconWrapper);

    const body = document.createElement("div");
    body.classList.add("notification-body");

    const title = document.createElement("div");
    title.classList.add("notification-title");
    title.textContent = notification.title;
    body.appendChild(title);

    const text = document.createElement("div");
    text.classList.add("notification-text");
    text.textContent = notification.description;
    body.appendChild(text);
    wrapper.appendChild(body);

    const closeIconWrapper = document.createElement("div");
    closeIconWrapper.classList.add("notification-icon");

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-xmark", "close");
    closeIconWrapper.appendChild(closeIcon);

    wrapper.appendChild(closeIconWrapper);

    return wrapper;
  }
}

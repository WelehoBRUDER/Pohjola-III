class WorldLog {
  messages: HTMLDivElement[] = [];
  notifications: HTMLDivElement[] = [];
  constructor() {
    this.messages = [];
    this.notifications = [];
  }

  write(text: string) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.classList.add("fade-out");
    message.append(textSyntax(text));
    this.messages.push(message);
    worldLog.append(message);
    setTimeout(() => {
      message.remove();
    }, 10000);

    if (this.messages.length > 200) {
      this.messages.shift()?.remove();
    }
  }

  toggle() {
    worldLog.classList.toggle("large");
    if (worldLog.classList.contains("large")) {
      this.messages.forEach((message) => {
        message.classList.remove("fade-out");
        worldLog.append(message);
      });
      worldLog.scrollTop = worldLog.scrollHeight;
    } else {
      worldLog.scrollTop = 0;
      worldLog.innerHTML = "";
    }
  }

  createNotification(text: string, timeout: number = 10) {
    const notification = document.createElement("div");
    const notificationDrag = document.createElement("div");
    const notificationDismiss = document.createElement("div");
    notification.classList.add("notification");
    notificationDrag.classList.add("drag");
    notificationDismiss.classList.add("dismiss");
    notification.append(textSyntax(text));
    notificationDismiss.innerText = "OK";
    notificationDismiss.addEventListener("click", removeNotification);
    notification.append(notificationDrag);
    notification.append(notificationDismiss);
    this.notifications.push(notification);
    notificationsScreen.append(notification);

    dragElem(notification);

    setTimeout(() => {
      notification.classList.add("active");
    }, 1);

    // Negative timeout means notification will not dismiss automatically
    if (timeout > 0) {
      setTimeout(removeNotification, timeout * 1000);
    }

    if (this.notifications.length > 9) {
      this.notifications.shift()?.remove();
    }

    function removeNotification() {
      notification.classList.remove("active");
      setTimeout(() => {
        notification.remove();
      }, 150);
    }
  }
}

const log = new WorldLog();

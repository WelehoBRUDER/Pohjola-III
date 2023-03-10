"use strict";
class WorldLog {
    messages = [];
    constructor() {
        this.messages = [];
    }
    write(text) {
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerText = text;
        message.classList.add("fade-out");
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
        }
        else {
            worldLog.scrollTop = 0;
            worldLog.innerHTML = "";
        }
    }
}
const log = new WorldLog();
//# sourceMappingURL=log.js.map
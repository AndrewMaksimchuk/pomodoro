import { Notification } from "electron";

export function showNotification(title, body) {
  const notification = new Notification({
    title,
    body,
  });
  notification.show();
  notification.on("show", () => notification.close());
}

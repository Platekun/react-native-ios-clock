import PushNotification from "react-native-push-notification";

export function setupNotifications() {
  PushNotification.configure({});
}

export function schedule({ title, message, timeInSeconds }) {
  PushNotification.localNotificationSchedule({
    title,
    message,
    date: new Date(Date.now() + timeInSeconds * 1000)
  });
}

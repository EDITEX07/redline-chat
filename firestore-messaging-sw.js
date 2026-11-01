// REDLINE Background Notification Service Worker

importScripts(
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB-3EDn9LF4VPUI-ZspyDk4KHSp0PktEVw",
  authDomain: "redline-chat-7d258.firebaseapp.com",
  projectId: "redline-chat-7d258",
  storageBucket: "redline-chat-7d258.firebasestorage.app",
  messagingSenderId: "799281869222",
  appId: "1:799281869222:web:c61087e7661d32008d9f67",
  measurementId: "G-2XNZHNZEF1"
});

const messaging = firebase.messaging();

// Display only a generic notification.
// Never display sender identity or message content.
messaging.onBackgroundMessage(() => {
  return self.registration.showNotification("REDLINE", {
    body: "Redline has a text message for you.",
    tag: "redline-message",
    renotify: true,
    data: {
      url: "/"
    }
  });
});

// Open REDLINE when the notification is tapped.
self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(windowClients => {
      for (const client of windowClients) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      return clients.openWindow("/");
    })
  );
});

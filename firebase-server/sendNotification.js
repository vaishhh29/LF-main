const admin = require("firebase-admin");

// Load your downloaded JSON key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registrationToken = "cjD9I1X2QKSpG8gPYpSVio:APA91bFVvWUnlFU0mpjH5on2WN6AkW1oKkV34svlYoXtIklOCeUdkbyaBHTjaWTsP4u8bN8spyzfFF9WC8AFjeol1jVeWIiiJZiabi3wB8rzgLf7VSP8qCI";

const message = {
  token: registrationToken,
  notification: {
    title: "🔥 Firebase Notification Test",
    body: "If you see this, your FCM setup works perfectly!"
  },
  android: {
    priority: "high",
    notification: {
      channelId: "default",
      sound: "default",
    },
  },
  apns: {
    payload: {
      aps: {
        sound: "default",
      },
    },
  },
};


admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.error(" Error sending message:", error);
  });

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTgUlFrUzNj06TzTTD5b_1Rv5mDKvkayY",
  authDomain: "chat-app-48580.firebaseapp.com",
  projectId: "chat-app-48580",
  storageBucket: "chat-app-48580.appspot.com",
  messagingSenderId: "654913068863",
  appId: "1:654913068863:web:4cfca8c54ff83f6f277d8a"
};

export const app = initializeApp(firebaseConfig);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCNX7-irR7cT4KJSHt2WjyWwpHelLHoRp8",
  authDomain: "todo-app-42670.firebaseapp.com",
  projectId: "todo-app-42670",
  storageBucket: "todo-app-42670.appspot.com",
  messagingSenderId: "862989240241",
  appId: "1:862989240241:web:2d10ced0d9cf3d0506df90",
  measurementId: "G-NY3MJ1956X",
});

const db = getFirestore();

export default db;

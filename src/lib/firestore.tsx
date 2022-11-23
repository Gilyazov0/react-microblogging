import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTcRKH3Z0bdupcM_qBVGjiDcrz3GKu-mQ",
  authDomain: "micro-blogging--app.firebaseapp.com",
  projectId: "micro-blogging--app",
  storageBucket: "micro-blogging--app.appspot.com",
  messagingSenderId: "224728624560",
  appId: "1:224728624560:web:9c96fdbe87b3b7d82d7a75",
  measurementId: "G-ZL712TRRHW",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log(db);

export { app, db };

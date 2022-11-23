import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDTcRKH3Z0bdupcM_qBVGjiDcrz3GKu-mQ",
//   authDomain: "micro-blogging--app.firebaseapp.com",
//   projectId: "micro-blogging--app",
//   storageBucket: "micro-blogging--app.appspot.com",
//   messagingSenderId: "224728624560",
//   appId: "1:224728624560:web:9c96fdbe87b3b7d82d7a75",
//   measurementId: "G-ZL712TRRHW",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

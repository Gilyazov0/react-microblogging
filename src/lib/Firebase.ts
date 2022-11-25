import { FirebaseApp, initializeApp } from "firebase/app";
import FIREBASE_CONFIG from "./config_firebase";

abstract class Firebase {
  private readonly firebaseConfig;
  app: FirebaseApp;
  constructor() {
    this.firebaseConfig = FIREBASE_CONFIG;
    this.app = initializeApp(this.firebaseConfig);
  }
}

export default Firebase;

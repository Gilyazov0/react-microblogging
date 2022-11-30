import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import FIREBASE_CONFIG from "./config_firebase";

abstract class Firebase {
  private readonly firebaseConfig;
  protected app: FirebaseApp;
  constructor() {
    this.firebaseConfig = FIREBASE_CONFIG;
    this.app = initializeApp(this.firebaseConfig);
  }

  protected async getData(db: Firestore, collection: string, document: string) {
    const dataSnap = await this.getDataSnap(db, collection, document);
    if (dataSnap?.exists()) return dataSnap.data();
    return null;
  }

  protected async writeData(
    db: Firestore,
    collection: string,
    document: string,
    data: object
  ) {
    const ref = doc(db, collection, document);
    try {
      await setDoc(ref, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  public async writeIfNotExist(
    db: Firestore,
    collection: string,
    document: string,
    data: object
  ) {
    const dataSnap = await this.getDataSnap(db, collection, document);
    if (!dataSnap?.exists()) this.writeData(db, collection, document, data);
  }

  protected async getDataSnap(
    db: Firestore,
    collection: string,
    document: string
  ) {
    try {
      const docRef = doc(db, collection, document);
      const dataSnap = await getDoc(docRef);
      return dataSnap;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Firebase;

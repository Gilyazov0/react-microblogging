import { FirebaseApp, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
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
  ): Promise<void> {
    const ref = doc(db, collection, document);
    try {
      await setDoc(ref, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  protected async writeDataWithId(db: Firestore, col: string, data: object) {
    const newDocRef = doc(collection(db, col));
    const newData = { ...data, id: newDocRef.id };
    try {
      await setDoc(newDocRef, newData, { merge: true });
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

  protected async toggleDataInArray(
    fieldName: string,
    db: Firestore,
    collection: string,
    document: string,
    data: string
  ) {
    const arr = await this.getField(fieldName, db, collection, document);

    const index = arr.indexOf(data);
    index === -1 ? arr.push(data) : arr.splice(index, 1);

    await this.writeData(db, collection, document, { [fieldName]: arr });
  }

  //there is no way to implement proper search in firebase without paid account. So it made this way
  //More information is here: https://firebase.google.com/docs/firestore/solutions/search?provider=typesense
  protected async Search(db: Firestore, col: string, data: string) {
    const q = query(collection(db, col));
    const querySnapshot = await getDocs(q);
    const res: any = [];
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      for (let key of Object.keys(document)) {
        if (
          document[key] &&
          typeof document[key] === "string" &&
          (document[key] as string).includes(data)
        ) {
          res.push(document);
          break;
        }
      }
    });

    return res;
  }

  private async getField(
    fieldName: string,
    db: Firestore,
    collection: string,
    document: string
  ): Promise<string[]> {
    try {
      const data = await this.getData(db, collection, document);
      if (!data || !data[fieldName]) return [] as string[];
      return data[fieldName] as string[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
export default Firebase;

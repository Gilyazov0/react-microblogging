import { FirebaseApp, initializeApp } from "firebase/app";
import {
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import FIREBASE_CONFIG from "./config_firebase";
import { getFirestore } from "firebase/firestore";

abstract class Firebase {
  private readonly firebaseConfig;
  protected app: FirebaseApp;
  protected db: Firestore;

  constructor() {
    this.firebaseConfig = FIREBASE_CONFIG;
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  protected async getData(
    col: CollectionReference<DocumentData>,
    document: string
  ) {
    const dataSnap = await this.getDataSnap(col, document);
    if (dataSnap?.exists()) return dataSnap.data();
    return null;
  }

  /**
   * if document exists merge data
   */
  protected async writeData(
    col: CollectionReference<DocumentData>,
    document: string,
    data: object
  ): Promise<void> {
    const ref = doc(col, document);
    try {
      await setDoc(ref, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @returns id of new document
   */
  protected async writeDataWithId(
    col: CollectionReference<DocumentData>,
    data: object
  ) {
    const newDocRef = doc(col);
    const newData = { ...data, id: newDocRef.id };
    try {
      await setDoc(newDocRef, newData, { merge: true });
      return newDocRef.id;
    } catch (error) {
      console.log(error);
    }
  }

  public async writeIfNotExist(
    col: CollectionReference<DocumentData>,
    document: string,
    data: object
  ) {
    const dataSnap = await this.getDataSnap(col, document);
    if (!dataSnap?.exists()) this.writeData(col, document, data);
  }

  protected async getDataSnap(
    col: CollectionReference<DocumentData>,
    document: string
  ) {
    try {
      const docRef = doc(col, document);
      const dataSnap = await getDoc(docRef);
      return dataSnap;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * if fieldName is array add or remove data from it
   */
  protected async toggleDataInArray(
    fieldName: string,
    col: CollectionReference<DocumentData>,
    document: string,
    data: string
  ) {
    const arr = await this.getField(fieldName, col, document);

    if (!(arr instanceof Array)) return;
    const index = arr.indexOf(data);
    index === -1 ? arr.push(data) : arr.splice(index, 1);

    await this.writeData(col, document, { [fieldName]: arr });
  }

  //there is no way to implement proper search in firebase without paid account. So it made this way
  //More information is here: https://firebase.google.com/docs/firestore/solutions/search?provider=typesense
  protected async Search(col: CollectionReference<DocumentData>, data: string) {
    const q = query(col);
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
    col: CollectionReference<DocumentData>,
    document: string
  ): Promise<string[]> {
    try {
      const data = await this.getData(col, document);
      if (!data || !data[fieldName]) return [] as string[];
      return data[fieldName] as string[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
export default Firebase;

import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Firebase from "./Firebase";

class UsersDB extends Firebase {
  collection: string;
  db: Firestore;
  constructor() {
    super();
    this.db = getFirestore(this.app);
    this.collection = "users";
  }
  public async writeUserData(uid: string, data: object) {
    const ref = doc(this.db, this.collection, uid);
    try {
      await setDoc(ref, data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserData(uid: string) {
    try {
      const docRef = doc(this.db, this.collection, uid);
      const dataSnap = await getDoc(docRef);
      return dataSnap.data();
    } catch (error) {
      console.log(error);
    }
  }
}

const userDB = new UsersDB();
export default userDB;

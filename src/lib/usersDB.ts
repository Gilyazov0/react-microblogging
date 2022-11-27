import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import UserData from "../Types/userData";
import Firebase from "./Firebase";
import storage from "./storage";

class UsersDB extends Firebase {
  private collection: string;
  private db: Firestore;
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

  public async writeIfNotExist(uid: string, data: object) {
    const dataSnap = await this.getDataSnap(uid);
    if (!dataSnap?.exists()) this.writeUserData(uid, data);
  }

  public async getUserData(uid: string) {
    const dataSnap = await this.getDataSnap(uid);
    if (dataSnap?.exists()) return dataSnap.data() as UserData;
    return null;
  }

  public async addProfileImg(uid: string, file: File) {
    const userData = await this.getUserData(uid);
    if (!userData) return;

    //for code reviewer: is it a bad practice to skip await?
    if (userData.picture) storage.delFile(userData.picture);
    const fileName = await storage.storeFile(file);
    this.writeUserData(uid, { picture: fileName });
  }

  private async getDataSnap(uid: string) {
    try {
      const docRef = doc(this.db, this.collection, uid);
      const dataSnap = await getDoc(docRef);
      return dataSnap;
    } catch (error) {
      console.log(error);
    }
  }
}

const userDB = new UsersDB();
export default userDB;

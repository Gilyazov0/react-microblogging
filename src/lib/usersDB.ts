import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { TweetProps } from "../Types/TweetProps";
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

  public async getProfilePicUrl(fileName: string) {
    return await storage.getUrl(fileName);
  }

  public async addUserDataToTweet(tweet: TweetProps) {
    const user = await this.getUserData(tweet.userId);
    tweet.picture = user?.picture;
    tweet.userName = user?.displayName;
  }
  // public async getUsers(uids: string[]) {
  //   uids = [...new Set(uids)];
  //   const promises = uids.map((uid) => this.getUserData(uid));
  //   const users = await Promise.all(promises);

  //   const res: { [key: string]: UserData } = {};

  //   users.forEach((user) => {
  //     if (user) res[user.uid] = user!;
  //   });
  //   return res;
  // }

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

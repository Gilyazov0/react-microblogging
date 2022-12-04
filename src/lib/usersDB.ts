import { getFirestore, Firestore } from "firebase/firestore";
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
    await this.writeData(this.db, this.collection, uid, data);
  }

  public async createUserIfNotExist(uid: string, data: object) {
    await this.writeIfNotExist(this.db, this.collection, uid, data);
  }

  public async getUserData(uid: string) {
    const data = await this.getData(this.db, this.collection, uid);
    console.log(data);
    if (data) return data as UserData;
    return null;
  }

  public async addProfileImg(uid: string, file: File) {
    const userData = await this.getUserData(uid);
    if (!userData) return;
    debugger;
    if (userData.picture) await storage.delFile(userData.picture);
    const fileName = await storage.storeFile(file);
    const data = { picture: fileName };
    await this.writeUserData(uid, data);
    return data;
  }

  public async getProfilePicUrl(fileName: string) {
    return await storage.getUrl(fileName);
  }

  public async addUserDataToTweet(tweet: TweetProps) {
    const user = await this.getUserData(tweet.userId);
    tweet.picture = user?.picture;
    tweet.userName = user?.displayName;
  }
}

const userDB = new UsersDB();
export default userDB;

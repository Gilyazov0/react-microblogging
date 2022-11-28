import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  getDocs,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import Firebase from "./Firebase";
import moment from "moment";
import { TweetProps } from "../Types/TweetProps";

class TweetsDB extends Firebase {
  db: Firestore;
  collection: string;
  constructor() {
    super();
    this.db = getFirestore(this.app);
    this.collection = "tweets";
  }

  async postTweet(tweet: TweetProps) {
    try {
      await addDoc(collection(this.db, this.collection), tweet);
    } catch (e) {
      throw e;
    }
  }

  public subscribeForUpdates(callback: Function) {
    const date = Date.now();
    const q = query(
      collection(this.db, this.collection),
      where("date", ">", date)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(
        (change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        },
        (error: unknown) => {
          console.log(error);
        }
      );
    });

    return unsubscribe;
  }

  async getTweets(date: number) {
    const q = query(
      collection(this.db, this.collection),
      where("date", "<", date),
      orderBy("date", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);

    const res: TweetProps[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data() as TweetProps);
    });
    return res;
  }
}
const tweetsDB = new TweetsDB();
export default tweetsDB;

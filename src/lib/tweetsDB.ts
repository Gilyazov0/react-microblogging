import {
  getFirestore,
  collection,
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
    const newDocRef = doc(collection(this.db, this.collection));
    const data = { ...tweet, tweetId: newDocRef.id };
    await this.writeData(this.db, this.collection, newDocRef.id, data);
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

  async getTweets(date: number, uid = "") {
    try {
      const q = uid
        ? query(
            collection(this.db, this.collection),
            where("date", "<", date),
            where("userId", "==", uid),
            orderBy("date", "desc"),
            limit(10)
          )
        : query(
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
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
const tweetsDB = new TweetsDB();
export default tweetsDB;

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
    const q = query(collection(this.db, this.collection));
    onSnapshot(q, (snapshot) => {
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
  }

  async getTweets() {
    const querySnapshot = await getDocs(collection(this.db, this.collection));

    const res: TweetProps[] = [];
    querySnapshot.forEach((doc) => {
      res.push(doc.data() as TweetProps);
    });

    this.sortTweets(res);

    return res;
  }

  private sortTweets(tweets: TweetProps[]) {
    tweets.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
  }
}
const tweetsDB = new TweetsDB();
export default tweetsDB;

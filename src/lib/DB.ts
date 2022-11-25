import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  getDocs,
} from "firebase/firestore";
import moment from "moment";
import { TweetProps } from "../Types/TweetProps";
import Firebase from "./Firebase";

class DB extends Firebase {
  db: Firestore;
  constructor() {
    super();
    this.db = getFirestore(this.app);
  }

  async postTweet(tweet: TweetProps) {
    try {
      await addDoc(collection(this.db, "tweets"), tweet);
    } catch (e) {
      throw e;
    }
  }

  async getTweets() {
    const querySnapshot = await getDocs(collection(this.db, "tweets"));

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
const db = new DB();
export default db;

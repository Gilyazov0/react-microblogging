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

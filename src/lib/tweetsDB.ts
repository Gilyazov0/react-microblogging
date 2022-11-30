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
  private db: Firestore;
  private collection: string;
  constructor() {
    super();
    this.db = getFirestore(this.app);
    this.collection = "tweets";
  }

  public async postTweet(tweet: TweetProps) {
    const newDocRef = doc(collection(this.db, this.collection));
    const data = { ...tweet, tweetId: newDocRef.id };
    await this.writeData(this.db, this.collection, newDocRef.id, data);
  }

  public async toggleLike(tweetId: string, uid: string) {
    const likes = await this.getLikes(tweetId);
    const index = likes.indexOf(uid);
    if (index === -1) {
      likes.push(uid);
      await this.writeData(this.db, this.collection, tweetId, { likes: likes });
    } else {
      likes.splice(index, 1);
      await this.writeData(this.db, this.collection, tweetId, { likes: likes });
    }
  }

  private async getLikes(tweetId: string) {
    const data = await this.getData(this.db, this.collection, tweetId);
    return (data?.likes ? data.likes : []) as string[];
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

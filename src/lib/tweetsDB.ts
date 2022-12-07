import {
  getFirestore,
  collection,
  Firestore,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import Firebase from "./Firebase";
import { TweetProps } from "../Types/TweetProps";
import ViewType from "../Types/ViewType";
import userDB from "./usersDB";

class TweetsDB extends Firebase {
  private db: Firestore;
  private collection: string;
  private queryLimit: number;

  constructor() {
    super();
    this.db = getFirestore(this.app);
    this.collection = "tweets";
    this.queryLimit = 10;
  }

  public async postTweet(tweet: TweetProps) {
    await this.writeDataWithId(this.db, this.collection, tweet);
  }

  public async toggleLike(tweetId: string, uid: string) {
    await this.toggleDataInArray(
      "likes",
      this.db,
      this.collection,
      tweetId,
      uid
    );
  }

  public subscribeForUpdates(callback: Function) {
    const date = Date.now();
    const q = query(
      collection(this.db, this.collection),
      where("date", ">", date)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(
        async (change) => {
          if (change.type === "added") {
            const tweet = change.doc.data() as TweetProps;
            await userDB.addUserDataToTweet(tweet);
            callback(tweet);
          }
        },
        (error: unknown) => {
          console.log(error);
        }
      );
    });

    return unsubscribe;
  }

  public async getTweets(date: number, uid: string = "", view: ViewType) {
    try {
      const q = this.getQuery(date, uid, view);
      const querySnapshot = await getDocs(q);
      const res: TweetProps[] = [];
      querySnapshot.forEach((doc) => {
        const tweet = doc.data();
        const like = this.checkDataInArray(tweet, uid, "likes");
        res.push({ ...tweet, like } as TweetProps);
      });
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async SearchTweets(data: string): Promise<TweetProps[]> {
    const res: TweetProps[] = await this.Search(this.db, this.collection, data);
    const promises: Promise<any>[] = [];

    res.forEach((tweet) => {
      promises.push(userDB.addUserDataToTweet(tweet));
    });

    const tweets = await Promise.all(promises);

    return tweets as TweetProps[];
  }

  private getQuery(date: number, uid: string, view: ViewType) {
    switch (view) {
      case "all tweets":
        return query(
          collection(this.db, this.collection),
          where("date", "<", date),
          orderBy("date", "desc"),
          limit(this.queryLimit)
        );
      case "my tweets":
        return query(
          collection(this.db, this.collection),
          where("date", "<", date),
          where("userId", "==", uid),
          orderBy("date", "desc"),
          limit(this.queryLimit)
        );
      case "liked":
        return query(
          collection(this.db, this.collection),
          where("date", "<", date),
          where("likes", "array-contains", uid),
          orderBy("date", "desc"),
          limit(this.queryLimit)
        );
    }
  }

  private checkDataInArray(
    data: { [key: string]: any },
    uid: string,
    fieldName: string
  ) {
    if (!data[fieldName]) return false;
    return (data[fieldName] as string[]).indexOf(uid) !== -1;
  }
}

const tweetsDB = new TweetsDB();
export default tweetsDB;

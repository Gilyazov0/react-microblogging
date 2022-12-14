import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import Firebase from "./Firebase";
import { TweetProps } from "../Types/TweetProps";
import ViewType from "../Types/ViewType";
import userDB from "./usersDB";

class TweetsDB extends Firebase {
  private collection: CollectionReference<DocumentData>;
  private queryLimit: number;

  constructor() {
    super();
    this.collection = collection(this.db, "tweets");
    this.queryLimit = 10;
  }

  public async postTweet(tweet: TweetProps) {
    const id = await this.writeDataWithId(this.collection, tweet);
    if (tweet.replyTo && id)
      await this.toggleDataInArray(
        "replies",
        this.collection,
        tweet.replyTo,
        id
      );
  }

  public async toggleLike(tweetId: string, uid: string) {
    await this.toggleDataInArray("likes", this.collection, tweetId, uid);
  }

  public subscribeForUpdates(callback: Function) {
    const date = Date.now();
    const q = query(this.collection, where("date", ">", date));
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

  public async getTweets(
    date: number,
    uid: string = "",
    view: ViewType | "by id",
    ids: string[] = []
  ) {
    try {
      const q = this.getQuery(date, uid, view, ids);
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
    const res: TweetProps[] = await this.Search(this.collection, data);
    const promises: Promise<any>[] = [];

    res.forEach((tweet) => {
      promises.push(userDB.addUserDataToTweet(tweet));
    });

    const tweets = await Promise.all(promises);

    return tweets as TweetProps[];
  }

  private getQuery(
    date: number,
    uid: string,
    view: ViewType | "by id",
    ids: string[]
  ) {
    let constraint: QueryConstraint[] = [
      where("date", "<", date),
      orderBy("date", "desc"),
      limit(this.queryLimit),
      where("replyTo", "==", ""),
    ];
    switch (view) {
      case "all tweets":
        break;

      case "my tweets":
        constraint.push(where("userId", "==", uid));
        break;

      case "liked":
        constraint.push(where("likes", "array-contains", uid));
        break;
      case "by id":
        constraint = [where("id", "in", ids), orderBy("date", "desc")];
        break;
    }
    return query(this.collection, ...constraint);
  }

  private checkDataInArray(
    data: { [key: string]: any },
    uid: string,
    fieldName: string
  ) {
    if (!data[fieldName] || !(data[fieldName] instanceof Array)) return false;
    return (data[fieldName] as string[]).indexOf(uid) !== -1;
  }
}

const tweetsDB = new TweetsDB();
export default tweetsDB;

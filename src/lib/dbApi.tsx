import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  getDocs,
} from "firebase/firestore";
import moment from "moment";
import { TweetProps } from "../Types/TweetProps";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

class DB {
  private readonly firebaseConfig = {
    apiKey: "AIzaSyDTcRKH3Z0bdupcM_qBVGjiDcrz3GKu-mQ",
    authDomain: "micro-blogging--app.firebaseapp.com",
    projectId: "micro-blogging--app",
    storageBucket: "micro-blogging--app.appspot.com",
    messagingSenderId: "224728624560",
    appId: "1:224728624560:web:9c96fdbe87b3b7d82d7a75",
    measurementId: "G-ZL712TRRHW",
  };

  app: FirebaseApp;
  db: Firestore;
  constructor() {
    // Initialize Firebase
    this.app = initializeApp(this.firebaseConfig);
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

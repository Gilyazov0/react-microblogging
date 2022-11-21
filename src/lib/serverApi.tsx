import { TweetProps } from "../Types/TweetProps";

export default class API {
  private static url =
    "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

  static async getTweets(): Promise<TweetProps[] | null> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data.tweets;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async postTweet(tweet: TweetProps) {
    try {
      const response = await fetch(this.url + "sds", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweet),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

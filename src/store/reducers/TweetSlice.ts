import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TweetProps } from "../../Types/TweetProps";
import tweetsDB from "../../lib/tweetsDB";
import userDB from "../../lib/usersDB";
import { RootState } from "../store";

interface TweetState {
  tweets: TweetProps[];
  isLoading: boolean;
  lastTweetDate: number;
  hasMore: boolean;
}

const initialState: TweetState = {
  tweets: [],
  isLoading: false,
  lastTweetDate: Infinity,
  hasMore: true,
};

export const getTweets = createAsyncThunk(
  "tweet/get",
  async function a(_, { getState }): Promise<TweetProps[]> {
    const state = getState() as RootState;

    const uid = state.user.user?.uid;
    if (!uid) return [];

    const date = state.tweet.lastTweetDate;
    const view = state.view.view;

    const newTweets = await tweetsDB.getTweets(date, uid, view);
    for (const tweet of newTweets) {
      await userDB.addUserDataToTweet(tweet);
    }

    return newTweets as TweetProps[];
  }
);

export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
    resetTweets(state) {
      state.tweets = [];
      state.lastTweetDate = Date.now();
    },
    addTweet(state, action: PayloadAction<TweetProps>) {
      const tweets = state.tweets;
      tweets.unshift(action.payload);
      state.tweets = tweets;
    },
  },
  extraReducers: {
    [getTweets.fulfilled.type]: (
      state,
      action: PayloadAction<TweetProps[]>
    ) => {
      state.isLoading = false;

      const newTweets = action.payload;
      if (newTweets.length === 0) {
        state.hasMore = false;
      } else {
        state.tweets = state.tweets.concat(newTweets);
        state.lastTweetDate = newTweets[newTweets.length - 1].date;
      }
    },
    [getTweets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTweets.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default tweetSlice.reducer;

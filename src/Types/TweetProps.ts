export interface TweetProps {
  content: string;
  userName?: string;
  date: number;
  userId: string;
  picture?: string;
  id?: string;
  like?: boolean;
  follow?: boolean;
  replyTo?: string;
}

export default interface UserData {
  email: string;
  picture?: string;
  displayName: string;
  uid: string;
  followers?: string[];
  follow?: string[];
}

import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth as AuthFB,
} from "firebase/auth";
import Firebase from "./Firebase";

class Auth extends Firebase {
  auth: AuthFB;
  constructor() {
    super();
    this.auth = getAuth(this.app);
  }

  public async createUser(
    email: string,
    password: string,
    displayName: string
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      this.logError(error);
    }

    await this.setUserData({ displayName });
  }

  public async setUserData(data: object) {
    if (!this.auth.currentUser) return;
    try {
      await updateProfile(this.auth.currentUser, data);
      console.log(data);
      console.log("profile updated", this.auth.currentUser);
    } catch (error) {
      this.logError(error);
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      this.logError(error);
    }
  }

  public getUserName() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) return user.displayName ? user.displayName : user.email;
      return "";
    });
  }

  private logError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("code", errorCode, "message", errorMessage);
  }
}

const auth = new Auth();

export default auth;

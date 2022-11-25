import {
  getAuth,
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

  async createUser(email: string, password: string, displayName: string) {
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

  async setUserData(data: object) {
    if (!this.auth.currentUser) return;
    try {
      await updateProfile(this.auth.currentUser, data);
      console.log(data);
      console.log("profile updated", this.auth.currentUser);
    } catch (error) {
      this.logError(error);
    }
  }

  async signIn(email: string, password: string) {
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

  logError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("code", errorCode, "message", errorMessage);
  }
}

export default Auth;

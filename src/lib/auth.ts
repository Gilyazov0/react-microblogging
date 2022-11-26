import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
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
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.logError(error);
    }

    await this.setUserData({ displayName });
  }

  public async setUserData(data: object) {
    if (!this.auth.currentUser) return;
    try {
      await updateProfile(this.auth.currentUser, data);
    } catch (error) {
      this.logError(error);
    }
  }

  public async logIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.logError(error);
    }
  }

  public async logOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      this.logError(error);
    }
  }

  public async getUserName(cb: Function) {
    onAuthStateChanged(this.auth, (user) => {
      cb(user);
    });
  }

  public async signInGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      this.logError(error);
    }
  }

  private logError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(
      "Error in the process of authorization. Code:",
      errorCode,
      "message:",
      errorMessage
    );
  }
}

const auth = new Auth();

export default auth;

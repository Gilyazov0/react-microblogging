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
import userDB from "./usersDB";
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
      const userCredentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      userDB.writeUserData(userCredentials.user.uid, { email, displayName });
    } catch (error) {
      this.logError(error);
      throw "Something went wrong. Check... everything";
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
      throw "Something went wrong. Check... everything";
    }
  }

  public async logOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      this.logError(error);
    }
  }

  public async getUserUid(cb: Function) {
    onAuthStateChanged(this.auth, (user) => {
      cb(user?.uid ? user.uid : null);
    });
  }

  public async signInGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(this.auth, provider);
      const { uid, email, displayName } = userCredentials.user;
      userDB.writeIfNotExist(uid, { email, displayName });
    } catch (error) {
      this.logError(error);
    }
  }

  private logError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(
      `Error in the process of authorization. Code: ${errorCode}, message:${errorMessage}`
    );
  }
}

const auth = new Auth();

export default auth;

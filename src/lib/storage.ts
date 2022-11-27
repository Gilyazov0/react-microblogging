import Firebase from "./Firebase";
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { nanoid } from "nanoid";

class Storage extends Firebase {
  private storage: FirebaseStorage;
  private workFolder: string;
  constructor(workFolder = "") {
    super();
    this.storage = getStorage(this.app);
    this.workFolder = workFolder;
  }

  public async storeFile(file: File) {
    const uniqName = this.getUniqName(file.name);
    const fileRef = ref(this.storage, this.workFolder + uniqName);
    await uploadBytes(fileRef, file);
    return uniqName;
  }

  public async getUrl(fileName: string) {
    try {
      const fileRef = ref(this.storage, this.workFolder + fileName);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
  public async delFile(fileName: string) {
    const fileRef = ref(this.storage, this.workFolder + fileName);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.log(error);
    }
  }

  private getUniqName(fileName: string) {
    return nanoid() + "." + fileName.split(".")[1];
  }
}

const storage = new Storage("profileImages/");
export default storage;

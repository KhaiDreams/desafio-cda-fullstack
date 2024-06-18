import { initializeApp } from "firebase/app";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBCIPbd8ejdAoggzgLVJSGzPei_dKl479I",

  authDomain: "urban-vogue-br.firebaseapp.com",

  projectId: "urban-vogue-br",

  storageBucket: "urban-vogue-br.appspot.com",

  messagingSenderId: "812157076861",

  appId: "1:812157076861:web:3bd25c7bd04f35d1a8f814",

  measurementId: "G-E1JEYW67EF",
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const UploadImage = async (file: FileList): Promise<string> => {
  try {
    const storageRef = ref(storage, `images/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(new Error(error.message));
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error: any) {
            reject(new Error(error.message));
          }
        }
      );
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

// initializeApp(firebaseConfig);
// export const database = getFirestore()

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF8gisRvhq_52RsFAirZ42mJKbFu-AKSM",
  authDomain: "jade-10af5.firebaseapp.com",
  projectId: "jade-10af5",
  storageBucket: "jade-10af5.appspot.com",
  messagingSenderId: "415628306391",
  appId: "1:415628306391:web:6ed51cb0d319e320964d92",
};

export const app: any = initializeApp(firebaseConfig);
export const database = getFirestore();
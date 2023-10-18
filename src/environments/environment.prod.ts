import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyBNlMMiCSH4F5UXjqwJBuBh2Ctg5r5XQog",
    authDomain: "studysync-a6a22.firebaseapp.com",
    databaseURL: "https://studysync-a6a22-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "studysync-a6a22",
    storageBucket: "studysync-a6a22.appspot.com",
    messagingSenderId: "234746284018",
    appId: "1:234746284018:web:ee150c3e45647369730d6b",
    measurementId: "G-TR41WV1H3W"
  },
};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

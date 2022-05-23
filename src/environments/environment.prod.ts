import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCKrJzoiYBP4yCEw7QkE9Hs55zzo3Q6OAo",
    authDomain: "grupovita-20718.firebaseapp.com",
    databaseURL: "https://grupovita-20718-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "grupovita-20718",
    storageBucket: "grupovita-20718.appspot.com",
    messagingSenderId: "1064394827395",
    appId: "1:1064394827395:web:f18d0b81e1c65890faddb6",
    measurementId: "G-9VY0FJ20RQ"
  },
};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

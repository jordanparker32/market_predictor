import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/performance";

firebase.initializeApp({
  apiKey: "AIzaSyBePYt4po-65S1bD06QZrD1cBwdssY2Mvk",
  authDomain: "istock-8f293.firebaseapp.com",
  databaseURL: "https://istock-8f293.firebaseio.com",
  projectId: "istock-8f293",
  storageBucket: "istock-8f293.appspot.com",
  messagingSenderId: "240658509404",
  appId: "1:240658509404:web:4a2a72f4a434e8648c0099",
  measurementId: "G-4VVRD6EQ7M"
});

export default firebase;
export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const performance = firebase.performance();

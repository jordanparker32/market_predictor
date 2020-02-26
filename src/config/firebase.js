import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBePYt4po-65S1bD06QZrD1cBwdssY2Mvk",
    authDomain: "istock-8f293.firebaseapp.com",
    databaseURL: "https://istock-8f293.firebaseio.com",
    projectId: "istock-8f293",
    storageBucket: "istock-8f293.appspot.com",
    messagingSenderId: "240658509404",
    appId: "1:240658509404:web:4a2a72f4a434e8648c0099",
    measurementId: "G-4VVRD6EQ7M"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire
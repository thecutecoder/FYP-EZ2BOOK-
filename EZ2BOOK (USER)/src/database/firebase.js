// Import the functions you need from the SDKs you need

import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQkTQi-Lx7OMnayTXcihJ-BLJbgKfXWNM",
  authDomain: "dbez2book.firebaseapp.com",
  projectId: "dbez2book",
  storageBucket: "dbez2book.appspot.com",
  messagingSenderId: "452435083510",
  appId: "1:452435083510:web:33fc6e5d3319a5f5726cd7"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.firestore().settings({ experimentalForceLongPolling: true})
let app;
 if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
} else {
  app =firebase.app();
}
const auth =firebase.auth();
const database = app.firestore();
const storage = firebase.storage();



export {auth, database, storage}
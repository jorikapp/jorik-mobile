import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA6gKbEHRubREVXcWsFArm97xwY75IUeqo",
    authDomain: "jorik-mobile.firebaseapp.com",
    databaseURL: "https://jorik-mobile-default-rtdb.firebaseio.com",
    projectId: "jorik-mobile",
    storageBucket: "jorik-mobile.appspot.com",
    messagingSenderId: "546523952092",
    appId: "1:546523952092:web:83ceea0c45236bd1e9d519"
};

firebase.initializeApp(firebaseConfig)
export const database = firebase.database();
export const firebaseAuth = firebase.auth();


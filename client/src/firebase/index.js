import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCSKeeGUqRxailuknUQd-zgu0fGj_vE4Wg",
    authDomain: "henry-e-commerce-6-8.firebaseapp.com",
    databaseURL: "https://henry-e-commerce-6-8.firebaseio.com",
    projectId: "henry-e-commerce-6-8",
    storageBucket: "henry-e-commerce-6-8.appspot.com",
    messagingSenderId: "796048033497",
    appId: "1:796048033497:web:21286d0e1ec854a26aa0c8",
    measurementId: "G-N0YR4J8NB5"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {storage, firebase as default}
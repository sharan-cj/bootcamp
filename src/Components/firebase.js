import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBmq-HH_2KXA-fXhqLz6m2GW4hqasJ-cCE",
    authDomain: "bootcamp-6bf24.firebaseapp.com",
    databaseURL: "https://bootcamp-6bf24.firebaseio.com",
    projectId: "bootcamp-6bf24",
    storageBucket: "bootcamp-6bf24.appspot.com",
    messagingSenderId: "827573410512",
    appId: "1:827573410512:web:58172a5f543ccb41cbdcd5"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export {storage, firebase as default};
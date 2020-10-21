import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKjok7P-H4dqQYkzOwwBtQh7xW9xAOffg",
  authDomain: "slack-clone-c314b.firebaseapp.com",
  databaseURL: "https://slack-clone-c314b.firebaseio.com",
  projectId: "slack-clone-c314b",
  storageBucket: "slack-clone-c314b.appspot.com",
  messagingSenderId: "209816179002",
  appId: "1:209816179002:web:8e1e31fac530ae727a4003",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

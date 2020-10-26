import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCZGXNtDjAajIl-FBdXGjFXl0aqgN1NGRQ",
  authDomain: "slack-mern-clone.firebaseapp.com",
  databaseURL: "https://slack-mern-clone.firebaseio.com",
  projectId: "slack-mern-clone",
  storageBucket: "slack-mern-clone.appspot.com",
  messagingSenderId: "1073859580398",
  appId: "1:1073859580398:web:9f5f4fa5e33f046a9fbeff",
  measurementId: "G-SLMTFMMLW6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

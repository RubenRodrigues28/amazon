import firebase from "firebase";

const firebaseConfig = JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG!, 'base64').toString('ascii'));

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();

export default db;
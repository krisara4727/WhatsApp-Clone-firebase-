// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCxpaM7BpqJs6I0x2iu7FeH_J0K4qKRAqU",
    authDomain: "whatsapp-clone-74692.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-74692.firebaseio.com",
    projectId: "whatsapp-clone-74692",
    storageBucket: "whatsapp-clone-74692.appspot.com",
    messagingSenderId: "29729580432",
    appId: "1:29729580432:web:7a4f8a70b27983a735ff15",
    measurementId: "G-3L0P63BP2P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;

import firebase from 'firebase';
import "firebase/auth"
const firebaseConfig = {
     apiKey: "AIzaSyBr7XCUfTl0P5uBVJTURO17SO6Smhq2nSc",
	  authDomain: "voice-to-text-remainder.firebaseapp.com",
	  projectId: "voice-to-text-remainder",
	  storageBucket: "voice-to-text-remainder.appspot.com",
	  messagingSenderId: "728024899919",
	  appId: "1:728024899919:web:36c4bf2d4c555780fa253a",
  measurementId: "G-6QJ0DRQXX7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const auth = firebase.auth()
  export default firebase;
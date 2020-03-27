import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBXgjJPrKqYn1bgPLdqA0IgPe1bvlrQCgU",
    authDomain: "crwn-db-7f5f5.firebaseapp.com",
    databaseURL: "https://crwn-db-7f5f5.firebaseio.com",
    projectId: "crwn-db-7f5f5",
    storageBucket: "crwn-db-7f5f5.appspot.com",
    messagingSenderId: "931846892727",
    appId: "1:931846892727:web:ab4a17ee7a30bf70747132",
    measurementId: "G-D97BD4EF4E"
  };
// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase

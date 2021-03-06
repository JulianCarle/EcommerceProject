import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    // YOUR CONFIG HERE
    apiKey: "AIzaSyBXgjJPrKqYn1bgPLdqA0IgPe1bvlrQCgU",
    authDomain: "crwn-db-7f5f5.firebaseapp.com",
    databaseURL: "https://crwn-db-7f5f5.firebaseio.com",
    projectId: "crwn-db-7f5f5",
    storageBucket: "crwn-db-7f5f5.appspot.com",
    messagingSenderId: "931846892727",
    appId: "1:931846892727:web:ab4a17ee7a30bf70747132",
    measurementId: "G-D97BD4EF4E"
  };
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    // create new object document
    if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message)
        }
    }
    return userRef
}

// Add data collection into firestore 
export const addCollectionsAndDocument = async (collectionKey,  objectsToAdd) => { 
    const collectionRef = firestore.collection(collectionKey)
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })
    return await batch.commit();
}
// Get the data collections from firestore into our app
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc =>{
        const { title, items } = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => { // convert the array collection to an object 
        accumulator[collection.title.toLowerCase()] = collection 
        return accumulator 
    }, {}) 
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase

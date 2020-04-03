import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBcqNvGgHtuAQZDchuta06Lf__DjakW-wo",
    authDomain: "e-commerce-52773.firebaseapp.com",
    databaseURL: "https://e-commerce-52773.firebaseio.com",
    projectId: "e-commerce-52773",
    storageBucket: "e-commerce-52773.appspot.com",
    messagingSenderId: "112163403620",
    appId: "1:112163403620:web:abb3f6dd9404b0f39fec71",
    measurementId: "G-2V0JEFZGY5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    if (!userAuth){
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
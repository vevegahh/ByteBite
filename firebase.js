// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgfiBzz5iijMO-bqijMZlAFxFkKsV88Lo",
    authDomain: "bytebite7488.firebaseapp.com",
    projectId: "bytebite7488",
    storageBucket: "bytebite7488.appspot.com",
    messagingSenderId: "60956023200",
    appId: "1:60956023200:web:08a514455cc37c95ee6cc5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

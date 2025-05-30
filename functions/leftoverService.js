import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const addLeftover = async (userId, item) => {
    const ref = collection(db, 'users', userId, 'leftovers');
    await addDoc(ref, item);
};

export const getLeftovers = async (userId) => {
    const ref = collection(db, 'users', userId, 'leftovers');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteLeftover = async (userId, itemId) => {
    const ref = doc(db, 'users', userId, 'leftovers', itemId);
    await deleteDoc(ref);
};

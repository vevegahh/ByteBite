import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const addIngredient = async (userId, item) => {
    const ref = collection(db, 'users', userId, 'ingredients');
    await addDoc(ref, item);
};

import { query, orderBy } from 'firebase/firestore';

export const getIngredients = async (userId) => {
    const ref = collection(db, 'users', userId, 'ingredients');
    const q = query(ref, orderBy('expiresOn'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const deleteIngredient = async (userId, itemId) => {
    const ref = doc(db, 'users', userId, 'ingredients', itemId);
    await deleteDoc(ref);
};


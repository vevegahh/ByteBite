import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

export const addIngredient = async (userId, item) => {
    const ref = collection(db, 'users', userId, 'ingredients');
    await addDoc(ref, item);
};

export const getIngredients = async (userId) => {
    const ref = collection(db, 'users', userId, 'ingredients');
    const q = query(ref, orderBy('expiresOn'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export async function getExpiringItems(userId) {
    const now = new Date();
    const threshold = new Date();
    threshold.setDate(now.getDate() + 3);

    const inventoryRef = collection(db, 'users', userId, 'ingredients');
    const q = query(inventoryRef, where('expiresOn', '<=', threshold.toISOString().split('T')[0]));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



export const deleteIngredient = async (userId, itemId) => {
    const ref = doc(db, 'users', userId, 'ingredients', itemId);
    await deleteDoc(ref);
};


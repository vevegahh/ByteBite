import { db } from './firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const addItemToInventory = async (userId, item) => {
    const userRef = collection(db, 'users', userId, 'inventory');
    await addDoc(userRef, item);
};

export const getInventory = async (userId) => {
    const userRef = collection(db, 'users', userId, 'inventory');
    const snapshot = await getDocs(userRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteItem = async (userId, itemId) => {
    const itemRef = doc(db, 'users', userId, 'inventory', itemId);
    await deleteDoc(itemRef);
};

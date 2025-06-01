import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getIngredients, deleteIngredient } from '../functions/ingredientService';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebase';

export default function FridgeScreen() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const data = await getIngredients(userId);
            setInventory(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await deleteIngredient(userId, itemId);
            Alert.alert('Deleted', 'Item removed from fridge');
            fetchInventory();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.details}>Qty: {item.quantity}</Text>
            <Text style={styles.details}>Expires: {item.expiresOn}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#F4C430" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Fridge</Text>
            <FlatList
                data={inventory}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.navigate('AddItem')}
            >
                <Text style={styles.addText}>+ Add New Ingredient</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F4C430',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemCard: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#666',
    },
    deleteBtn: {
        marginTop: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#e74c3c',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtn: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#F4C430',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

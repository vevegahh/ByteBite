import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getExpiringItems, getIngredients } from '../functions/ingredientService';
import { getRecipeSuggestions } from '../functions/recipeFunctions';
import { auth } from '../firebase/firebase';

export default function DashboardScreen() {
    const [expiringItems, setExpiringItems] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = auth.currentUser?.uid;
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!userId) return;
        try {
            const expiring = await getExpiringItems(userId);
            setExpiringItems(expiring);

            const inventory = await getIngredients(userId);
            const ingredientNames = inventory.map(item => item.name.toLowerCase());

            const recipeResults = await getRecipeSuggestions(ingredientNames);
            setRecipes(recipeResults);
            setLoading(false);
        } catch (err) {
            console.error('Error loading dashboard:', err);
            setLoading(false);
        }
    };

    const renderExpiringItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.details}>Expires on: {item.expiresOn}</Text>
        </View>
    );

    const renderRecipe = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.details}>
                Used: {item.usedIngredientCount} | Missing: {item.missedIngredientCount}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#F4C430" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Expiring Soon</Text>
            <FlatList
                data={expiringItems}
                renderItem={renderExpiringItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
            />

            <Text style={styles.header}>Recipes You Can Make</Text>
            <FlatList
                data={recipes}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 100,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#F4C430',
    },
    card: {
        backgroundColor: '#f1f1f1',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    recipeCard: {
        backgroundColor: '#fdfdfd',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipeImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
});

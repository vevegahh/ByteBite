import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_KEY = 'c1b0309aabe64bebae04f8ac7b0c4d5c'; // Replace this with your actual API key

export default function RecipeDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { recipeId } = route.params;

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${recipeId}/information`,
                    {
                        params: { apiKey: API_KEY },
                    }
                );
                setRecipe(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#F4C430" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>

            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {recipe.extendedIngredients.map((item, index) => (
                <Text key={index} style={styles.ingredient}>• {item.original}</Text>
            ))}

            <Text style={styles.sectionTitle}>Ready in:</Text>
            <Text style={styles.serving}>{recipe.readyInMinutes} minutes</Text>

            <TouchableOpacity
                style={styles.makeButton}
                onPress={() => navigation.navigate('Instructions', { steps: recipe.analyzedInstructions })}
            >
                <Text style={styles.makeButtonText}>Make this recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#F4C430',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 6,
    },
    serving: {
        fontSize: 16,
        marginBottom: 20,
    },
    makeButton: {
        backgroundColor: '#F4C430',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    makeButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

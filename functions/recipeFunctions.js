import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

import axios from 'axios';

const API_KEY = 'c1b0309aabe64bebae04f8ac7b0c4d5c';

const BASE_URL = 'https://api.spoonacular.com';

/**
 * Get recipes based on ingredients you have
 * @param {string[]} ingredients - array of ingredient names (e.g., ['egg', 'tomato'])
 * @returns {Promise<Array>} recipes
 */
export const getRecipesFromAPI = async (ingredients) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
            params: {
                ingredients: ingredients.join(','),
                number: 5,
                ranking: 1,
                ignorePantry: true,
                apiKey: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

/**
 * Optional: Get full recipe details including instructions
 * @param {number} id - recipe ID
 * @returns {Promise<Object|null>}
 */
export const getRecipeDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
            params: {
                includeNutrition: false,
                apiKey: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null;
    }
};

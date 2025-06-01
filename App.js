// CORRECT
//import HomeScreen from './HomeScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FrontScreen from './screens/FrontScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import DietPreferencesScreen from './screens/DietPreferencesScreen';
import CuisinePreferencesScreen from './screens/CuisinePreferencesScreen';
import DashboardScreen from './screens/DashboardScreen';
import FridgeScreen from './screens/FridgeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
// Add any additional screens like AddItem, Instructions, etc. if you have them

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Front"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Front" component={FrontScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="DietPreferences" component={DietPreferencesScreen} />
                <Stack.Screen name="CuisinePreferences" component={CuisinePreferencesScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Fridge" component={FridgeScreen} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
                {/* Add screens like AddItem or Finish if needed */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

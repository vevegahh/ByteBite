// DietPreferencesScreen.js – updated with Bytebite logo and transition to CuisinePreferences
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const DIET_OPTIONS = [
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Keto',
    'Gluten-Free',
    'Dairy-Free',
    'Meat',
    'Egg',
];

export default function DietPreferencesScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);

    const handleContinue = async () => {
        if (!selected) {
            Alert.alert('Please select a diet preference.');
            return;
        }
        try {
            const userId = auth.currentUser?.uid;
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, { diet: selected });
            navigation.navigate('CuisinePreferences');
        } catch (err) {
            Alert.alert('Error saving preference', err.message);
        }
    };

    const handleSkip = () => {
        navigation.navigate('CuisinePreferences');
    };

    const renderOption = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, selected === item && styles.selectedCard]}
            onPress={() => setSelected(item)}
        >
            <Text style={styles.cardText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Diet Preferences</Text>

            <View style={styles.stepsContainer}>
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>1</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>2</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.inactiveStep]}><Text style={styles.stepText}>3</Text></View>
            </View>

            <FlatList
                data={DIET_OPTIONS}
                renderItem={renderOption}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.grid}
            />

            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
        </View>
    );
}

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#000',
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    stepCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: '#F4C430',
    },
    inactiveStep: {
        backgroundColor: '#aaa',
    },
    stepText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    stepLine: {
        width: 30,
        height: 2,
        backgroundColor: '#F4C430',
    },
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 24,
    },
    card: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        margin: 6,
    },
    selectedCard: {
        borderColor: '#F4C430',
        backgroundColor: '#FFF8DC',
    },
    cardText: {
        fontSize: 14,
        color: '#000',
    },
    continueBtn: {
        backgroundColor: '#F4C430',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    continueText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    skipBtn: {
        marginTop: 16,
    },
    skipText: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'underline',
    },
});
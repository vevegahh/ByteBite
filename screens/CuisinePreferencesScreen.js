// CuisinePreferencesScreen.js – based on Figma design
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const CUISINE_OPTIONS = [
    'Italian', 'Japanese', 'Chinese',
    'Mexican', 'Mediterranean', 'French',
    'Indian', 'Thai',
];

export default function CuisinePreferencesScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState([]);

    const toggleCuisine = (cuisine) => {
        if (selected.includes(cuisine)) {
            setSelected(selected.filter(item => item !== cuisine));
        } else {
            setSelected([...selected, cuisine]);
        }
    };

    const handleContinue = async () => {
        try {
            const userId = auth.currentUser?.uid;
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, { cuisines: selected });
            navigation.navigate('Finish');
        } catch (err) {
            Alert.alert('Error saving preferences', err.message);
        }
    };

    const handleSkip = () => {
        navigation.navigate('Finish');
    };

    const renderOption = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, selected.includes(item) && styles.selectedCard]}
            onPress={() => toggleCuisine(item)}
        >
            <Text style={styles.cardText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />

            <Text style={styles.title}>Cuisine Preferences</Text>

            <View style={styles.stepsContainer}>
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>1</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>2</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>3</Text></View>
            </View>

            <FlatList
                data={CUISINE_OPTIONS}
                renderItem={renderOption}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.grid}
            />

            <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>skip for now</Text>
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
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    continueText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    skipBtn: {
        marginTop: 12,
    },
    skipText: {
        fontSize: 14,
        color: '#333',
        textDecorationLine: 'underline',
    },
});
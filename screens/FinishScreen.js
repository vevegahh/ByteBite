// FinishScreen.js – Based on Figma design
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FinishScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />

            <Text style={styles.title}>Congratulations</Text>

            {/* Step Progress Indicator */}
            <View style={styles.stepsContainer}>
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>1</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>2</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>3</Text></View>
            </View>

            <Image source={require('../assets/finish_logo.png')} style={styles.fridgeImage} />

            <Text style={styles.subtitle}>You're registered & connected!</Text>

            <TouchableOpacity
                style={styles.startBtn}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Text style={styles.startText}>Let's get started!</Text>
            </TouchableOpacity>
        </View>
    );
}

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 24,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
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
    fridgeImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 36,
    },
    startBtn: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    startText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});

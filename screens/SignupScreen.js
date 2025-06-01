// SignupScreen.js – Updated to match latest Figma design
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../functions/authFunctions';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';


export default function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const handleSignup = async () => {
        try {
            const userCred = await registerUser(email, password);
            await setDoc(doc(db, 'users', userCred.user.uid), { email });
            navigation.navigate('DietPreferences');
        } catch (error) {
            Alert.alert('Signup failed', error.message);
        }
    };

    const handleGoogleSignup = () => {
        Alert.alert('Google Sign Up', 'Feature coming soon');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />

            <Text style={styles.title}>Create an account</Text>

            <View style={styles.stepsContainer}>
                <View style={[styles.stepCircle, styles.activeStep]}><Text style={styles.stepText}>1</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.inactiveStep]}><Text style={styles.stepText}>2</Text></View>
                <View style={styles.stepLine} />
                <View style={[styles.stepCircle, styles.inactiveStep]}><Text style={styles.stepText}>3</Text></View>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter Your Password"
                    placeholderTextColor="#888"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Ionicons
                        name={secureText ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
                <Text style={styles.signupText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>────────  or continue with  ────────</Text>

            <TouchableOpacity onPress={handleGoogleSignup}>
                <Image source={require('../assets/google_button.png')} style={styles.googleImage} />
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                    Log in
                </Text>
            </Text>
        </View>
    );
}

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFEF4',
        padding: 24,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 24,
        color: '#000',
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 6,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 24,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        fontSize: 15,
    },
    signupBtn: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    signupText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    orText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#555',
        marginBottom: 12,
    },
    googleImage: {
        width: 36,
        height: 36,
        alignSelf: 'center',
        marginBottom: 24,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
    },
    loginLink: {
        color: '#007AFF',
        fontWeight: '500',
    },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../authFunctions';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const user = await registerUser(email, password);
            console.log('Signed up as:', user.email);
            navigation.navigate('Dashboard'); // redirect after signup
        } catch (error) {
            Alert.alert('Signup failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>ByteBite</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
                <Text style={styles.signupText}>Let’s get started!</Text>
            </TouchableOpacity>

            <Text style={styles.or}>or continue with</Text>

            <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.googleText}>Signup with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    signupBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    signupText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    or: {
        fontSize: 16,
        color: '#666',
        marginVertical: 20,
    },
    googleBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#DB4437',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    googleText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        fontSize: 16,
        color: '#007BFF',
        marginTop: 20,
    },
});
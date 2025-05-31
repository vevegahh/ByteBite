import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../authFunctions'; // make sure this path matches your project structure

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await loginUser(email, password);
            console.log('Logged in as:', user.email);
            // Navigate to Dashboard or Fridge after successful login
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Login failed', error.message);
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

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.or}>or continue with</Text>

            <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.googleText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Don’t have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#F4C430',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    loginBtn: {
        backgroundColor: '#F4C430',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#000',
        fontWeight: 'bold',
    },
    or: {
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
    },
    googleBtn: {
        backgroundColor: '#4285F4',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    googleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signupLink: {
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

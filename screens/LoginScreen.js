import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    CheckBox,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../authFunctions';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    };

    const handleGoogleLogin = () => {
        Alert.alert('Google Sign-In', 'Feature coming soon');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>

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

            <View style={styles.rowContainer}>
                <View style={styles.rememberContainer}>
                    <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>────────  or continue with  ────────</Text>

            <TouchableOpacity onPress={handleGoogleLogin}>
                <Image source={require('../assets/google_button.png')} style={styles.googleImage} />
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Don’t have an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
}

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
        marginBottom: 8,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        fontSize: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#000',
    },
    forgot: {
        color: '#E57373',
        fontSize: 14,
    },
    loginBtn: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    loginText: {
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
    signupLink: {
        color: '#007AFF',
        fontWeight: '500',
    },
});

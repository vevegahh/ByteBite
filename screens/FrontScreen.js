import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FrontScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/bytebite_logo.png')} style={styles.logo} />
            <Text style={styles.appName}>ByteBite</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFEF4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 48,
        color: '#000',
    },
    button: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 32,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
});

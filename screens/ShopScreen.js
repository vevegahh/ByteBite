// ShopScreen.js – Entry screen with scan and manual update options
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ShopScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/cart_image.png')} // cart image
                style={styles.cartImage}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ScanReceipt')}
            >
                <Text style={styles.buttonText}>Scan my receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ManualInput')}
            >
                <Text style={styles.buttonText}>Update manually</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    cartImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 48,
    },
    button: {
        backgroundColor: '#FFD700',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        marginVertical: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});

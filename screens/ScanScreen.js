import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

import colors from '../colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function ScanScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Se requieren permisos de camara</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No se otorgaron permisos de camara</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {hasPermission && isFocused && (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}

                />
            )}
            {scanned && <TouchableHighlight onPress={() => setScanned(false)} style={styles.scanBtn} underlayColor={colors.secondary}>
                <Text style={styles.textBtn}>Escanear</Text>
            </TouchableHighlight>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10
    },
    scanBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    textBtn: {
        color: colors.white,
        fontSize: 16
    }
});
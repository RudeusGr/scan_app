import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../colors';

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
        let date = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        let dataSave = [];
        dataSave.push({ 'code': data, 'date': date });
        AsyncStorage.getItem('data')
            .then((dataStorage) => {
                const tempData = JSON.parse(dataStorage);
                tempData.push(dataSave[0])
                AsyncStorage.setItem('data', JSON.stringify(tempData));
            })
            .catch(() => {
                AsyncStorage.setItem('data', JSON.stringify(dataSave));
            })
        alert(`Se escaneo el codigo ${data} con fecha de ${date}`);
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
            {scanned && <TouchableHighlight onPress={() => setScanned(false)} style={styles.scanBtn} underlayColor={Colors.secondary}>
                <Text style={styles.textBtn}>Escanear</Text>
            </TouchableHighlight>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
        backgroundColor: Colors.primary,
    },
    textBtn: {
        color: Colors.white,
        fontSize: 16
    }
});
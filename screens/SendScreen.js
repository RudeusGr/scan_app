import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from "../colors";
import colors from '../colors';

const sendData = () => {
    AsyncStorage.clear();
    alert('Datos borrados');
}

const viewData = () => {
    AsyncStorage.getItem('data')
        .then((data) => {
            if (JSON.parse(data) != null) {
                alert('Informacion guardada:\n' + JSON.parse(data));
                console.log(JSON.parse(data));
            } else {
                alert('No hay datos que mostrar')
            }
        })
}

export default function SendScreen() {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 200, marginBottom: 15 }}
                source={require('../assets/gm-logo.png')}
            />
            <TouchableHighlight onPress={sendData} style={styles.scanBtn} underlayColor={colors.secondary}>
                <Text style={styles.textBtn}>Enviar Datos</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={viewData} style={styles.scanBtn} underlayColor={colors.secondary}>
                <Text style={styles.textBtn}>Ver Datos</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    scanBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        margin: 10
    },
    textBtn: {
        color: Colors.white,
        fontSize: 16
    }
});
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Colors from "../colors";
import colors from '../colors';

const sendData = () => {
    alert('Enviando datos');
}

const viewData = () => {
    alert('Mostrando datos');
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
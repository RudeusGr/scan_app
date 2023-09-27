import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

import Colors from "../colors";

export default function SendScreen() {

    const [isModalVisible, setModalVisible] = useState(false);

    const [storage, setStorage] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const sendData = () => {
        AsyncStorage.clear();
        alert('Datos borrados');
    }

    const viewData = () => {
        AsyncStorage.getItem('data')
            .then((data) => {
                if (JSON.parse(data) != null) {
                    setStorage(JSON.parse(data));
                    toggleModal();
                } else {
                    alert('No hay datos que mostrar')
                }
            })
    }

    const Item = ({ data }) => (
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Registro {data.index}:</Text>
            <Text style={styles.itemText}>Codigo: {data.item.code}</Text>
            <Text style={styles.itemText}>Fecha: {data.item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 200, marginBottom: 15 }}
                source={require('../assets/gm-logo.png')}
            />

            <TouchableHighlight onPress={sendData} style={styles.scanBtn} underlayColor={Colors.secondary}>
                <Text style={styles.textBtn}>Enviar Datos</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={viewData} style={styles.scanBtn} underlayColor={Colors.secondary}>
                <Text style={styles.textBtn}>Ver Datos</Text>
            </TouchableHighlight>

            <Modal isVisible={isModalVisible}>
                <View style={styles.container}>

                    <FlatList
                        data={storage}
                        renderItem={(element) => <Item data={element} />}
                        style={styles.scrollView}
                    />

                    <TouchableHighlight onPress={toggleModal} style={styles.scanBtn} underlayColor={Colors.secondary}>
                        <Text style={styles.textBtn}>Cerrar</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
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
    scrollView: {
        flex: 1,
        width: '100%',
        height: '80%',
        backgroundColor: Colors.white,
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
    },
    item: {
        width: '90%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginBottom: 10
    },
    itemText: {
        color: Colors.white,
        fontSize: 12
    },
    itemTitle: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    }
});
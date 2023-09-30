import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

import Colors from "../colors";

export default function SendScreen() {

    const [isModalVisible, setModalVisible] = useState(false);

    const [storage, setStorage] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const viewData = async () => {
        try {
            const storageData = await AsyncStorage.getItem('data');
            if (storageData == null) {
                alert('No hay datos que mostrar');
            } else {
                setStorage(JSON.parse(storageData));
                toggleModal();
            }
        } catch (err) {
            alert('No hay datos para mostrar');
        }
    }

    const sendMail = async () => {
        try {
            const storageData = await AsyncStorage.getItem('data');
            if (storageData == null) {
                alert('No hay datos para enviar');
            } else {
                const json = await JSON.parse(storageData);
                let data = '';
                let index = 1;
                json.forEach(element => {
                    data += 'index=' + index + '&code=' + element.code + '&date=' + element.date + '&';
                    index++;
                });

                data = data.substring(0, data.length - 1);

                const xhr = new XMLHttpRequest();
                xhr.open("POST", "https://script.google.com/macros/s/AKfycbzGbuiGxl9PF-NVGNxYuySnhrJ_h5HDC4xIHGvxw2NJ0VZsUbafON59BD1_jqRbr7Y3HQ/exec", true);

                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.send(data);

                xhr.onload = function () {
                    if (xhr.status != 200) {
                        alert(`Error ${xhr.status}: ${xhr.statusText}`);
                    } else {
                        alert(`Datos enviados`);
                        AsyncStorage.removeItem('data');
                    }
                };
            }
        } catch (err) {
            alert('No hay datos registrados');
        }
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

            <TouchableHighlight onPress={sendMail} style={styles.scanBtn} underlayColor={Colors.secondary}>
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
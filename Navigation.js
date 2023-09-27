import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import ScanScreen from './screens/ScanScreen';
import SendScreen from './screens/SendScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Opciones"
            screenOptions={{
                tabBarActiveTintColor: 'red'
            }}
        >
            <Tab.Screen
                name="Opciones"
                component={SendScreen}
                options={{
                    tabBarLabel: 'Opciones',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="send" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={ScanScreen}
                options={{
                    tabBarLabel: 'Scanner',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="scan1" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}
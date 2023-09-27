import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import ScanScreen from './screens/ScanScreen';
import SendScreen from './screens/SendScreen';
import Colors from './colors';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Menu'
            screenOptions={{
                tabBarActiveTintColor: Colors.primary
            }}
        >
            <Tab.Screen
                name='Menu'
                component={SendScreen}
                options={{
                    headerTintColor: Colors.primary,
                    headerTitleAlign: 'center',
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='send' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name='Scanner'
                component={ScanScreen}
                options={{
                    headerTintColor: Colors.primary,
                    headerTitleAlign: 'center',
                    tabBarLabel: 'Scanner',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='scan1' size={size} color={color} />
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
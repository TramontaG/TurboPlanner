import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Movimentacao from './pages/Movimentacao';

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <NavigationContainer independent={true}>
        <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={Home}/>
            <BottomTab.Screen name="Movimentação" component={Movimentacao}/>
        </BottomTab.Navigator>
    </NavigationContainer>
)

export default Router = () => (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator}/>
        </Stack.Navigator>
    </NavigationContainer>
)
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Movimentacao from './pages/Movimentacao';
import Categorias from './pages/Categorias';

//AccountPages
import Resume from './pages/AccountPages/Resume';
import History from './pages/AccountPages/History';
import Overview from './pages/AccountPages/Overview';
import Planning from './pages/AccountPages/Planning';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const AccountStack = createStackNavigator();

const AccountNavigator = () => (
    <NavigationContainer independent={true}>
        <AccountStack.Navigator headerMode="none" initialRouteName="Resume">
            <AccountStack.Screen name="History" component= {History} />
            <AccountStack.Screen name="Overview" component= {Overview} />
            <AccountStack.Screen name="Planning" component= {Planning} />
            <AccountStack.Screen name="Resume" component= {Resume} />
        </AccountStack.Navigator>
    </NavigationContainer>
)

const BottomTabNavigator = () => (
    <NavigationContainer independent={true}>
        <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={Home}/>
            <BottomTab.Screen name="Movimentação" component={Movimentacao}/>
            <BottomTab.Screen name="Categorias" component={Categorias}/>
            <BottomTab.Screen name="Minhas contas" component={AccountNavigator} />
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
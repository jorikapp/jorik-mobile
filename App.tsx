import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/LoginPage'
import RegistrationPage from './src/RegistrationPage'
import HomePage from './src/HomePage'

const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage}/>
                <Stack.Screen name="Registration" component={RegistrationPage}/>
                <Stack.Screen name="Home" component={HomePage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}



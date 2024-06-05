/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../types';
import Home from '../views/Home';
import AddFood from '../views/AddFood';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerTintColor: '#fff'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, title: 'Inicio'}}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{headerShown: false, title: 'Agregar Comidas'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

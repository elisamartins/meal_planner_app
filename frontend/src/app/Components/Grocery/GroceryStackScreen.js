import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroceryItemsScreen from './GroceryItemsScreen/GroceryItemsScreen';
import GroceryListScreen from './GroceryListScreen/GroceryListScreen';

const Stack = createStackNavigator();

const GroceryStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroceryListScreen"
        component={GroceryListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Grocery Items"
        component={GroceryItemsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default GroceryStackScreen;

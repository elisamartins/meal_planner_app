import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipeComponent from './RecipeComponent';
import RecipeListScreen from './RecipeListScreen';
import RecipeListElement from './RecipeListElement';

const Stack = createStackNavigator();

const RecipeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecipeListScreen"
        component={RecipeListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeComponent"
        component={RecipeComponent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RecipeStackScreen;

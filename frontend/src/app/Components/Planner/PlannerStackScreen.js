import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DayPlannerScreen from './DayPlannerScreen';

const Stack = createStackNavigator();

const GroceryStackScreen = () => {
  return (

      <Stack.Navigator>
          <Stack.Screen
              name="DayPlannerScreen"
              component={DayPlannerScreen}
              options={{ headerShown: false }}/>
      </Stack.Navigator>

  );
};

export default GroceryStackScreen;

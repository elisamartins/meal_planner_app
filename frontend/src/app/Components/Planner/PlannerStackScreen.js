import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DayPlannerScreen from './DayPlannerScreen';
import DayPlannerSection from './DayPlannerSection';
import FoodPlannerSearchScreen from './FoodPlannerSearchScreen';

const Stack = createStackNavigator();

const PlannerStackScreen = () => {
  return (
    
    <Stack.Navigator>
      <Stack.Screen
              name="DayPlannerSection"
              component={DayPlannerSection}
        options={{ headerShown: false }} />
      <Stack.Screen
              name="FoodPlannerSearchScreen"
              component={FoodPlannerSearchScreen}
              options={{ headerShown: false }}/>
      </Stack.Navigator>

  );
};

export default PlannerStackScreen;

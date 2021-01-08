import 'react-native-gesture-handler';
import React, {  } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from '../../../CustomIcon'
import RecipeScreen from './Recipe/RecipeScreen'
import PlannerScreen from './Planner/PlannerScreen'
import GroceryListScreen from './GroceryList/GroceryListScreen'
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
} from 'react-native';

// https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
const {
  width: SCREEN_WIDTH,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const Tab = createBottomTabNavigator();


const HomeScreen: () => React$Node = () => {

  return (
    
      <Tab.Navigator
      
      screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Planner') {
              iconName = "plan";
            } else if (route.name === 'GroceryList') {
              iconName = "list";
            } else if (route.name === 'Recipe') {
              iconName = "recipe";
          }
          
          return <CustomIcon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'turquoise',
          inactiveTintColor: 'gray',
          tabStyle: {
            fontSize: normalize(15),
            fontFamily: 'Open sans',
          },
        }}
      >
        <Tab.Screen 
          name="GroceryList"
        component={GroceryListScreen}
          options={{ title: 'Épicerie'}}
        />
        <Tab.Screen
          name="Planner"
          component={PlannerScreen}
          options={{ title: 'Plan' }}
        />
        <Tab.Screen
          name="Recipe"
          component={RecipeScreen}
          options={{ title: 'Recettes' }}
        />
      </Tab.Navigator>
  );
};


export default HomeScreen;

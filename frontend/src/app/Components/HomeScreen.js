import 'react-native-gesture-handler';
import React, {  } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from '../../../CustomIcon'
import RecipeScreen from './RecipeScreen'
import PlannerScreen from './Planner/PlannerStackScreen'
import GroceryStackScreen from './Grocery/GroceryStackScreen'
import {
  Dimensions,
  PixelRatio,
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


const HomeScreen = () => {

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

          
          return <CustomIcon name={iconName} size={size} color={color} style={{fontSize: 40}}/>;
        },
        })}
      tabBarOptions={{
        style: {
          height: 70,
        },
        tabStyle: {
            height: 70,
          },
          activeTintColor: '#000',
          inactiveTintColor: '#D3D3D3',
          labelStyle: {
            fontFamily: 'Open sans',
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen 
          name="GroceryList"
        component={GroceryStackScreen}
          options={{ title: 'ÉPICERIE'}}
        />
        <Tab.Screen
          name="Planner"
          component={PlannerScreen}
        options={{ title: 'PLAN' }}
        />
        <Tab.Screen
          name="Recipe"
          component={RecipeScreen}
          options={{ title: 'RECETTES' }}
        />
      </Tab.Navigator>
  );
};


export default HomeScreen;

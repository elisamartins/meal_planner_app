/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/app/Components/HomeScreen'
import LoginScreen from './src/app/Components/LoginScreen'
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


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;

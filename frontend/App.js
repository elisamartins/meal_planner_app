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

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
      
      screenOptions={{
        cardStyle: { backgroundColor: '#BFE3F7' }
    }}>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login',  headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home',  headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;

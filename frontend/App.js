import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/app/Components/HomeScreen';
import LoginScreen from './src/app/Components/Login/LoginScreen';
import { headerColor } from './src/Constants';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: headerColor }
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

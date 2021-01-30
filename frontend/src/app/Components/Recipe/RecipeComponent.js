import 'react-native-gesture-handler';
import React from 'react';
import {
    Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const Tab = createMaterialTopTabNavigator();

const RecipeComponent = ({  }) => {
    return <SafeAreaView>
        <Text>Titre de la recette</Text>
        <Image></Image>
        <Tab.Navigator>
        <Tab.Screen 
          name="GroceryList"
        options={{ title: 'Ingrédients' }}
        
        />
        <Tab.Screen
          name="Planner"
        options={{ title: 'Préparation' }}
        />
        <Tab.Screen
          name="Recipe"
          options={{ title: 'Apport alimentaire' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
    
};

export default RecipeComponent;

import 'react-native-gesture-handler';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RecipeListElement = ({item, navigation}) => {
  const navigateToRecipeComponent = () => {
    console.log(item.recipeName);
    navigation.navigate('RecipeComponent', {
      item: item,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToRecipeComponent}>
      <View style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.recipeName}>{item.recipeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  recipeName: {
    fontSize: 16,
    fontFamily: 'SFUIDisplay-Light',
    flexShrink: 1,
    flex: 1,
    textAlign: 'center',
  },
});

export default RecipeListElement;

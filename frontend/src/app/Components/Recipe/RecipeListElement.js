import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RecipeListElement = ({ item }) => {

  return (
    <View style={{backgroundColor: 'white', padding: 10, marginHorizontal: 10, marginVertical: 5, flexDirection:'row', alignItems:'center'}}>

      <Image source={item.image} style={{width: 100, height: 100, borderRadius: 100/ 2, marginRight: 10}} />
      <Text style={styles.title}>{item.recipeName}</Text>
      <Text style={styles.title}>{item.imageName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkedItem: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 2,
    alignItems: 'center',
  },
  uncheckedItem: {
    fontSize: 16,
    fontFamily: 'sans-serif-thin',
    textDecorationLine: 'line-through',
    },
      header: {
        marginLeft: 15,
        paddingVertical: 10,
        flex: 1,
        fontWeight: 'bold'
      },
      title: {
        fontSize: 14
      },
});

export default RecipeListElement;
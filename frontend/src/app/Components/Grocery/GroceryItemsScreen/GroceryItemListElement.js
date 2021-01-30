import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GroceryItemListElement = ({item}) => {
  const [isChecked, setChecked] = useState(item.checked);
  const checkItem = () => {
    fetch('http://192.168.0.158:5000/checkGroceryItem/' + item.groceryItemID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(!item.checked),
    })
      .then(setChecked(!isChecked))
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={checkItem}>
        <Text style={isChecked ? styles.checkedItem : styles.uncheckedItem}>
          {item.foodName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkedItem: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: 'black'
  },
  item: {
    padding: 15,
    flex: 1,
    backgroundColor: '#FFF'
  },
  uncheckedItem: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: 'lightgray',
    textDecorationLine: 'line-through',
  },
});

export default GroceryItemListElement;

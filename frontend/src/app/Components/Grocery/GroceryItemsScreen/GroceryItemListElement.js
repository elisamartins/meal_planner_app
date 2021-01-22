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
});

export default GroceryItemListElement;

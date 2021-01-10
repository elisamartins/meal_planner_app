import 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react';
import FoodItemSearchBar from './SearchBar'
import {
  ActivityIndicator,
  Divider,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
} from "react-native";

const Item = ({ item }) => {
  const [isSelected, setSelection] = useState(item.checked);
  
  const checkItem = () => {
    console.log(item.groceryItemID);
    setSelection(!isSelected);

    fetch('http://192.168.0.158:5000/checkGroceryItem/14', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(!isSelected)
    })
      .then(console.log("Putting..."))
      .catch((error) => console.error("error"));

    };

  return (
    <View style={styles.item}>
        <CheckBox
          value={isSelected}
          onValueChange={checkItem}
          tintColors={{ true: 'turquoise', false: 'black' }}
        />
      <Text>{item.foodName}</Text>
    </View>
  )
};

const GroceryListScreen = () => {

  const [groceryList, setGroceryList] = useState({
    groceryListID: 0,
    name: "",
    categories: [],
  });
  
  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryList/3')
    .then(console.log("Fetching grocery list ..."))
    .then((response) => { return response.json(); })
    .then((json) => {
      setGroceryList(json);
      console.log("Done fetching.")
    })
    .catch((error) => console.error(error))
  }, [addItem]);
  
  const [formattedGroceryList, setFormattedGroceryList] = useState();
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("Formatting groceryList");
    setFormattedGroceryList(groceryList.categories.map((data) => {
      return {
        title: data.category,
        data: data.items.map(i => { return {foodName: i.foodName, foodID: i.foodID, checked: i.checked, groceryItemID: i.groceryItemID} }),
      }
    }));
    setLoading(false);
  }, [groceryList]);
 

  const addItem = (foodID) => {
    console.log("Adding item: " + foodID);

    fetch('http://192.168.0.158:5000/groceryItem/3', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(foodID)
    })
      .then(console.log("Posting..."))
      .catch((error) => console.error("error"));

    };
  
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <SafeAreaView style={styles.container}>
      
          <FoodItemSearchBar selectItem={addItem} style={{zindex:1}}/>
    
          <SectionList
            sections={formattedGroceryList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item item={item} />}
            renderSectionHeader={({ section: { title } }) => (<Text style={styles.header}> {title.toUpperCase()} </Text>)}
            SectionSeparatorComponent = {Divider}

          />
      
        </SafeAreaView>)}
        </View>
  
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: 10,
  },
  
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
});

export default GroceryListScreen;

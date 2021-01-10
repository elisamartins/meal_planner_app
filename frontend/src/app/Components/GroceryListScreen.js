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

const Item = ({ itemName }) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.item}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          tintColors={{ true: 'turquoise', false: 'black' }}
        />
      <Text>{itemName}</Text>
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
        data: data.items.map(i => i.foodName),
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
      
          <FoodItemSearchBar selectItem={addItem}/>
    
          <SectionList
            sections={formattedGroceryList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item itemName={item} />}
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

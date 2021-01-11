import 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react';
import FoodItemSearchBar from './SearchBar'
import { Divider } from 'react-native-elements';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  View,
} from "react-native";

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Item = ({ item }) => {
  const [isSelected, setSelection] = useState(item.checked);
  
  const checkItem = () => {
    console.log(item.groceryItemID);
    setSelection(!isSelected);

    fetch('http://192.168.0.158:5000/checkGroceryItem/' + item.groceryItemID, {
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
          tintColors={{ true: '#BFE3F7', false: 'black' }}
        />
      <Text style={{fontSize: 16}}>{item.foodName}</Text>
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
  <>
    {isLoading ? <ActivityIndicator /> : (
      <SafeAreaView style={styles.container}>
      
          <FoodItemSearchBar selectItem={addItem} style={{zindex:1, height:height}}/>
        <View style={styles.listContainer}>
    
          <SectionList
            sections={formattedGroceryList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item item={item} />}
              renderSectionHeader={({ section: { title } }) => (<View>
                <Text style={styles.header}> {title.toUpperCase()}</Text>
                <Divider style={{ backgroundColor: '#ABC' }} />
              </View>)}
          
          />
        
      
        </View>
        </SafeAreaView>)}
  </>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  header: {
    marginTop: 20,
    fontSize: 20
  },
  
  item: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 2,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default GroceryListScreen;

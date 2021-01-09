import 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'
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

  const [isLoading, setLoading] = useState(true);
  const [groceryList, setGroceryList] = useState([]);
  const [formattedGroceryList, setFormattedGroceryList] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryList/1')
      .then((response) => response.json())
      .then((json) => {
        setGroceryList(json);
      })
      .catch((error) => console.error("error"))
      .finally(() => {
        setFormattedGroceryList(groceryList.categories.map((data) => {
          return {
            title: data.category,
            data: data.items.map(i => i.foodName),
          }
        })
        );
        setLoading(false);
  })
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <SafeAreaView style={styles.container}>
      
          <SearchBar/>
    
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
    marginHorizontal: 5
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

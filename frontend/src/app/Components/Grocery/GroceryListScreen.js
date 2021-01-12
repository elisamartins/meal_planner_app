import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ item, navigation }) => (
  <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Grocery Items', {ID: item.groceryListID, title: item.name})}>
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
  </TouchableOpacity>
);

const GroceryListScreen = ({navigation}) => {
  
  const [groceryList, setGroceryList] = useState({});
  
  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryLists/jean')
    .then(console.log("Fetching grocery lists ..."))
    .then((response) => { return response.json(); })
    .then((json) => {
      setGroceryList(json);
      console.log("Done fetching grocery lists.");
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, []);
  
  const [isLoading, setLoading] = useState(true);
  
  const createNewList = () => {
    fetch('http://192.168.0.158:5000/groceryList/jean', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      //body: JSON.stringify(foodID)
    })
      .then(console.log("Posting..."))
      .then((response) => { return response.json(); })
      .then((json) => {
        console.log(json);
    })
      .catch((error) => console.error(error));
  };
  
  return (
    <>
      {isLoading ? <ActivityIndicator /> : (
        <SafeAreaView style={styles.container}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>LISTES D'ÉPICERIES</Text>
          <FlatList
            data={groceryList}
            renderItem={({ item }) => <Item item={item} navigation={navigation}/>}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{
          height: 0.5,
          backgroundColor: "#D3D3D3",
        }}
      />}
          />
          <TouchableOpacity style={styles.addButton} onPress={createNewList}>
            <Icon name="plus" size={12} color="#FFF" />
            <Text style={styles.addButtonText} >CRÉER UNE NOUVELLE LISTE</Text>
          </TouchableOpacity>
        </SafeAreaView>)}
      </>
  );
    
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#32D9C5',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'sans-serif',
    marginLeft: 5
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
  },
});


export default GroceryListScreen;

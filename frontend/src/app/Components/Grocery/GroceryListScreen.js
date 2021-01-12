import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Grocery Items', {ID: item.groceryListID})}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const GroceryListScreen = ({navigation}) => {
  
  const [groceryList, setGroceryList] = useState({
    groceryListID: 0,
    username: "",
    name: "",
  });
  
  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryLists/jean')
    .then(console.log("Fetching grocery lists ..."))
    .then((response) => { return response.json(); })
    .then((json) => {
      setGroceryList(json);
      console.log("Done fetching.");
    })
      .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, []);
  
  const [isLoading, setLoading] = useState(true);


  return (
    <>
      {isLoading ? <ActivityIndicator /> : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={groceryList}
            renderItem={({ item }) => <Item item={item} navigation={navigation}/>}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>)}
      </>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


export default GroceryListScreen;

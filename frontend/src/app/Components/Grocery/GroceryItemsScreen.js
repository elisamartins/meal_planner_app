import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import FoodItemSearchBar from '../SearchBar'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Item = ({ item }) => {
  const [isChecked, setChecked] = useState(item.checked);
  const checkItem = () => {
    fetch('http://192.168.0.158:5000/checkGroceryItem/' + item.groceryItemID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(!item.checked)
    })
      .then(console.log("Putting..."))
      .then(setChecked(!isChecked))
      .catch((error) => console.error(error));
    
    };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={checkItem}>
        <Text style={isChecked ? styles.checkedItem : styles.uncheckedItem}>{item.foodName}</Text>
      </TouchableOpacity>
      
    </View>
  )
};

const GroceryItemsScreen = ({ route, navigation }) => {

  const [groceryList, setGroceryList] = useState({
    groceryListID: 0,
    name: "",
    categories: [],
  });
  
  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryList/' + route.params.ID)
    .then(console.log("Fetching grocery list items ..."))
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
  }, [groceryList, isLoading]);
 

  const addItem = (foodID) => {
    console.log("Adding item: " + foodID);

    fetch('http://192.168.0.158:5000/groceryItem/' + route.params.ID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(foodID)
    })
      .then(console.log("Posting..."))
      .catch((error) => console.error(error));

  };
  
  const updateTitle = (title) => {
    fetch('http://192.168.0.158:5000/groceryList/' + route.params.ID, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(title)
    })
      .then(console.log("Putting..."))
      //.then(setChecked(!isChecked))
      .catch((error) => console.error(error));
  }


    return (
        <>
          {isLoading ? <ActivityIndicator /> : (
                <SafeAreaView style={styles.container}>
                <View style={styles.screenHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('GroceryListScreen')}>
                <Icon name="arrow-left-circle" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{groceryList.name.toUpperCase()}</Text>
              {/* <TextInput style={styles.headerTitle} placeholder="Titre" onChangeText={title => updateTitle(title)}>{groceryList.name.toUpperCase()}</TextInput> */}
                </View>
                  <FoodItemSearchBar selectItem={addItem} style={{ zindex: 1 }} />
            <View style={styles.listContainer}>
              {groceryList.categories.length == 0 ? 
                <View style={{alignSelf: 'center', justifyContent:'center', flex:1}}><Text>Aucun article</Text></View> : 
                <SectionList
                          sections={formattedGroceryList}
                          keyExtractor={(item, index) => item + index}
                          renderItem={({ item }) => <Item item={item} />}
                          renderSectionHeader={({ section: { title } }) => (
                              <View style={styles.category}>
                                  <Text style={styles.categoryHeader}> {title.toUpperCase()}</Text>
                              </View>)} />
              }
         
                  </View>
                </SafeAreaView>)}
        </>
    )
};

const getColor = (category) => {
  switch (category) {
    case 'FRUITS ET LÉGUMES':
      return "#ADD932"
    
    case 'VIANDES ET POISSONS':
      return "#FF5E71"
    
    case 'PRODUITS LAITIERS ET OEUFS':
      return "#82DFFC"
    
    case 'ÉPICES ET FINES HERBES':
      return "#FF5E71"
    
    case 'CÉRÉALES, GRAINS ET PÂTES':
      return "#FD5618"
    
    case 'BOULANGERIE':
      return "#E7D681"
    
    case 'JUS ET BOISSONS':
      return "#FF3DD4"
    
    case 'PRÊTS-À-MANGER':
      return "#75A1CA"
    
    case 'NOIX ET GRAINES':
      return "#D3AA93"
    
    case 'GRIGNOTISES ET SUCRERIES':
      return "#32D9C5"
    
    case 'PRODUITS POUR BÉBÉ':
      return "#D1A9F0"
    
    case 'AUTRES':
        return "#C2D6D8"

  }
}

const styles = StyleSheet.create({
    category: {
        backgroundColor: "#D1A9F0",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 10
    },
    container: {
        flex: 1,
        //backgroundColor: '#FFF'
    },
  checkedItem: {
      fontSize: 16,
      fontFamily: 'sans-serif',
    },
    uncheckedItem: {
        fontSize: 16,
        fontFamily: 'sans-serif-thin',
        textDecorationLine: 'line-through'
    },
    categoryHeader: {
        fontSize: 20,
        fontFamily: 'sans-serif-light',
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
  headerTitle: {
    fontSize: 20,
    fontFamily: "SFUIDisplay-Bold",
    marginLeft: 15,
    color: '#FFF'
},
    screenHeader: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#40c5d1',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
});

export default GroceryItemsScreen;

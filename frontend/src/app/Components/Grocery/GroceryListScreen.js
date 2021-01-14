import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ item, navigation, getList }) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const longPress = () => {
    setDeleteButtonVisible(!deleteButtonVisible);
  }

  const deleteList = () => {
    fetch('http://192.168.0.158:5000/groceryList/' + item.groceryListID, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.ok) {
          getList();
          setDeleteButtonVisible(false);
        }
      })
      .then(console.log("Deleting list"))
      .catch((error) => console.error(error));
    
    
  }
  return (
    <View style={{flexDirection: 'row', alignItems:"center"}}>

    <Pressable style={styles.listItem} onLongPress={longPress} onPress={() => navigation.navigate('Grocery Items', { ID: item.groceryListID, title: item.name })}>
        <TouchableOpacity><Text style={styles.title}>{item.name.toUpperCase()}</Text></TouchableOpacity>
    </Pressable>
        
        {deleteButtonVisible ?
          <TouchableOpacity onPress={deleteList}> 
            <Icon name="trash" size={25} color="#000" />
            </TouchableOpacity> 
          : <></>
        }
      </View>
  )
};

const GroceryListScreen = ({navigation}) => {
  
  const [groceryList, setGroceryList] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getList()
  }, []);
  
  const getList = () => {
    fetch('http://192.168.0.158:5000/groceryLists/jean')
    .then(console.log("Fetching grocery lists ..."))
    .then((response) => { return response.json(); })
    .then((json) => {
      setGroceryList(json);
      console.log("Done fetching grocery lists.");
    })
    .then(setLoading(false))
    .catch((error) => console.error(error))
  }
  
  const createNewList = () => {
    fetch('http://192.168.0.158:5000/groceryList/jean', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
    })
      .then(console.log("Posting..."))
      .then((response) => {

        if (response.ok) {
          getList();
        }

        return response.json();
      })
      .then((json) => {
        console.log(json);
        navigation.navigate('Grocery Items', { ID: json });
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
            renderItem={({ item }) => <Item item={item} navigation={navigation} getList={getList}/>}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{
            height: 0.5,
            backgroundColor: "#D3D3D3",
        }}
      />}
          />
          <TouchableOpacity style={styles.addButton} onPress={createNewList}>
            <Icon name="plus" size={12} color="#FFF" />
            <Text style={styles.addButtonText} >CRÉER UNE LISTE</Text>
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
    backgroundColor: '#8bd0f7',
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});


export default GroceryListScreen;

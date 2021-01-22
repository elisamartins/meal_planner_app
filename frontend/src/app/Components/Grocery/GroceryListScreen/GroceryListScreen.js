import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {CreateListModal} from './CreateListModal';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-elements';

const Item = ({item, navigation, getList}) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const longPress = () => {
    setDeleteButtonVisible(!deleteButtonVisible);
  };

  const deleteList = () => {
    fetch('http://192.168.0.158:5000/groceryList/' + item.groceryListID, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          getList();
          setDeleteButtonVisible(false);
        }
      })
      .then(console.log('Deleting list'))
      .catch((error) => console.error(error));
  };

  const navigateToGroceryItems = (item) => {
    console.log(item);
    navigation.navigate('Grocery Items', {
      ID: item.groceryListID,
      title: item.name,
    });
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
      <Pressable
        style={styles.listItem}
        onPress={() => navigateToGroceryItems(item)}
        onLongPress={longPress}>
        <Text style={styles.title}>{item.name}</Text>
      </Pressable>

      {deleteButtonVisible ? (
        <TouchableOpacity onPress={deleteList}>
          <Icon name="trash" size={20} color="#000" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const GroceryListScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groceryList, setGroceryList] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch('http://192.168.0.158:5000/groceryLists/jean')
      .then(console.log('Fetching grocery lists ...'))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setGroceryList(json);
        console.log('Done fetching grocery lists.');
      })
      .then(setLoading(false))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.centeredView}>
            <CreateListModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              navigation={navigation}
            />
          </View>

          <View style={styles.screenHeader}>
            <Text style={styles.headerTitle}>Listes d'épicerie</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Icon name="plus" color="#FFF" size={25} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={groceryList}
            renderItem={({item}) => (
              <Item item={item} navigation={navigation} getList={getList} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider />}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#BFE3F7',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  addButtonText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'sans-serif',
    marginLeft: 5,
  },
  container: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#FFF',
    flex: 1,
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#40c5d1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default GroceryListScreen;

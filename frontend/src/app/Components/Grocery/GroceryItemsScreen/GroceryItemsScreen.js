import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import AddItemModal from './AddItemModal';
import {DUMMY_GROCERY_LIST} from '../../Data/DUMMY_GROCERY_LIST';
import GroceryItemListElement from './GroceryItemListElement';
import { headerColor } from '../../../../Constants';
import { Divider } from 'react-native-elements';

const GroceryItemsScreen = ({route, navigation}) => {
  const [groceryList, setGroceryList] = useState({
    groceryListID: 0,
    name: '',
    categories: [],
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('http://192.168.0.158:5000/groceryList/' + route.params.ID)
      .then(console.log('Fetching grocery list items ...'))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setGroceryList(json);
        console.log('Done fetching.');
      })
      .catch((error) => console.error(error));
  }, [addItem]);

  const [, setFormattedGroceryList] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Formatting groceryList');
    setFormattedGroceryList(
      groceryList.categories.map((data) => {
        return {
          title: data.category,
          data: data.items.map((i) => {
            return {
              foodName: i.foodName,
              foodID: i.foodID,
              checked: i.checked,
              groceryItemID: i.groceryItemID,
            };
          }),
        };
      }),
    );
    setLoading(false);
  }, [groceryList, isLoading]);

  const addItem = (foodID) => {
    console.log('Adding item: ' + foodID);

    fetch('http://192.168.0.158:5000/groceryItem/' + route.params.ID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodID),
    })
      .then(console.log('Posting...'))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <AddItemModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectItem={addItem}
          />
          <View style={styles.screenHeader}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('GroceryListsScreen')}>
                <Icon name="arrow-left-circle" size={25} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {groceryList.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {groceryList.categories.length == 1 ? (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text>Aucun article</Text>
              </View>
            ) : (
              <SectionList
                sections={DUMMY_GROCERY_LIST}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <GroceryItemListElement item={item} />}
                renderSectionHeader={({section: {title}}) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.categoryHeader}>
                      {' '}
                      {title.toUpperCase()}
                    </Text>
                  </View>
                    )}
                    ItemSeparatorComponent={() => <Divider/>}
              />
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
const getColor = (category) => {
  switch (category) {
    case 'FRUITS ET LÉGUMES':
      return '#ADD932';

    case 'VIANDES ET POISSONS':
      return '#FF5E71';

    case 'PRODUITS LAITIERS ET OEUFS':
      return '#82DFFC';

    case 'ÉPICES ET FINES HERBES':
      return '#FF5E71';

    case 'CÉRÉALES, GRAINS ET PÂTES':
      return '#FD8A5F';

    case 'BOULANGERIE':
      return '#DFC956';

    case 'JUS ET BOISSONS':
      return '#F09BDD';

    case 'PRÊTS-À-MANGER':
      return '#75A1CA';

    case 'NOIX ET GRAINES':
      return '#D3AA93';

    case 'GRIGNOTISES ET SUCRERIES':
      return '#32D9C5';

    case 'PRODUITS POUR BÉBÉ':
      return '#D1A9F0';

    case 'AUTRES':
      return '#C2D6D8';
  }
};

const getCategoryStyle = (category) => {
  return {
    // backgroundColor: getColor(category),
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 1,
  };
};

const styles = StyleSheet.create({
  category: {
    backgroundColor: '#D1A9F0',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
  categoryHeader: {
    marginLeft: 15,
    paddingVertical: 10,
    flex: 1,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Bold',
    marginLeft: 15,
    color: '#FFF',
  },
  listContainer: {
    flex: 1,
  },
  screenHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: headerColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GroceryItemsScreen;

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import DayPlannerSection from './DayPlannerSection';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
    Dimensions,
    FlatList,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View} from 'react-native';

const height = Dimensions.get('window').height

const Item = ({ item, sendItem }) => {
    const onPress = () => {
        sendItem();
    };
    return (<TouchableOpacity onPress={onPress}><Text style={{ marginVertical: 10 }}>{item.name}</Text></TouchableOpacity>)
}

const FoodPlannerSearchScreen = ({route, navigation}) => {
    const [query, setQuery] = useState('');
    const [foodItems, setFoodItems] = useState([global.foodItems]);

    const handleSearch = (text) => {
        setFoodItems(
            text == "" ?
            [] : global.foodItems.filter(item => { return contains(item, text.toLowerCase()); }).slice(0, 5)
        );
        setQuery(text);
        
    };
    
    const contains = ({ name }, query) => {
        return name.toLowerCase().startsWith(query) ? true : false;
    }

    const sendItem = () => {
        navigation.navigate('AddFoodScreen');
    };
    
  return (
      <SafeAreaView>
          <View style={styles.screenHeader}>
              <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => navigation.navigate('DayPlannerSection')}>
                  <Icon name="arrow-left-circle" size={25} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{route.params.sectionName}</Text>
          </View>
          <View style={{ padding: 10, margin: 5, backgroundColor: '#FFF', flexDirection:'row', alignItems: 'center' }}>
              <Icon name="magnifier" size={20} style={{marginRight: 10}}/>
                <TextInput
                    placeholder="Rechercher un aliment ... "
                    onChangeText={queryText => handleSearch(queryText)}
                    value={query} />  
          </View>
          
          {
                query === ""
                ?
                  <View style={styles.image_placeholder_container}>
                    {/* <Image  
                      source={require('../assets/search.png')} 
                      style={styles.searchImage}
                    />
                    <Text style={styles.searchText}>
                      Entrer le nom de l'article à chercher{"\n"}
                    </Text> */}
                  </View>
                :
                <FlatList
                    keyExtractor={item => item.FoodID}
                    data={foodItems}
                    renderItem={({ item }) => <Item sendItem={sendItem} item={item}/>
                    } />
        }


      </SafeAreaView>
  );
    
};

const styles = StyleSheet.create({
    closedList: {

    },
    headerTitle: {
        marginLeft: 15,
        fontSize: 20,
        fontFamily: "SFUIDisplay-Bold",
    },
    openedList: {
        position: 'relative',
        height: height,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: '#FFF'
    },
    screenHeader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#BFE3F7',
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    searchImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    searchText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    
});

export default FoodPlannerSearchScreen;

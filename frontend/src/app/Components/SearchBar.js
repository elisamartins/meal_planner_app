import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements'
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
} from "react-native";
import { TextInput } from 'react-native-gesture-handler';

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const fullHeight = {

}

const Item = ({ item, sendItem }) => {
    const onPress = () => {
        console.log(item.foodID);
        sendItem(item.foodID);
    };
    return (<TouchableOpacity onPress={onPress}><Text style={{ marginVertical: 10 }}>{item.name}</Text></TouchableOpacity>)
}

const FoodItemSearchBar = ({selectItem}) => {
    const [query, setQuery] = useState('');
    const [foodItems, setFoodItems] = useState([global.foodItems]);
    const [listIsOpened, setlistIsOpened] = useState(false);

    const handleSearch = text => {
        setFoodItems(
            text == "" ?
            [] : global.foodItems.filter(item => { return contains(item, text.toLowerCase()); }).slice(0, 5)
        );
        setQuery(text);
        setlistIsOpened(text == "" ? false : true);
        
    };
  
    const contains = ({ name }, query) => {
        return name.toLowerCase().startsWith(query) ? true : false;
    }

    const sendItem = (foodID) => {
        selectItem(foodID);
        setFoodItems([]);
        setlistIsOpened(false);
    };
    

    return (
        <SafeAreaView style={listIsOpened ? styles.openedList : {}}>
           
            <View style={{padding: 10, margin: 5, backgroundColor:'#FFF'}}>
                <TextInput style={styles.searchBar}
                    placeholder="Ajouter un article... "
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
    )
}
const styles = StyleSheet.create({
    openedList: {
        position: 'relative',
        height: height,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: '#FFF'
    },
    closedList: {

    },
    groceryName: {

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

export default FoodItemSearchBar;

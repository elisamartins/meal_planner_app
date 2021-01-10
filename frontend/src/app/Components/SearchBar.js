import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements'
import {
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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

    const handleSearch = text => {
        setFoodItems(
            text == "" ?
            [] : global.foodItems.filter(item => { return contains(item, text.toLowerCase()); }).slice(0, 5)
        );
        setQuery(text);
    };
  
    const contains = ({ name }, query) => {
        return name.toLowerCase().startsWith(query) ? true : false;
    }

    const sendItem = (foodID) => {
        selectItem(foodID);
    };
    

    return (
        <SafeAreaView style={styles.container}>
        <SearchBar
                placeholder="Ajouter un article... "
                onChangeText={queryText => handleSearch(queryText)}
                value={query}
            />
            <FlatList
                    keyExtractor={item => item.FoodID}
                    data={foodItems}
                    renderItem={({ item }) => <Item sendItem={sendItem} item={item}/>
                    } />
      
            </SafeAreaView>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default FoodItemSearchBar;

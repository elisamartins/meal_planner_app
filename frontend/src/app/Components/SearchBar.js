import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Divider, SearchBar } from 'react-native-elements'
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from "react-native";
import { TextInput } from 'react-native-gesture-handler';

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const Item = ({ item, sendItem }) => {
    const onPress = () => {
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
            [] : global.foodItems.filter(item => { return contains(item, text.toLowerCase()); }).slice(0, )
        );
        setQuery(text);
        
    };
  
    const contains = ({ name }, query) => {
        return name.toLowerCase().startsWith(query) ? true : false;
    }

    const sendItem = (foodID) => {
        selectItem(foodID);
        setQuery('')
    };
    

    return (
        <KeyboardAvoidingView>
        <SafeAreaView style={{height: height*0.4, width: width*0.75}}>
           
            <View style={{padding: 10, margin: 5, backgroundColor:'#FFF'}}>
                <TextInput style={styles.searchBar}
                    placeholder="Ajouter un article... "
                    onChangeText={queryText => handleSearch(queryText)}
                        value={query} />  
                    <Divider/>
            </View>
            {
                query === ""
                ?
                  <View style={styles.emptyList}>
                    <Text>Aucun item correspondant</Text>
                  </View>
                :
                <FlatList
                    keyExtractor={item => item.FoodID}
                    data={foodItems}
                    renderItem={({ item }) => <Item sendItem={sendItem} item={item}/>
                    } />
        }
                

        
            </SafeAreaView>
            </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    emptyList: {
        alignSelf: 'center',
        justifyContent: 'center',
      flex: 1,
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

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Itema = ({ item }) => {
    const onPress = () => console.log(item.foodID);
    return (<TouchableOpacity onPress={onPress}><Text style={{ marginVertical: 10 }}>{item.name}</Text></TouchableOpacity>)
}

const SearchBar = () => {
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

    return (
        <SafeAreaView style={styles.container}>
      
                <FlatList ListHeaderComponent={

                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 10,
                            marginVertical: 10,
                            borderRadius: 20
                        }}
                    >
            
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            value={query}
                            onChangeText={queryText => handleSearch(queryText)}
                            placeholder="Ajouter un article"
                            style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                        />
        
                    </View>
          
                }
                    keyExtractor={item => item.FoodID}
                    data={foodItems}
                    renderItem={({ item }) => <Itema  item={item}/>
                    } />
      
                  
        </SafeAreaView>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    padding: 5,
    
  },
});

export default SearchBar;

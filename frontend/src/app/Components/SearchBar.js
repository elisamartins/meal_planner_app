import 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox'
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Divider,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TextInput,
  View,
} from "react-native";

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
      
            <View>
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
        
                    data={foodItems}
                    renderItem={({ item }) => (<Text>{item.name}</Text>)} />
      
            </View>

                  
        </SafeAreaView>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5
  },
});

export default SearchBar;

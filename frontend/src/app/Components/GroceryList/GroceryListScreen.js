import 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox'
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TextInput,
  View,
} from "react-native";

const TEST_DATA = [
  {
    title: "Fruits et légumes",
    data: ["Tomate", "Banane", "Pomme"]
  },
  {
    title: "Viandes",
    data: ["Poulet", "Sardines", "Crevettes"]
  },
  {
    title: "Boulangerie",
    data: ["Pain", "Toast"]
  }
];

const Item = ({ title }) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.item}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          tintColors={{ true: 'turquoise', false: 'black' }}
        />
      <Text>{title}</Text>
    </View>
  )
};

const GroceryListScreen = () => {

  const [query, setQuery] = useState('');
  const [data, setData] = useState([global.foodItems]);

  const handleSearch = text => {
    setData(global.foodItems.filter(item => { return contains(item, text.toLowerCase()); }).slice(0, 5));
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
        
          data={data}
          renderItem= { ({ item }) => ( <Text>{item.name}</Text> ) } />
      
      </View>
    
  <SectionList
    sections={TEST_DATA}
    keyExtractor={(item, index) => item + index}
    renderItem={({ item }) => <Item title={item} />}
    renderSectionHeader={({ section: { title } }) => ( <Text style={styles.header}> {title.toUpperCase()} </Text> )}
      />
      
  </SafeAreaView>
  
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5
  },

  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },
  
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
});

export default GroceryListScreen;

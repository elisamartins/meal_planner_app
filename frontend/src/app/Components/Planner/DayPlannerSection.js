import 'react-native-gesture-handler';
import React, { } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Divider } from 'react-native-elements';

const DUMMY_DATA =[
    {
        title: "Petit déjeûner",
        data: [
            {
                foodName: "Carottes",
                amount: 150,
                unit: "g",
                calories: "20"
            },
            {
                foodName: "Gruau",
                amount: 300,
                unit: "g",
                calories: "259"
            },
            {
                foodName: "Sirop d'érable",
                amount: 30,
                unit: "ml",
                calories: "125"
            },
            ]
  },
  {
    title: "Déjeûner",
    data: [
        {
            foodName: "Spaghetti",
            amount: 200,
            unit: "g",
            calories: "450"
        },
        {
            foodName: "Patate douce",
            amount: 1,
            unit: "",
            calories: "259"
        },
        ]
  },
  {
    title: "Dîner",
    data: [
        {
            foodName: "Soupe",
            amount: 500,
            unit: "ml",
            calories: "500"
        },
        ]
},
]

const Item = ({ item }) => (
  <View style={{ flexDirection: 'row', backgroundColor: '#FFF'}}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.foodName}</Text>
      <Text style={styles.amountText}>{item.amount} {item.unit}</Text>
    </View>
    <Text style={{alignSelf:'center', marginRight: 15}}>{item.calories}</Text>
  </View>
);
      
const DayPlannerSection = () => {

  const onPress = () => {
    console.log("Adding food to journal")
  }
  
  return (
    <SafeAreaView>
      <SectionList
        sections={DUMMY_DATA}
        keyExtractor={(item, index) => item + index}
        
        renderItem={({ item }) => <Item item={item} />}
        
        renderSectionHeader={({ section: { title } }) => (
            
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.header}>{title.toUpperCase()}</Text>
            <TouchableOpacity style={{marginRight: 15}} onPress={onPress}>
              <Icon name="plus" size={12} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        
        renderSectionFooter={({ item }) => (
          <View style={{ paddingBottom: 5}}/>
        )}
        
        ItemSeparatorComponent={() => <Divider />}/>
      </SafeAreaView>
  );
    
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flex: 1,
  },
  header: {
    marginLeft: 15,
    paddingVertical: 10,
    flex: 1,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 14
  },
  amountText: {
    fontSize: 12,
    color: 'gray'
  }
})

export default DayPlannerSection;

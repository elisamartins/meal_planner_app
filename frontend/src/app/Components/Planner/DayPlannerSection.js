import 'react-native-gesture-handler';
import React, { } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
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
        <View style={styles.item}>
        <Text style={styles.title}>{item.foodName}</Text>
        <Text style={styles.title}>{item.amount} {item.unit}</Text>
        </View>
);
      
const DayPlannerSection = () => {


  
  return (
      <>
          <SectionList
        sections={DUMMY_DATA}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Text style={styles.header}>{title.toUpperCase()}</Text>
            <Divider />
          </View>
        )}
        renderSectionFooter={({ item }) => (
          <View style={{ paddingBottom: 5}}>
            <TouchableOpacity style={{flexDirection:'row', flex:1, alignItems:'center'}}>
              <Icon name="plus" size={16} color="#000" />
              <Text>AJOUTER UN ALIMENT</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        ItemSeparatorComponent={() => <Divider/>}
            />
      </>
  );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
      },
      item: {
        backgroundColor: "#FFF",
        padding: 10,
      },
      header: {
        fontSize: 20,
        backgroundColor: "#fff"
      },
      title: {
        fontSize: 16
      }
})

export default DayPlannerSection;

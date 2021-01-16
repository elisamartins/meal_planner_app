import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    SafeAreaView,
    SectionList,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
import { Divider, Input } from 'react-native-elements';
import { Picker } from '@react-native-community/picker'
import MacrosComponent from './MacrosComponent';

const DUMMY_DATA_PORTIONS = ["100 ml","50 g","1"];

const AddFoodScreen = ({navigation}) => {
    const [selectedPortion, setSelectedPortion] = useState("");
    const [portionQty, setPortionQty] = useState("0");
    const inputRef = useRef(null);
    
    const getPortionsList = () =>{
        return( DUMMY_DATA_PORTIONS.map( (x, i) => { 
              return( <Picker.Item label={x} key={i} value={x}  />)} ));
    }

    const saveItem = () => {
        navigation.navigate('DayPlannerSection');
    }

  return (
      <SafeAreaView>

          <View style={styles.screenHeader}>
              <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity  style={{alignSelf: 'center'}} onPress={() => navigation.navigate('FoodPlannerSearchScreen', {sectionName: "Petit déjeûner"})}>
                  <Icon name="arrow-left-circle" size={25} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Ajouter un aliment</Text>
              </View>
              <TouchableOpacity  style={{alignSelf: 'center'}} onPress={saveItem}>
                  <Icon name="check" size={25} color="#FFF" />
              </TouchableOpacity>
          </View>
          
          <View>
          <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => inputRef.current.focus()}>
              <View style={{flexDirection: 'row', padding: 10}}>
                  <Text style={{flex:1, fontSize: 16, alignSelf: 'center'}}>Nombre de portions</Text>
                  <TextInput style={{fontSize: 16, borderBottomWidth: 1, borderColor: 'gray', padding: 0}} onChangeText={val => setPortionQty(val)}
                    value={portionQty} placeholder="Entrer une valeur" ref={inputRef}></TextInput>
              </View>
           
          </TouchableOpacity>
            <Divider/>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Text style={{flex: 1, fontSize: 16}}>Portion</Text>
                      <Picker
                          mode="dropdown"
                          selectedValue={selectedPortion}
                          style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setSelectedPortion(itemValue)}
                      >
                          {getPortionsList()}
      </Picker>
              </View>
           
          </TouchableOpacity>
          </View>
          
          <MacrosComponent/>

      </SafeAreaView>
  );
    
};

const styles = StyleSheet.create({

    screenHeader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#40c5d1',
        shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    
    headerTitle: {
        fontSize: 20,
        fontFamily: "SFUIDisplay-Bold",
        marginLeft: 15,
        color: '#FFF'
    }

});

export default AddFoodScreen;

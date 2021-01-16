import 'react-native-gesture-handler';
import React, { } from 'react';
import {
    Text,
    View,
  } from "react-native";

const MacrosComponent = ({}) => {
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ backgroundColor: '#82DFFC', flex:1, alignItems:'center', padding: 5}}>
      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 10 }}>GLUCIDES</Text>
      <Text style={{ color: '#000', fontWeight: 'bold'}}>178g</Text>
    </View>
    <View style={{ backgroundColor: '#ADD932', flex:1, alignItems:'center', padding: 5 }}>
      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 10 }}>LIPIDES</Text>
      <Text style={{ color: '#000', fontWeight: 'bold'}}>34g</Text>
    </View>
    <View style={{ backgroundColor: '#FF5E71', flex:1, alignItems:'center', padding: 5 }}>
      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 10 }}>PROTÉINES</Text>
      <Text style={{ color: '#000', fontWeight: 'bold'}}>62g</Text>
    </View>
    <View style={{ backgroundColor: '#000', flex:1, alignItems:'center', padding: 5 }} >
      <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 10 }}>CALORIES</Text>
      <Text style={{ color: '#FFF', fontWeight: 'bold'}}>2140</Text>
    </View>
  </View>
  );
    
};

export default MacrosComponent;


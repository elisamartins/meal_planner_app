import 'react-native-gesture-handler';
import React, { } from 'react';
import {
    Text,
    View,
  } from "react-native";

const MacrosComponent = ({}) => {
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ flex:1, alignItems:'center', padding: 5}}>
      <Text style={{ color: '#82DFFC', fontWeight: 'bold', fontSize: 10 }}>GLUCIDES</Text>
      <Text style={{ color: '#82DFFC', fontWeight: 'bold'}}>178g</Text>
    </View>
    <View style={{ flex:1, alignItems:'center', padding: 5 }}>
      <Text style={{ color: '#ADD932', fontWeight: 'bold', fontSize: 10 }}>LIPIDES</Text>
      <Text style={{ color: '#ADD932', fontWeight: 'bold'}}>34g</Text>
    </View>
    <View style={{ flex:1, alignItems:'center', padding: 5 }}>
      <Text style={{ color: '#FF5E71', fontWeight: 'bold', fontSize: 10 }}>PROTÉINES</Text>
      <Text style={{ color: '#FF5E71', fontWeight: 'bold'}}>62g</Text>
    </View>
    <View style={{flex:1, alignItems:'center', padding: 5 }} >
      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 10 }}>CALORIES</Text>
      <Text style={{ color: '#000', fontWeight: 'bold'}}>2140</Text>
    </View>
  </View>
  );
    
};

export default MacrosComponent;


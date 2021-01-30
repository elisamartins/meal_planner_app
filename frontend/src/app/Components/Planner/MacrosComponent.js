import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MacrosComponent = ({}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style={{flex: 1, alignItems: 'center', padding: 5}}>
        <Text style={[styles.macroName, {color: '#82DFFC'}]}>
          GLUCIDES
        </Text>
        <Text style={{color: '#82DFFC', fontWeight: 'bold'}}>178g</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', padding: 5}}>
        <Text style={[styles.macroName, {color: '#ADD932'}]}>
          LIPIDES
        </Text>
        <Text style={{color: '#ADD932', fontWeight: 'bold'}}>34g</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', padding: 5}}>
        <Text style={[styles.macroName, {color: '#FF5E71'}]}>
          PROTÉINES
        </Text>
        <Text style={{color: '#FF5E71', fontWeight: 'bold'}}>62g</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', padding: 5}}>
        <Text style={[styles.macroName, {color: 'black'}]}>
          CALORIES
        </Text>
        <Text style={{color: '#000', fontWeight: 'bold'}}>2140</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  macroName: {
    fontWeight: 'bold',
    fontSize: 10
  },
  amount: {

  }
});

export default MacrosComponent;

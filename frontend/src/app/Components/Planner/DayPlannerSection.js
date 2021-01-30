import 'react-native-gesture-handler';
import React, { } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Divider } from 'react-native-elements';
import MacrosComponent from './MacrosComponent';
import { DUMMY_PLANNER } from '../Data/DUMMY_PLANNER';
import { headerColor } from '../../../Constants';

const Item = ({ item }) => (
  <View style={{ flexDirection: 'row', backgroundColor: '#FFF'}}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.foodName}</Text>
      <Text style={styles.amountText}>{item.amount} {item.unit}</Text>
    </View>
    <Text style={{alignSelf:'center', marginRight: 15}}>{item.calories}</Text>
  </View>
);
      
const DayPlannerSection = ({ navigation }) => {
  return (
    <SafeAreaView>
      
      <View style={styles.screenHeader}>
        <TouchableOpacity><Icon name="chevron-left" size={30} color='white' /></TouchableOpacity>
        <Text style={styles.headerTitle}>Aujourd'hui</Text>
        <TouchableOpacity><Icon name="chevron-right" size={30} color='white'/></TouchableOpacity>
      </View>

      <MacrosComponent/>

      <SectionList
        sections={DUMMY_PLANNER}
        keyExtractor={(item, index) => item + index}
        
        renderItem={({ item }) => <Item item={item} />}
        
        renderSectionHeader={({ section: { title } }) => (
            
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.header}>{title.toUpperCase()}</Text>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { navigation.navigate('FoodPlannerSearchScreen',  {sectionName: title}) }}>
              <Icon name="plus" size={25} color="#000" />
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
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#FFF',
  },
  screenHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: headerColor,
    shadowColor: '#000',
    elevation: 5,
  },
})

export default DayPlannerSection;

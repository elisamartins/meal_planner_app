import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import { DUMMY_RECIPE_LIST } from '../Data/DUMMY_RECIPE_LIST';
import RecipeListElement from './RecipeListElement';

const RecipeListScreen = ({navigation}) => {
  const [recipeList, setRecipeList] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setRecipeList(DUMMY_RECIPE_LIST);
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenHeader}>
            <Text style={styles.headerTitle}>Recettes</Text>
            <TouchableOpacity>
              <Icon name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <SectionList
                sections={recipeList}
                renderItem={({ item }) => <RecipeListElement item={item}/>}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={{marginVertical: 10}}>
                    <Text style={styles.categoryHeader}>
                      {title}
                    </Text>
                  </View>
                )}
              />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    backgroundColor: '#D1A9F0',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
  categoryHeader: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Medium',
    color: 'black',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#FFF',
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  screenHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#40c5d1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RecipeListScreen;

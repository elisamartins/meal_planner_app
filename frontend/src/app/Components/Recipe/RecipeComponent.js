import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
    Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { TabBar, TabView } from 'react-native-tab-view';
import { Divider } from 'react-native-elements';
import { headerColor } from '../../../Constants';

const Item = ({ ingredient }) => (
    <View style={{ flexDirection: 'row'}}>
      <View style={styles.item}>
        <Text style={styles.title}>{ingredient.ingredientName}</Text>
        <Text style={styles.amountText}>{ingredient.amount} {ingredient.unit}</Text>
      </View>
    </View>
  );

const IngredientsRoute = ({route}) => {
  console.log(route);
  const renderItem = ({item}) => {
    console.log('icitte');
    console.log(item);
    return <Item ingredient={item} />;
  };

  return (
    <View style={[styles.scene]}>
      <FlatList
        data={route.ingredients}
        renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const NotesRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const NutritionRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ABC'}]} />
);
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#40c5d1'}}
    style={{backgroundColor: 'transparent', elevation: 0}}
    renderLabel={({route, focused, color}) => (
      <Text style={{color: '#40c5d1', margin: 0, fontFamily: 'SFUIDisplay-Heavy'}}>{route.title}</Text>
    )}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

const RecipeComponent = ({route, navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'ingredients',
      title: 'Ingrédients',
      ingredients: route.params.item.ingredients,
    },
    {key: 'notes', title: 'Notes'},
    {key: 'nutrition', title: 'Nutriments'},
  ]);
  const [item, setItem] = useState();

  useEffect(() => {
    setItem(route.params.item);
  }, []);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'ingredients':
        return <IngredientsRoute route={route} />;
      case 'notes':
        return <NotesRoute />;
      case 'nutrition':
        return <NutritionRoute />;
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: headerColor,
          shadowColor: 'black',
          elevation: 5,
        }}>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('RecipeListScreen')}>
            <Icon name="arrow-left-circle" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <Image source={route.params.item.image} style={styles.image} />
          <Text style={styles.recipeName}>{route.params.item.recipeName}</Text>
        </SafeAreaView>
      </View>
      <TabView
        initialLayout={{width: Dimensions.get('window').width}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    marginBottom: 15,
    width: 200,
    height: 200,
    borderRadius: 150,
    borderColor: 'white',
    borderWidth: 1,
  },
  ingredient: {
    fontSize: 16,
  },
  recipeName: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Medium',
    flexShrink: 1,
    textAlign: 'center',
    color: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SFUIDisplay-Bold',
    marginLeft: 15,
    color: '#FFF',
  },
  listContainer: {
    flex: 1,
    paddingTop: 5,
  },
  screenHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scene: {
    flex: 1,
    paddingHorizontal: 10,
    },
  
    item: {
        padding: 10,
        flex: 1,
      },
      title: {
        fontSize: 14
      },
      amountText: {
        fontSize: 12,
        color: 'gray'
      }
});

export default RecipeComponent;

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  FlatList,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
    width: 250,
    height: 250,
  },
});

const LoginScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.170:5000/fooditem')
      .then((response) => response.json())
      .then((json) => {setData(json); console.log("yoo")})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={styles.container}>

{isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      )}


      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password"/>
       <Button
      title="Se connecter"
      onPress={() =>
        navigation.navigate('Home')
      }
    />
    </View>
   
  );
};
export default LoginScreen;

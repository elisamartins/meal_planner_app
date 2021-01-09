import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fetch('http://192.168.0.158:5000/fooditem')
      .then((response) => response.json())
      .then((json) => { setData(json); })
      .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
  
  global.foodItems = data;

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <View>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Home')}
          />
          </View>
      )}
    </View>
  );
};
export default LoginScreen;

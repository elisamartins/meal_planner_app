import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-native-elements'
import {
  ActivityIndicator,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 175,
    height: 175,
    marginBottom: 20,
    alignSelf: 'center'
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

  //https://stackoverflow.com/questions/43380260/draw-horizontal-rule-in-react-native
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <TextInput placeholder="Username" />
          <TextInput placeholder="Password" />
          <View style={styles.buttonContainer}>


          <Button title="Se connecter" onPress={() => navigation.navigate('Home')}/>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical:20 }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View><Text style={{width: 50, textAlign: 'center'}}>ou</Text></View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          
          <SocialIcon title='Se connecter avec Facebook' button type='facebook' style={ {padding: 10}}/>

        </View>
        
      )}
    </View>
  );
};
export default LoginScreen;

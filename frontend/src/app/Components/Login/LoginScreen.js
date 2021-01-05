import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Image,
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
  return (
    <View style={styles.container}>
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

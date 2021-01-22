import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import RegisterModal from './RegisterModal';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('http://192.168.0.158:5000/fooditem')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  global.foodItems = data;

  const signIn = () => {
    fetch('http://192.168.0.158:5000/api/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password}),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          navigation.navigate('Home');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.form}>
          <View style={styles.centeredView}>
            <RegisterModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>

          <View>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View>
              <TextInput
                placeholder="nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
              <TextInput
                placeholder="mot de passe"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
              <View style={styles.customButtom}>
                <Text style={{color: 'white'}}>Se connecter</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  ou continuer avec
                </Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <SocialIcon
                button
                type="facebook"
                style={{height: 50, width: 50}}
              />
              <SocialIcon
                button
                type="google"
                style={{height: 50, width: 50}}
              />
            </View>
          </View>

          <View style={styles.bottomText}>
            <Text>Pas de compte? </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={{fontWeight: 'bold'}}>Inscrivez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomText: {
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    margin: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    margin: 10,
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  container: {
    flex: 1,
  },
  customButtom: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 2,
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

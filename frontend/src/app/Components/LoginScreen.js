import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SocialIcon, Input } from 'react-native-elements'
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const SignUpModal = ({ modalVisible, setModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    fetch('http://192.168.0.158:5000/api/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
      .then(console.log("Creating Account..."))
      .then((response) => {

        if (response.ok) {
          console.log("Account successfully created")
        }

      })
      .catch((error) => console.error(error));
    
  };

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
          <Text style={styles.modalText}>Inscription</Text>
          <TextInput placeholder="Nom d'utilisateur" onChangeText={setUsername} value={username}/>
          <TextInput placeholder="Mot de passe" onChangeText={setPassword} value={password} />
        <TouchableOpacity
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
            createAccount();
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.textStyle}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Modal>
  )
}

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    fetch('http://192.168.0.158:5000/fooditem')
    .then((response) => response.json())
    .then((json) => { setData(json); })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);
  
  global.foodItems = data;

  const signIn = () => {
    fetch('http://192.168.0.158:5000/api/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then((response) => {
        if (response.ok) {
          console.log("Login successful");
          navigation.navigate("Home");
        }
      })
      .catch((error) => console.error(error));
  }
  
  //https://stackoverflow.com/questions/43380260/draw-horizontal-rule-in-react-native
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        
        <View style={styles.form}>
          
        <View style={styles.centeredView}>
            <SignUpModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
    </View>
          <View>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View>
              <Input placeholder="Username" value={username} onChangeText={setUsername}/>
              <Input placeholder="Password" value={password} onChangeText={setPassword}/>
            </View>
          
            <View style={styles.buttonContainer}>
              <Button title="Se connecter" onPress={signIn}/>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical:20 }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFF'}} />
            <View><Text style={{width: 50, textAlign: 'center', color: '#FFF'}}>ou</Text></View>
            <View style={{flex: 1, height: 1, backgroundColor: '#FFF'}} />
          </View>
          
          <SocialIcon title='Continuer avec Facebook' button type='facebook' style={ {padding: 10}}/>
          <SocialIcon title='Continuer avec Google' button type='google' style={{ padding: 10 }} />
          
          <View style={{alignSelf: 'center' }}>
            <TouchableOpacity><Text>Créer un compte</Text></TouchableOpacity>
          </View>
        </View>
        
        
      )}
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logo: {
    width: 175,
    height: 175,
    marginBottom: 20,
    alignSelf: 'center'
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
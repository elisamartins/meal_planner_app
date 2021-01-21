import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SocialIcon, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements'

const SignUpModal = ({ modalVisible, setModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  }
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
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal}><Icon name="close" size={30}/></TouchableOpacity>
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
      // LOGIN BYPASS
      navigation.navigate("Home");

    // fetch('http://192.168.0.158:5000/api/user/signin', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username: username, password: password })
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       console.log("Login successful");
    //       navigation.navigate("Home");
    //     }
    //   })
    //   .catch((error) => console.error(error));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        
        <View style={styles.form}>
          
          <View style={styles.centeredView}>
            <SignUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
          </View>

          <View>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View>
              <TextInput placeholder="nom d'utilisateur" value={username} onChangeText={setUsername} style={styles.input}/>
              <TextInput placeholder="mot de passe" value={password} onChangeText={setPassword} style={styles.input}/>
            </View>
          
            <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
              <View style={styles.customButtom}>
                <Text style={{ color: "white" }}>
                  Se connecter
                </Text>
              </View>
            </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical:20 }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View><Text style={{paddingHorizontal: 10, textAlign: 'center', color: 'black'}}>ou continuer avec</Text></View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SocialIcon button type='facebook' style={{ height: 50, width: 50 }}/>
            <SocialIcon button type='google' style={{ height: 50, width: 50 }}/>
          </View>
          </View>

          <View style={{ alignSelf: 'center', flexDirection:'row', position:'absolute', bottom:0 }}>
            <Text>Pas de compte? </Text>
            <TouchableOpacity onPress={() => {
          setModalVisible(true);
        }}><Text style={{fontWeight: "bold"}}>Inscrivez-vous</Text></TouchableOpacity>
          </View>
        </View>
        
        
      )}
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    margin: 10,
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    alignSelf: 'center'
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 20
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
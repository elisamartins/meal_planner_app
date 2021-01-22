import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const RegisterModal = ({modalVisible, setModalVisible}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const createAccount = () => {
    fetch('http://192.168.0.158:5000/api/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(console.log('Creating Account...'))
        .then((response) => {
            if (response.ok) {
                console.log('Account successfully created');
                //TODO: Show positive feedback
            }
            else {
                //TODO: Show negative feedback
            }
        })
        .catch((error) => console.error(error));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
          <Text style={styles.modalText}>Inscription</Text>
          <TextInput
            placeholder="Nom d'utilisateur"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={{...styles.openButton, backgroundColor: '#2196F3'}}
            onPress={() => {
              createAccount();
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>S'INSCRIRE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

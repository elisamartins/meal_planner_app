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

export const CreateListModal = ({modalVisible, setModalVisible, navigation,}) => {
  const [listName, setListName] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const createNewList = () => {
    fetch('http://192.168.0.158:5000/groceryList/jean', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listName),
    })
      .then(console.log('Posting...'))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        navigation.navigate('Grocery Items', {ID: json});
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
          <Text style={styles.modalText}>Créer une nouvelle liste</Text>
          <TextInput
            placeholder="Nom de la liste"
            onChangeText={setListName}
            value={listName}
          />
          <TouchableOpacity
            style={{...styles.openButton, backgroundColor: '#2196F3'}}
            onPress={() => {
              createNewList();
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>CRÉER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    alignSelf: 'center',
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

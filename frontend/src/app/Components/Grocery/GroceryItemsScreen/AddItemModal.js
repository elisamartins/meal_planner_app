import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import FoodItemSearchBar from '../../SearchBar';

const AddItemModal = ({modalVisible, setModalVisible, selectItem}) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={closeModal}
            style={{backgroundColor: '#ABC'}}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
          <FoodItemSearchBar selectItem={selectItem} />
        </View>
      </View>
    </Modal>
  );
};

export default AddItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 10,
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
    flex: 1,
  },
});

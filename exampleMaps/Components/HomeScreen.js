import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, Card, ListItem, Button, Text} from 'react-native-elements';
import {useMutation} from 'react-apollo';
import {ADD_COORDINATE} from '../graphql/Mutations';

const info = [
  {
    id: 1,
    name: 'Uno',
  },
  {
    id: 2,
    name: 'Dos',
  },
  {
    id: 3,
    name: 'Tres',
  },
  {
    id: 4,
    name: 'Cuatro',
  },
];

const HomeScreen = ({navigation}) => {
  const [latitudeInput, setLatitudeInput] = useState(0);
  const [longitudeInput, setLongitudeInput] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const latitudeRef = React.createRef();
  const longitudeRef = React.createRef();

  const [addCoordinate, {loading, data}] = useMutation(ADD_COORDINATE);

  const _onSubmit = () => {
    addCoordinate({
      variables: {
        name: 'Prueba',
        latitude: parseFloat(latitudeInput),
        longitude: parseFloat(longitudeInput),
      },
    });
    if(loading) console.log('ACA')
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Coordinate added!</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Text style={styles.formLabel}>Add a new coordinate</Text>
      <View>
        <TextInput
          ref={latitudeRef}
          onChangeText={text => setLatitudeInput(text)}
          keyboardType="number-pad"
          placeholder="Latitude"
          style={styles.inputStyle}
        />
        <TextInput
          ref={longitudeRef}
          onChangeText={text => setLongitudeInput(text)}
          keyboardType="number-pad"
          placeholder="Longitude"
          style={styles.inputStyle}
        />
      </View>
      <Button
        onPress={_onSubmit}
        buttonStyle={{marginTop: 20, borderRadius: 20}}
        title="Submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  formLabel: {
    fontSize: 20,
    // color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});

export default HomeScreen;

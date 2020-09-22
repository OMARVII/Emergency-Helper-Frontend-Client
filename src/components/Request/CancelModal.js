import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import MainButton from '../global/MainButton';
import LoadingModal from '../global/LoadingModal';
import Icon from '@expo/vector-icons/Ionicons';
import { cancelRequest } from '../../Utils/CancelRequest';

const CancelModal = ({ CancelModalVisble, close }) => {

  
  if (!CancelModalVisble) return null;
  const mount = useRef(true)
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const onSubmit = async () => {
    setLoading(true);
    cancelRequest(feedback).then(
      () => {
        if (mount.current) {
          setLoading(false);
        }
        close();
      }
    )

  }
  useEffect(
    () => {
      mount.current = true;

      return () => { mount.current = false }
    }, []
  )

  return (
    <Modal isVisible={CancelModalVisble}>
      <KeyboardAvoidingView behavior="position" enabled>
        <LoadingModal modalVisible={loading} />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => { close() }} style={styles.exitButton} >
            <Icon name="ios-close" size={25} color="#454F63" />
          </TouchableOpacity>
          <Text style={styles.headerQ}>Are you sure you want to cancel?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Tell us the problem if it is related to us"
            multiline
            placeholderTextColor='#78849E'
            scrollEnabled={true}
            value={feedback}
            onChangeText={(text) => {
              if (mount.current)
                setFeedback(text)
            }}
          >
          </TextInput>
          <MainButton style={styles.confirmButton} onPress={() => onSubmit()}>
            <Text style={styles.confirmText}>Confirm</Text>
          </MainButton>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: normalize(290),
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    width: normalize(355),
    alignItems: "center",
    alignSelf: 'center'
  },
  exitButton: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: normalize(10)
  },
  headerQ: {
    width: normalize(200),
    fontFamily: "Montserrat_SemiBold",
    marginTop: normalize(-5),
    fontSize: normalize(20),
    color: "#132641",
    textAlign: "center",
  },
  Note: {
    fontFamily: "Montserrat",
    fontSize: normalize(9),
    width: normalize(200),
    top: normalize(15),
    color: '#132641'
  },
  textInput: {
    marginTop: normalize(10),
    borderRadius: normalize(15),
    width: normalize(220),
    height: normalize(90),
    borderWidth: 1,
    borderColor: 'lightgrey',
    textAlignVertical: 'top',
    padding: 10,
    paddingTop: 7,
    fontFamily: "Montserrat_SemiBold",
    fontSize: 12,
    alignSelf: 'center'

  },
  confirmButton: {
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(8),
    top: normalize(23),
  },
  confirmText: {
    color: "white",
    fontSize: normalize(18),
    fontFamily: "Montserrat",

  }

});
export default CancelModal;
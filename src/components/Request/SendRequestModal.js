import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import CategorySelect from './CategorySelect'
import SelectLocationInput from './SelectLocationInput';
import { createRequest } from '../../Utils/RequestUtils'
import LoadingModal from '../global/LoadingModal';
import ErrorModal from '../global/ErrorModal';
import { ScrollView } from 'react-native-gesture-handler';
//use ref & mount to perevent memory leak warning
const SendRequestModal = ({ close, mV }) => {
    let mount = useRef(true);
    const [innerVisibility, setInnerVisibility] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    const [descripition, setDescripition] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState(null);
    const [descripitionError, setDescripitionError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [locationError, setLocationError] = useState(null);

    useEffect(
        () => {
            mount.current = true;
            return () => { mount.current = false; }
        }, []
    )

    const validateInput = () => {
        let valid = true;
        if (descripition.trim().length == 0) {
            if (mount.current)
                setDescripitionError(true);
            valid = false
        }
        else {
            if (mount.current)
                setDescripitionError(false);
        }
        if (category == null || category.trim().length == 0) {
            if (mount.current)
                setCategoryError(true);
            valid = false
        }
        else {
            if (mount.current)
                setCategoryError(false);
        }
        if (location == null) {
            if (mount.current)
                setLocationError(true);
            valid = false
        }
        else {
            if (mount.current)
                setLocationError(false);
        }
        return valid
    }

    // const { navigate } = useNavigation();
    // const nav = () => {
    //     navigate('AvailableHelpersScreen');
    // }
    const sendRequest = () => {

        if (validateInput()) {
            if (mount.current)
                setLoadingModal(true);

            createRequest(descripition, location.location, category).then(
                (res) => {
                    close();
                    if (mount.current) {
                        setLoadingModal(false);
                    }

                }
            ).catch(
                (err) => {
                    if (err.response.data && err.response.data.message) {
                        if (mount.current)
                            setErrorModalMessage(err.response.data.message);
                    }
                    if (mount.current) {
                        setLoadingModal(false);
                        setErrorModal(true);
                    }
                }
            )
        }
    }

    const animationTiming = 1000;
    const closeHandler = () => {
        if (mount.current)
            setInnerVisibility(false);
        setTimeout(() => {
            close();
        }, animationTiming + 100);
    }
    let descripitionStyle = { ...styles.commonInput, ...styles.descripitionInput };
    if (descripitionError) {
        descripitionStyle = { ...descripitionStyle, ...styles.error }
    }
    if (!mV)
        return null;
    if (loadingModal)
        return <LoadingModal modalVisible={loadingModal} />
    if (errorModal)
        return <ErrorModal
            modalVisible={errorModal}
            message={errorModalMessage}
            closeModal={() => {
                if (mount.current)
                    setErrorModal(false)
            }} />

    return (
        <Modal
            isVisible={innerVisibility}
            style={styles.modal}
            animationInTiming={animationTiming}
            animationOutTiming={animationTiming}
            onBackdropPress={() => { Keyboard.dismiss() }}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={closeHandler} style={styles.innerContainer}>
                    <AntDesign name="down" size={24} color="black" />
                    <Text style={styles.headerText}>Enter Your Problem</Text>
                </TouchableOpacity>
                <ScrollView
                    style={styles.inputsContainer}
                >
                    <TextInput
                        value={descripition}
                        onChangeText={(t) => setDescripition(t)}
                        placeholder="Enter Descripition"
                        multiline
                        style={descripitionStyle}
                    />
                    <View style={styles.inputContainer}>
                        <CategorySelect
                            value={category}
                            setValue={(val) => { if (mount.current) setCategory(val) }}
                            style={categoryError ? styles.error : null}

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <SelectLocationInput style={locationError ? styles.error : null} value={location} setValue={setLocation} />
                    </View>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            onPress={() => { sendRequest() }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText} >Make Request</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        marginHorizontal: '3%',
    },
    container: {
        width: '100%',
        height: '60%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        overflow: 'hidden',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: '5%'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        marginLeft: '2%',
        fontFamily: 'Montserrat_SemiBold'
    },
    inputsContainer: {
        marginTop: '5%',
        paddingHorizontal: '9%',
    },
    commonInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 10,
        fontFamily: 'Montserrat_SemiBold',
        fontSize: 16,
        paddingHorizontal: 20,
        textAlignVertical: 'top',
    },
    inputContainer: {
        marginTop: '5%'
    },
    descripitionInput: {
        height: Dimensions.get('window').height * 0.13,
    },
    buttonContainer: {
        width: '100%',
        marginTop: '10%',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#132641',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        height: Dimensions.get('screen').height * 0.07
    },
    buttonText: {

        fontFamily: 'Montserrat_SemiBold',
        fontSize: 16 * (812 / Dimensions.get('screen').height),
        color: '#FFF',
        textAlignVertical: 'center'
    },
    error: {
        borderColor: 'red',
        borderWidth: 2
    }
})

export default SendRequestModal;
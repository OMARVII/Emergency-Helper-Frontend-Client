import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const ReusableButton = (props) => {
  let buttonStyle = { ...styles.buttonStyle, ...props.style };
  return (
    <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
      <View style={styles.rowContainer}>
      {props.children}
        <Text style={styles.buttonText}>{props.Title}</Text>
        </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 30,
    width: "35%",
    backgroundColor:'#132641',
    alignItems:'center',
    //paddingVertical: "2%",
    //justifyContent:'center',
    //  padding:5,
    marginBottom:'2%'
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat",
    
    //textAlign: "center",
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //width:'50%',
    marginTop:'5%',
}
});

export default ReusableButton;

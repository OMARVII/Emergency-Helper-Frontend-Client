import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import normalize from 'react-native-normalize';
import MainHeader from '../../components/global/MainHeader';
import SubHeaderText from '../../components/global/SubHeaderText';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/global/HeaderButton'

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <KeyboardAwareScrollView KeyboardAwareScrollView bounces={false}>
        <MainHeader headerText={'Settings'} name={'cog'}></MainHeader>
        <SubHeaderText SubHeaderText={'Settings'}></SubHeaderText>
        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={() => {
            navigation.navigate("AccountInfoScreen");
          }}
        >
          <Text style={styles.settingsTXT}>Account Info</Text>
          <Icon
            name="ios-arrow-forward"
            size={25}
            style={styles.icon}
            marginLeft="55%"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionsContainer}
          onPress={() => {
            navigation.navigate("SavedAddressesScreen");
          }}>
          <Text style={styles.settingsTXT}>Saved Addresses</Text>
          <Icon name="ios-arrow-forward" size={25} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={() => {
            navigation.navigate("ChangePasswordScreen");
          }}
        >
          <Text style={styles.settingsTXT}>Change Password</Text>
          <Icon name="ios-arrow-forward" size={25} style={styles.icon} />
        </TouchableOpacity>


      </KeyboardAwareScrollView>
    </View >
  );
};
SettingsScreen.navigationOptions = (props) => {
  return {
    title: '',
    headerTransparent: true,
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}   >
          <Item title="menu" iconName='menu' onPress={() => { props.navigation.toggleDrawer() }} />
        </HeaderButtons>
      )
    },

  }
}
const styles = StyleSheet.create({
  
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  settingsTXT: {
    fontSize: normalize(18),
    color: "#132641",
    fontFamily: "Montserrat_Medium",
    width: normalize(250),
  },
  optionsContainer: {
    flexDirection: "row",
    marginLeft: "12%",
    marginTop: "7%",
  },
  icon: {
    marginLeft: "12%",
    color: "#132641",
  },
});

export default SettingsScreen;

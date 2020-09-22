import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation";
import SideDrawer from '../components/global/SideDrawer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { Feather, MaterialIcons} from "@expo/vector-icons";
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AboutUsScreen from '../screens/AboutUs/AboutUsScreen';
import SupportTicketScreen from '../screens/SupportTicketScreen'
import SavedAddressesScreen from '../screens/Settings/SavedAddressesScreen'
import AccountInfoScreen from '../screens/Settings/AccountInfoScreen'
import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen'
import TermsAndConditionsScreen from '../screens/AboutUs/TermsAndConditionsScreen'
import TicketScreen from '../screens/TicketScreen'
import ClientChat from '../screens/ClientChat'
import { Dimensions } from 'react-native';
import Main from '../screens/Main';

const ApplicationNav = createStackNavigator(
    {
        Main:{
            screen:Main
        },
        HistoryScreen: {
            screen: HistoryScreen
        },
        SupportTicketScreen: {
            screen: SupportTicketScreen
        },
        SettingsScreen: {
            screen: SettingsScreen
        },
        AboutUsScreen: {
            screen: AboutUsScreen
        },
        SavedAddressesScreen,
        AccountInfoScreen,
        ChangePasswordScreen,
        TicketScreen,
        TermsAndConditionsScreen,
        ClientChat,
    },


);


const MainNav = createDrawerNavigator(
    {
        Main: {
            screen: ApplicationNav,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: <Feather name="home" size={20} style={{ color: '#132641', opacity: 0.8 }}></Feather>,

            },

        },
        HistoryScreen: {
            screen: ApplicationNav,
            navigationOptions: {
                drawerLabel: 'History',
                drawerIcon: <Feather name="calendar" size={20} style={{ color: '#132641', opacity: 0.8 }}></Feather>
            }

        },
        SupportTicketScreen: {
            screen: ApplicationNav,
            navigationOptions: {
                drawerLabel: 'Support',
                drawerIcon: <MaterialIcons name="people" size={20} style={{ color: '#132641', opacity: 0.8 }}></MaterialIcons>
            }

        },
        SettingsScreen: {
            screen: ApplicationNav,
            navigationOptions: {
                drawerLabel: 'Settings',
                drawerIcon: <Feather name="settings" size={20} style={{ color: '#132641', opacity: 0.8 }}></Feather>
            }

        },
        AboutUsScreen: {
            screen: ApplicationNav,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: <Feather name="info" size={20} style={{ color: '#132641', opacity: 0.8 }}></Feather>
            }
        }

    },

    {
        contentComponent: props => { return (props.navigation.state.isDrawerOpen )? <SideDrawer   {...props} onItemPress={({ route, focused }) => { props.navigation.navigate(route) }} /> :null}
        , contentOptions: {
            activeTintColor: '',
            activeBackgroundColor: 'Transparent',
            labelStyle: {
                fontFamily: 'Montserrat',
                fontWeight: 'normal',
                color: '#132641',
                marginLeft: -7,
                fontSize: 18,
                marginVertical: Dimensions.get('window').height > 600 ? 18 : 13
            }
        },
        drawerWidth: '77%'
    }
);
export default createAppContainer(MainNav);
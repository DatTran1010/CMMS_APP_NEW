import {Keyboard, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import Login from './src/UI/Login';
import Visual from './src/UI/Visual';
import Home from './src/UI/Home';
import DrawerContent from './src/UI/Home/DrawerContent.js';
import ConTextProvider from './src/ConText/MainContext';
import ModalUser from './src/Common/ModalUser';
import Request from './src/UI/Request';
import Overlay from './src/Common/Overlay';
import store from './src/Redux/store';
import Maintenance from './src/UI/BaoTri';
import Monitor from './src/UI/GiamSat';
import DeviceMove from './src/UI/DeviceMove';

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  //Draw chung cho tất cả
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={props => DrawerContent(props)}>
        <Stack.Screen
          name="Home"
          component={StackNavigator}
          options={{
            title: 'Home',
            headerShown: false,
            drawerIcon: true,
          }}
        />
      </Drawer.Navigator>
    );
  };

  function StackNavigator() {
    return (
      <Stack.Navigator defaultScreenOptions={Home}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: true, title: 'My Ecomaint'}}
        />
        <Stack.Screen
          name="Visual"
          component={Visual}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <ConTextProvider>
        <View
          style={{
            flex: 1,
          }}
          // onStartShouldSetResponder={() => {
          //     Keyboard.dismiss();
          // }}
        >
          <NavigationContainer>
            <Stack.Navigator defaultScreenOptions={Home}>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  title: 'Login',
                }}
              />
              <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Request"
                component={Request}
                options={{headerShown: true}}
              />

              <Stack.Screen
                name="Maintenance"
                component={Maintenance}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Monitor"
                component={Monitor}
                options={{headerShown: true}}
              />

              <Stack.Screen
                name="DeviceMove"
                component={DeviceMove}
                options={{headerShown: true}}
              />
              {/* <Stack.Screen
                                name="Visuak"
                                component={Visual}
                                options={{ headerShown: true }}
                            /> */}
            </Stack.Navigator>
          </NavigationContainer>
          <ModalUser />
          <Overlay />
          <Toast />
        </View>
      </ConTextProvider>
    </Provider>
  );
}

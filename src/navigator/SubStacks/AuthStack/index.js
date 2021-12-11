import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { hideHeaderOptions, modalOptions, screenOptions } from '../../config';
import {
  Login,
  Signup,
  ChangePassword,
  ForgotPassword,
  OTPVerification,
  Password,
  SideMenuPrefrence,
  Content,
} from '../../../containers';

enableScreens();
const AuthStack = createStackNavigator();

export default props => (
  <AuthStack.Navigator {...{ screenOptions }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
    <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="OTPVerification" component={OTPVerification} />
    <AuthStack.Screen name="Password" component={Password} />
    <AuthStack.Screen name="Content" component={Content} />

    <AuthStack.Screen
      name="SideMenuPrefrence"
      component={SideMenuPrefrence}
      options={hideHeaderOptions}
    />
  </AuthStack.Navigator>
);

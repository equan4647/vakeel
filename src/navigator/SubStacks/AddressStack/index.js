import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';

import { screenOptions } from '../../config';
import {
  AddressScreen,
  AddAddress,
  CurrentLocationMap,
} from '../../../containers';

enableScreens();
const Address = createStackNavigator();

export default () => (
  <Address.Navigator {...{ screenOptions }}>
    <Address.Screen name="AddressScreen" component={AddressScreen} />
    <Address.Screen name="AddAddress" component={AddAddress} />
    <Address.Screen name="CurrentLocationMap" component={CurrentLocationMap} />
  </Address.Navigator>
);

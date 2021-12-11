import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';

import { screenOptions } from '../../config';
import {
  PaymentMethod,
  PaymentCardList,
  AddPaymentMethod,
} from '../../../containers';

enableScreens();
const PaymentMethodStack = createStackNavigator();

export default () => (
  <PaymentMethodStack.Navigator {...{ screenOptions }}>
    <PaymentMethodStack.Screen name="PaymentMethod" component={PaymentMethod} />
    <PaymentMethodStack.Screen
      name="PaymentCardList"
      component={PaymentCardList}
    />
    <PaymentMethodStack.Screen
      name="AddPaymentMethod"
      component={AddPaymentMethod}
    />
  </PaymentMethodStack.Navigator>
);

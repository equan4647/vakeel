import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import {
  AddDelivery,
  AddDeliveryConfirmation,
  ViewCurrentDelivery,
  Chat,
} from '../../../containers';
import { screenOptions } from '../../config';

enableScreens();
const AddDeliveryStack = createStackNavigator();

export default props => (
  <AddDeliveryStack.Navigator {...{ screenOptions }}>
    <AddDeliveryStack.Screen name="AddDelivery" component={AddDelivery} />
    <AddDeliveryStack.Screen
      name="AddDeliveryConfirmation"
      component={AddDeliveryConfirmation}
    />
    <AddDeliveryStack.Screen
      name="ViewCurrentDelivery"
      component={ViewCurrentDelivery}
    />
    <AddDeliveryStack.Screen name="DeliveryChat" component={Chat} />
  </AddDeliveryStack.Navigator>
);

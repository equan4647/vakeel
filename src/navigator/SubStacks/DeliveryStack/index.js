import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { DeliveryHome } from '../../../containers';
import { screenOptions } from '../../config';

enableScreens();
const DeliveryStack = createStackNavigator();

export default props => (
  <DeliveryStack.Navigator {...{ screenOptions }}>
    <DeliveryStack.Screen name="DeliveryHome" component={DeliveryHome} />
  </DeliveryStack.Navigator>
);

/*
ViewCurrentDelivery
<DeliveryStack.Screen
      name="ViewCurrentDelivery"
      component={ViewCurrentDelivery}
    />
*/

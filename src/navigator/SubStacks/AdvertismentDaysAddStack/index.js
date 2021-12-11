import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';

import { screenOptions, hideHeaderOptions } from '../../config';
import { AdDays, AdSuccess } from '../../../containers';
import { PaymentMethodStack } from '..';

enableScreens();
const AdvertismentDaysAddStack = createStackNavigator();

export default () => (
  <AdvertismentDaysAddStack.Navigator {...{ screenOptions }}>
    <AdvertismentDaysAddStack.Screen name="AdDays" component={AdDays} />
    <AdvertismentDaysAddStack.Screen
      name="PaymentMethodStack"
      component={PaymentMethodStack}
      options={hideHeaderOptions}
    />
    <AdvertismentDaysAddStack.Screen
      options={{ gestureEnabled: false }}
      name="AdSuccess"
      component={AdSuccess}
    />
  </AdvertismentDaysAddStack.Navigator>
);

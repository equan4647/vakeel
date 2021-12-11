import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';

import { screenOptions, hideHeaderOptions } from '../../config';
import {
  CreateAd,
  AdContactDetails,
  UploadAdPhoto,
  AdPrefrences,
  AdSuccess,
  AdvertismentDetail,
} from '../../../containers';
import { PaymentMethodStack } from '..';

enableScreens();
const AdvertismentAddStack = createStackNavigator();

export default () => (
  <AdvertismentAddStack.Navigator {...{ screenOptions }}>
    <AdvertismentAddStack.Screen name="CreateAd" component={CreateAd} />
    <AdvertismentAddStack.Screen
      name="AdContactDetails"
      component={AdContactDetails}
    />
    <AdvertismentAddStack.Screen
      name="UploadAdPhoto"
      component={UploadAdPhoto}
    />

    <AdvertismentAddStack.Screen name="AdPrefrences" component={AdPrefrences} />
    <AdvertismentAddStack.Screen
      name="PaymentMethodStack"
      component={PaymentMethodStack}
      options={hideHeaderOptions}
    />
    <AdvertismentAddStack.Screen
      options={{ gestureEnabled: false }}
      name="AdSuccess"
      component={AdSuccess}
    />
    <AdvertismentAddStack.Screen
      name="AdvertismentDetail"
      component={AdvertismentDetail}
    />
  </AdvertismentAddStack.Navigator>
);

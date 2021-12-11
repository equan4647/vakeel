import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  Advertisments,
  MyAdvertisments,
  AdvertismentDetail,
} from '../../../containers';

enableScreens();
const AdvertismentsStack = createStackNavigator();

export default () => (
  <AdvertismentsStack.Navigator {...{ screenOptions }}>
    <AdvertismentsStack.Screen name="Advertisments" component={Advertisments} />
    <AdvertismentsStack.Screen
      name="MyAdvertisments"
      component={MyAdvertisments}
    />
    <AdvertismentsStack.Screen
      name="AdvertismentDetail"
      component={AdvertismentDetail}
    />
  </AdvertismentsStack.Navigator>
);

/*
<AdvertismentsStack.Screen
      name="PaymentMethodStack"
      component={PaymentMethodStack}
      options={hideHeaderOptions}
    />
 <AdvertismentsStack.Screen
      options={{ gestureEnabled: false }}
      name="AdSuccess"
      component={AdSuccess}
    />
 <AdvertismentsStack.Screen name="CreateAd" component={CreateAd} />
    <AdvertismentsStack.Screen
      name="AdContactDetails"
      component={AdContactDetails}
    />
    <AdvertismentsStack.Screen name="UploadAdPhoto" component={UploadAdPhoto} />
    <AdvertismentsStack.Screen name="AdDays" component={AdDays} />
    <AdvertismentsStack.Screen name="AdPrefrences" component={AdPrefrences} />
*/

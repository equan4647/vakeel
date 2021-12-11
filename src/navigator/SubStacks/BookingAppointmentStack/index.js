import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions, hideHeaderOptions } from '../../config';
import {
  BookAppointment,
  BookingConfirmation,
  AddressScreen,
  ServiceBookingDetails,
} from '../../../containers';
import PaymentMethodStack from '../PaymentMethodStack';
import ServiceSuccess from '../../../containers/ServiceSuccess';

enableScreens();
const BookingAppointmentStack = createStackNavigator();

export default () => (
  <BookingAppointmentStack.Navigator {...{ screenOptions }}>
    <BookingAppointmentStack.Screen
      name="BookAppointment"
      component={BookAppointment}
    />
    <BookingAppointmentStack.Screen
      name="BookingConfirmation"
      component={BookingConfirmation}
    />
    <BookingAppointmentStack.Screen
      name="PaymentMethodStack"
      component={PaymentMethodStack}
      options={hideHeaderOptions}
    />
    <BookingAppointmentStack.Screen
      name="ServiceSuccess"
      component={ServiceSuccess}
      options={hideHeaderOptions}
    />
    <BookingAppointmentStack.Screen
      name="ServiceBookingDetails"
      component={ServiceBookingDetails}
    />

    {/* <BuyingCartStack.Screen name="OrderSuccess" component={OrderSuccess} />
    <BuyingCartStack.Screen name="OrderDetail" component={OrderDetail} />
    <BuyingCartStack.Screen
      name="OrderInProgress"
      component={OrderInProgress}
    /> */}
  </BookingAppointmentStack.Navigator>
);

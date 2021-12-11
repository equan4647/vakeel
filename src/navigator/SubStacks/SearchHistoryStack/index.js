import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  SearchHistory,
  ServiceHistory,
  ServiceBookingDetails,
} from '../../../containers';
import ServiceReview from '../../../containers/ServiceReview';

enableScreens();
const SearchHistoryStack = createStackNavigator();

export default () => (
  <SearchHistoryStack.Navigator {...{ screenOptions }}>
    <SearchHistoryStack.Screen
      name="ServiceHistory"
      component={ServiceHistory}
    />
    <SearchHistoryStack.Screen
      name="ServiceBookingDetails"
      component={ServiceBookingDetails}
    />
    <SearchHistoryStack.Screen name="ServiceReview" component={ServiceReview} />
  </SearchHistoryStack.Navigator>
);

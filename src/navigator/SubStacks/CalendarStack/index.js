import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import { Calendar } from '../../../containers';

enableScreens();
const CalendarStack = createStackNavigator();

export default () => (
  <CalendarStack.Navigator {...{ screenOptions }}>
    <CalendarStack.Screen name="Calendar" component={Calendar} />
  </CalendarStack.Navigator>
);

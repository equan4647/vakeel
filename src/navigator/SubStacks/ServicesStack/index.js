import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';

import {
  ServiceTabHome,
  SearchedServiceItems,
  ViewCategories,
  SearchedServiceCats,
} from '../../../containers';
import { screenOptions } from '../../config';

enableScreens();
const ServicesStack = createStackNavigator();

export default () => (
  <ServicesStack.Navigator {...{ screenOptions }}>
    <ServicesStack.Screen name="ServiceTabHome" component={ServiceTabHome} />
    <ServicesStack.Screen name="ViewCategories" component={ViewCategories} />
    <ServicesStack.Screen
      name="SearchedServiceCats"
      component={SearchedServiceCats}
    />
    <ServicesStack.Screen
      name="SearchedServiceItems"
      component={SearchedServiceItems}
    />
  </ServicesStack.Navigator>
);

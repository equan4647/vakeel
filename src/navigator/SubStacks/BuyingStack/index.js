import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  BuyingTabHome,
  SearchedBuyingCats,
  SearchedBuyingItems,
  ViewCategories,
  ViewSubCategories,
} from '../../../containers';

enableScreens();
const BuyingStack = createStackNavigator();

export default props => (
  <BuyingStack.Navigator {...{ screenOptions }}>
    <BuyingStack.Screen name="BuyingHome" component={BuyingTabHome} />
    <BuyingStack.Screen
      name="SearchedBuyingItems"
      component={SearchedBuyingItems}
    />
    <BuyingStack.Screen name="ViewCategories" component={ViewCategories} />
    <BuyingStack.Screen
      name="ViewSubCategories"
      component={ViewSubCategories}
    />
    <BuyingStack.Screen
      name="SearchedBuyingCats"
      component={SearchedBuyingCats}
    />
  </BuyingStack.Navigator>
);

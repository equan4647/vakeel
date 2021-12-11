import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { hideHeaderOptions, screenOptions } from '../../config';
import {
  MyCart,
  CurrentLocationMap,
  OrderSuccess,
  OrderDetail,
  OrderInProgress,
  ViewBuyingProduct,
  MyOrders,
  Review,
} from '../../../containers';
import { PaymentMethodStack } from '..';

enableScreens();
const BuyingCartStack = createStackNavigator();

export default () => (
  <BuyingCartStack.Navigator {...{ screenOptions }}>
    <BuyingCartStack.Screen name="MyCart" component={MyCart} />
    <BuyingCartStack.Screen
      name="ViewBuyingProduct"
      component={ViewBuyingProduct}
    />
    <BuyingCartStack.Screen
      name="CurrentLocationMap"
      component={CurrentLocationMap}
    />
    <BuyingCartStack.Screen
      name="PaymentMethodStack"
      component={PaymentMethodStack}
      options={hideHeaderOptions}
    />
    <BuyingCartStack.Screen name="OrderSuccess" component={OrderSuccess} />
    <BuyingCartStack.Screen name="OrderDetail" component={OrderDetail} />
    <BuyingCartStack.Screen
      name="OrderInProgress"
      component={OrderInProgress}
    />
    <BuyingCartStack.Screen name="MyOrders" component={MyOrders} />
    <BuyingCartStack.Screen name="Review" component={Review} />
  </BuyingCartStack.Navigator>
);

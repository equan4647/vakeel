import React from 'react';
import { Button, View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BuyingStack,
  ClassifiedStack,
  DeliveryStack,
  FoodStack,
  ServicesStack,
  TopicStack,
} from '../SubStacks';
import styles from '../styles';
import { tabBarOptions, tabScreenOptions } from '../config';
import { AppStyles, Metrics } from '../../theme';
import { getDrawerPreference } from '../../ducks/drawerPreference/selectors';
import { DRAWER_PREFERENCE } from '../../config/Constants';
import { DeliveryRoomHelper } from '../../utils';
import { notificationsActions } from '../../ducks/notifications';
import { useUserRole } from '../../utils/CustomHooks';

const Tab = createBottomTabNavigator();

function Tabs() {
  const preference = useSelector(getDrawerPreference),
    isGuest = useUserRole(),
    dispatch = useDispatch();

  React.useEffect(() => {
    if (!isGuest) {
      dispatch(notificationsActions.requestGetNotificationsCount());
    }
  }, [dispatch, isGuest]);

  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          AppStyles.triangle,
          styles.trianglePositionVertical,
          styles[
            preference === DRAWER_PREFERENCE.RIGHT
              ? 'triangleRight'
              : 'triangleLeft'
          ],
        ]}
      />
      <Tab.Navigator
        screenOptions={tabScreenOptions}
        tabBarOptions={{
          ...tabBarOptions,
          style: {
            ...tabBarOptions.style,
            height: Metrics.ratio(60) + insets.bottom,
          },
        }}
        sceneContainerStyle={styles.sceneContainerTab}
      >
        <Tab.Screen name="Classified" component={ClassifiedStack} />
        <Tab.Screen name="Buying" component={BuyingStack} />
        <Tab.Screen name="Community" component={TopicStack} />
        <Tab.Screen name="Food" component={FoodStack} />
        <Tab.Screen
          name="Delivery"
          component={DeliveryStack}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="Service" component={ServicesStack} />
      </Tab.Navigator>
    </>
  );
}

/*
<Tab.Screen name="Community" component={TopicStack} />
        <Tab.Screen name="Food" component={FoodStack} />
        <Tab.Screen name="Delivery" component={DeliveryStack} />
        <Tab.Screen name="Services" component={ServicesStack} />
*/

export default Tabs;
function DriverPresence() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="hit driver present"
        onPress={DeliveryRoomHelper.updateDriverLocation}
      />
    </View>
  );
}

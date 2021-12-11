import React, { useLayoutEffect } from 'react';
import { useBackHandler } from '@react-native-community/hooks';

import { AppStyles, Metrics } from '../../theme';
import { HeaderBackImage, ScrollableTabView } from '../../common';
import { strings } from '../../utils/i18n';
import ItemsOrder from './ItemsOrder';
import FoodOrder from './FoodOrder';
import { NavigationService } from '../../utils';
import { ButtonView } from '../../components';

const MyOrders = ({ navigation, route }) => {
  const fromMenu = route.params?.fromMenu ?? false;

  const headerLeft = () => (
    <ButtonView
      onPress={() =>
        fromMenu
          ? NavigationService.pop()
          : NavigationService.navigate('BuyingHome')
      }
      hitSlop={Metrics.hitSlop}
    >
      <HeaderBackImage isCross={false} />
    </ButtonView>
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: '', headerLeft });
  }, [navigation, fromMenu]);

  useBackHandler(() => {
    if (!fromMenu) {
      NavigationService.navigate('BuyingHome');
      return true;
    }
    // let the default thing happen
    return false;
  });

  return (
    <ScrollableTabView
      isUnderlineFull
      containerStyle={AppStyles.flex}
      prerenderingSiblingsNumber={2}
      customUnderLineWidth={Metrics.screenWidth / 2 - 60}
    >
      <ItemsOrder tabLabel={strings('app.itemsCaps')} />
      <FoodOrder tabLabel={strings('app.foods')} />
    </ScrollableTabView>
  );
};

export default MyOrders;

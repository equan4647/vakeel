import React from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FoodActionButton, OrderStepper } from '../../common';
import styles from './styles';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import useFoodOrderStepperInfo from '../../DataUtils/FoodOrderUtil';
import { foodOrdersSelectors } from '../../ducks/foodOrders';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { ErrorViewApi, Text } from '../../components';
import { strings } from '../../utils/i18n';
import { requestCurrentFoodOrder } from '../../ducks/foodCart/actions';
import { useUserRole } from '../../utils/CustomHooks';

const FoodOrderProgress = () => {
  const data = useFoodOrderStepperInfo(),
    myStyles = useMyStyles(),
    isGuest = useUserRole(),
    orderInProgress = useSelector(foodOrdersSelectors.getOrderInProgress),
    { failure, loading } = useSelector(
      getRequestFlag('GET_CURRENT_FOOD_ORDER')
    );

  const viewOrder = () => {
    NavigationService.navigate(
      'FoodOrderDetail',
      { showCross: true, isHistory: false },
      'FoodCartStack'
    );
  };

  const dispatch = useDispatch();

  const renderContent = () => {
    if (loading === true) {
      return <ActivityIndicator size="small" color={Colors.primary} />;
    } else if (!loading && failure === true) {
      return (
        <ErrorViewApi
          errorMessage={strings('api_error_messages.current_food_order_fail')}
          onPressRetry={() => {
            dispatch(requestCurrentFoodOrder);
          }}
        />
      );
    } else {
      return Util.isStatusPending(orderInProgress) ? (
        <Text>Searching Bringer</Text>
      ) : (
        <>
          <OrderStepper {...data} />
          <Image source={Images.icons.arrowRight} style={styles.arrow} />
        </>
      );
    }
  };

  if (
    (Util.isNotEmpty(orderInProgress) &&
      !isGuest &&
      Util.isStatusInProgress(orderInProgress)) ||
    Util.isStatusPending(orderInProgress) ||
    failure
  ) {
    const TagView =
      loading === true || failure === true ? View : TouchableHighlight;

    return (
      <TagView
        style={styles.orderProgressContainer}
        underlayColor={Colors.whiteO9}
        onPress={viewOrder}
      >
        {renderContent()}
      </TagView>
    );
  } else {
    return <FoodActionButton containerStyle={myStyles.actionButton} />;
  }
};

function useMyStyles() {
  const orderProgress = useSelector(foodOrdersSelectors.isOrderInProgress);
  return {
    container: { paddingBottom: orderProgress ? Metrics.ratio(140) : 0 },
    actionButton: orderProgress ? { marginBottom: Metrics.ratio(175) } : {},
  };
}

export { FoodOrderProgress, useMyStyles };

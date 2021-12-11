import { useBackHandler } from '@react-native-community/hooks';
import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { SuccessHeader, SuccessButtons } from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';
import { OrderUtil } from '../../DataUtils';
import { getCheckoutData } from '../../ducks/orders/selectors';

const OrderSuccess = ({ navigation }) => {
  // set header title
  React.useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: null,
    });
  });

  const onDonePress = () => NavigationService.navigate('Buying');

  const onViewOrder = () => NavigationService.navigate('MyOrders');

  useBackHandler(onDonePress);

  const checkoutData = useSelector(getCheckoutData);

  return (
    <View style={[AppStyles.container, styles.container]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SuccessHeader
          description={strings('app.your_payment_has_been_made')}
        />

        <Text style={styles.dateTime}>
          {OrderUtil.getUpdatedAt(checkoutData)}
        </Text>

        <Text style={styles.deliveryDays}>
          {strings('app.order_success_days')}
        </Text>
      </View>

      <SuccessButtons
        titleBtnOne={strings('app.view_order')}
        titleBtnTwo={strings('app.done')}
        onPressBtnOne={onViewOrder}
        onPressBtnTwo={onDonePress}
      />
    </View>
  );
};
export default OrderSuccess;

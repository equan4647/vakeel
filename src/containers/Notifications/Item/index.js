import React from 'react';
import { View } from 'react-native';
import HTML from 'react-native-render-html';
import { useSelector } from 'react-redux';

import { ButtonView, ImageViewHttpRound } from '../../../components';
import styles from './styles';
import { getNotificationItem } from '../../../ducks/notifications/selectors';
import { NotificationsUtil } from '../../../DataUtils';
import {
  NOTIFICATIONS,
  NOTIFICATION_IDENTIFIERS,
} from '../../../config/Constants';
import { NavigationService } from '../../../utils';

const Item = ({ id, identifier }) => {
  const data = useSelector(getNotificationItem(id));

  const onPress = () => {
    if (identifier === NOTIFICATIONS.SERVICE) {
      NavigationService.navigate('ServiceBookingDetails', {
        booking_id: data.reference_id,
      });
    } else if (identifier === NOTIFICATIONS.MARKETPLACE) {
      if (
        data.target_identifier ===
        NOTIFICATION_IDENTIFIERS.MARKETPLACE_PRODUCT_UPDATED
      ) {
        NavigationService.push('ViewBuyingProduct', {
          item: data.reference_id,
        });
      } else {
        NavigationService.navigate('OrderDetail', {
          id: data.reference_id,
        });
      }
    } else if (identifier === NOTIFICATIONS.CLASSIFIED) {
      NavigationService.navigate('ClassifiedDetail', {
        classifiedId: data.reference_id,
      });
    } else if (identifier === NOTIFICATIONS.RESTAURANT) {
      NavigationService.navigate('FoodOrderDetail', { id: data.reference_id });
    }
  };

  const MyView = identifier === NOTIFICATIONS.CLASSIFIED ? View : ButtonView;

  return (
    <MyView onPress={onPress} style={styles.container}>
      <ImageViewHttpRound
        style={styles.imageView}
        url={NotificationsUtil.avatar(data, identifier)}
      />
      <View style={styles.detailsContainer}>
        <HTML source={{ html: NotificationsUtil.message(data) }} />
      </View>
    </MyView>
  );
};

export default Item;

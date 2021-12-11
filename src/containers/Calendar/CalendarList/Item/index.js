import { View } from 'react-native';
import React from 'react';

import { ButtonView, Text } from '../../../../components';
import { Colors } from '../../../../theme';
import styles from './styles';
import { AppUtil, Util } from '../../../../utils';
import { getServiceHistoryItem } from '../../../../ducks/serviceHistory/selectors';
import { ServiceBookingUtil } from '../../../../DataUtils';
import { useSelector } from 'react-redux';

const Item = ({ name, date, id, type }) => {
  const data = useSelector(getServiceHistoryItem(id));

  const backgroundColor =
    type === 'service' ? Colors.frogGreen : Colors.ceruleanBlue;
  return (
    <ButtonView
      style={styles.container}
      onPress={() => Util.redirectFromCalendar(type, id)}
    >
      <View style={[styles.leftBar, { backgroundColor }]} />
      <View style={styles.details}>
        <Text style={styles.title} size="size_16" type="semiBold">
          {ServiceBookingUtil.title(data)}
        </Text>
        <Text style={styles.time}>
          {AppUtil.format24HrTo12(
            ServiceBookingUtil.start_time(data),
            ServiceBookingUtil.end_time(data)
          )}
        </Text>
        <Text style={styles.time}>{`Service #${ServiceBookingUtil.getId(
          data
        )}`}</Text>
      </View>
    </ButtonView>
  );
};

export default Item;

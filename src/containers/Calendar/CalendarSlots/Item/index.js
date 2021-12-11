import React from 'react';

import styles from './styles';
import { ButtonView, Text } from '../../../../components';
import { Colors } from '../../../../theme';
import { AppUtil, Util } from '../../../../utils';
import { useSelector } from 'react-redux';
import { getServiceHistoryItem } from '../../../../ducks/serviceHistory/selectors';
import { ServiceBookingUtil } from '../../../../DataUtils';

const Item = ({ id, type, title, time }) => {
  const data = useSelector(getServiceHistoryItem(id));

  const backgroundColor =
    type === 'service' ? Colors.frogGreen : Colors.ceruleanBlue;

  return (
    <ButtonView
      style={[styles.container, { backgroundColor }]}
      onPress={() => Util.redirectFromCalendar(type, id)}
    >
      <Text style={styles.title}>{ServiceBookingUtil.title(data)}</Text>
      <Text style={styles.time}>
        {AppUtil.format24HrTo12(
          ServiceBookingUtil.start_time(data),
          ServiceBookingUtil.end_time(data)
        )}
      </Text>
    </ButtonView>
  );
};

export default Item;

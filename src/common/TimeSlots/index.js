import { ViewPropTypes, FlatList } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles';
import Item from './Item';
import { FlatListApi } from '../../components';
import { servicesActions, servicesSelectors } from '../../ducks/services';
import { useSelector } from 'react-redux';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { Util } from '../../utils';

const TimeSlots = ({ data, style, onItemSelected, selectedId, payload }) => {
  const date1 = moment(payload.booked_date, 'YYYY-M-D').format('YYYY-MM-DD');
  const date2 = moment().format('YYYY-MM-DD');

  const isSameOrAfter = moment(date1).isSameOrAfter(date2);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('AVAILABLE_SLOTS')
  );

  const slots = useSelector(servicesSelectors.getBookingSlots);

  return (
    <FlatListApi
      data={isSameOrAfter ? slots : []}
      requestAction={servicesActions.requestAvailableBookingSlots}
      style={[styles.container, style]}
      contentContainerStyle={{ paddingTop: 10 }}
      renderItem={({ item, index }) => (
        <Item
          data={item}
          index={index}
          isSelected={item.id === selectedId}
          onItemSelected={onItemSelected}
        />
      )}
      {...{
        requestFlags,
        payload,
      }}
    />
  );
};

TimeSlots.propTypes = {
  data: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  selectedId: PropTypes.any,
  style: ViewPropTypes.style,
};
TimeSlots.defaultProps = { style: {}, selectedId: '' };

export default TimeSlots;

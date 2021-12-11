import { View } from 'react-native';
import React from 'react';

import { AppStyles } from '../../../theme';
import { FlatListApi, Text } from '../../../components';
import styles from './styles';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestFlag } from '../../../ducks/requestFlags/selectors';
import {
  serviceHistoryActions,
  serviceHistorySelectors,
} from '../../../ducks/serviceHistory';
import { AppUtil, Util } from '../../../utils';
import { getServiceHistoryItem } from '../../../ducks/serviceHistory/selectors';
import { EmptyView } from '../../../common';
import { strings } from '../../../utils/i18n';

const ItemContainer = ({ item, index, identifier }) => {
  const data = useSelector(getServiceHistoryItem(item));
  const slots = useSelector(serviceHistorySelectors.getServiceHistoryData);

  const isShowDate = AppUtil.calendarList(index, slots);

  // console.log('dataX', data);
  const style = index > 0 ? { marginTop: 0 } : {};
  return (
    <>
      {isShowDate ? (
        <Text style={[styles.header, style]}>
          {Util.formatDate3(data.booked_date, 'DD MMM YYYY')}
        </Text>
      ) : null}
      <Item id={item} type="service" />
    </>
  );
};

const CalendarList = ({
  style,
  onItemSelected,
  selectedId,
  payload,
  identifier,
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(serviceHistoryActions.resetCalendarSlots(identifier));
    };
  }, []);

  const requestFlags = useSelector(
    getRequestFlag(`GET_SERVICE_HISTORY_${identifier}`)
  );

  const slots = useSelector(
    serviceHistorySelectors.getServiceHistoryList(identifier)
  );

  const sortedData = AppUtil.sortedCalendarList(slots);

  return (
    <FlatListApi
      data={sortedData}
      contentContainerStyle={styles.contentContainerStyle}
      identifier={identifier}
      requestAction={serviceHistoryActions.requestServiceHistory}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      keyExtractor={(_, index) => index.toString()}
      style={[styles.container, style]}
      renderItem={({ item, index }) => (
        <ItemContainer {...{ item, index, identifier }} />
      )}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="calendar"
          text={strings('app.calendar_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
      {...{
        requestFlags,
        payload,
      }}
    />
  );
};

export default CalendarList;

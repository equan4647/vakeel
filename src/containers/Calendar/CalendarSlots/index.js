import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyView } from '../../../common';
import { FlatListApi } from '../../../components';
import { getRequestFlag } from '../../../ducks/requestFlags/selectors';
import {
  serviceHistoryActions,
  serviceHistorySelectors,
} from '../../../ducks/serviceHistory';
import { AppStyles } from '../../../theme';
import { AppUtil } from '../../../utils';
import { strings } from '../../../utils/i18n';
import Item from './Item';
import styles from './styles';

const CalendarSlots = ({
  style,
  onItemSelected,
  selectedId,
  payload,
  identifier,
}) => {
  const requestFlags = useSelector(
    getRequestFlag(`GET_SERVICE_HISTORY_${identifier}`)
  );

  const dispatch = useDispatch();

  React.useEffect(
    () => () => dispatch(serviceHistoryActions.resetCalendarSlots(identifier)),
    [dispatch]
  );

  const date1 = AppUtil.calendarFormatedDate(payload);
  const date2 = moment().format('YYYY-MM-DD');

  const isSameOrAfter = moment(date1).isSameOrAfter(date2);

  const slots = useSelector(
    serviceHistorySelectors.getServiceHistoryList(identifier)
  );

  return (
    <FlatListApi
      data={isSameOrAfter ? slots : []}
      contentContainerStyle={styles.contentContainerStyle}
      identifier={identifier}
      requestAction={serviceHistoryActions.requestServiceHistory}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      keyExtractor={(_, index) => index.toString()}
      style={[styles.container, style]}
      renderItem={({ item }) => <Item id={item} type="service" />}
      {...{
        requestFlags,
        payload,
      }}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="calendar"
          text={strings('app.calendar_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

export default CalendarSlots;

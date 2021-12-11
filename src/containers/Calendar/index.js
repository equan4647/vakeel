import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';

import { Calendar as CalendarComp, HeaderRightImage } from '../../common';
import { AppStyles, Images } from '../../theme';
import CalendarSlots from './CalendarSlots';
import { strings } from '../../utils/i18n';
import CalendarList from './CalendarList';
import { AppUtil } from '../../utils';
import { IDENTIFIERS, SERVICE_ITEM_TYPE } from '../../config/Constants';

const Calendar = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [date, setdDate] = useState(AppUtil.getCalendarDate(false));

  const onPressHeaderRight = () => {
    setShowCalendar(currentShowCalendar => !currentShowCalendar);
  };

  const renderHeaderRight = () => {
    const icon = showCalendar ? 'list' : 'calendar';
    return (
      <HeaderRightImage img={Images.icons[icon]} onPress={onPressHeaderRight} />
    );
  };
  /*
  NavigationService.setHeader(navigation, strings('app.calendar'), headerRight);*/
  useEffect(() => {
    navigation.setOptions({
      title: strings('app.calendar'),
      headerRight: renderHeaderRight,
    });
  }, [navigation, showCalendar]);

  const onDayPress = value => {
    setdDate(AppUtil.getCalendarDate(false, value));
  };

  const renderCalendar = () => {
    if (showCalendar) {
      return (
        <CalendarComp
          initialDate={AppUtil.calendarFormatedDate(date)}
          onDayPress={onDayPress}
          bottomItem={() => (
            <CalendarSlots
              payload={{
                ...date,
                booked_date: 'ASC',

                status: SERVICE_ITEM_TYPE.PENDING,
              }}
              identifier={IDENTIFIERS.CALENDAR_SLOTS}
            />
          )}
        />
      );
    }
    return null;
  };

  const renderCalendarList = () => {
    if (!showCalendar) {
      return (
        <CalendarList
          payload={{
            active_date: true,
            booked_date: 'ASC',
            status: SERVICE_ITEM_TYPE.PENDING,
          }}
          identifier={IDENTIFIERS.CALENDAR_LIST}
        />
      );
    }
  };

  return (
    <View style={AppStyles.flex}>
      {renderCalendar()}
      {renderCalendarList()}
    </View>
  );
};

export default Calendar;

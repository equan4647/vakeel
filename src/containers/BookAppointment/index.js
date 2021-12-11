import * as RNLocalize from 'react-native-localize';
import React, { useState } from 'react';
import { View } from 'react-native';

import { AppUtil, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import {
  Calendar,
  AppButton,
  BottomButtonContainer,
  TimeSlots,
} from '../../common';
import { AppStyles } from '../../theme';
import { authSelectors } from '../../ducks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetAddress } from '../../ducks/addresses/actions';

const BookAppointment = ({ navigation, route }) => {
  const [selectedSlot, setSelectedSlot] = useState({});

  const [date, setdDate] = useState(AppUtil.getCalendarDate());

  const service_id = route?.params?.service_id ?? '';

  const user_id = useSelector(authSelectors.getUserID);

  const dispatch = useDispatch();

  NavigationService.setCrossBackHeader(
    navigation,
    strings('app.book_appointment')
  );

  const onTimeSlotSelect = slot => {
    setSelectedSlot(slot);
  };

  const onConfirmPress = () => {
    dispatch(requestGetAddress());

    setTimeout(() => {
      NavigationService.navigate('BookingConfirmation', {
        service_id,
        // date: { ...selectedSlot, ...date },
        date,
        selectedSlot,
      });
    }, 500);
  };

  const onDayPress = value => {
    const date = AppUtil.getCalendarDate(true, value);
    setSelectedSlot({});
    setdDate(date);
  };

  const renderBottomButton = () => {
    return (
      <BottomButtonContainer>
        <AppButton
          disabled={Util.isEmpty(selectedSlot)}
          onPress={onConfirmPress}
          title={strings('app.confirm_date_time')}
        />
      </BottomButtonContainer>
    );
  };

  const renderCalendar = () => {
    return (
      <Calendar
        onDayPress={onDayPress}
        bottomItem={() => (
          <TimeSlots
            onItemSelected={onTimeSlotSelect}
            selectedId={selectedSlot.id}
            payload={{
              ...date,
              service_id,
              user_id,
              timezone: RNLocalize.getTimeZone(),
            }}
          />
        )}
      />
    );
  };

  return (
    <View style={AppStyles.flex}>
      {renderCalendar()}
      {renderBottomButton()}
    </View>
  );
};

export default BookAppointment;

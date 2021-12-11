import React, { useRef, useEffect, forwardRef } from 'react';

import {
  ExpandableCalendar,
  CalendarProvider,
  LocaleConfig,
} from 'react-native-calendars';
import { ViewPropTypes, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Image } from '../../components';
import { Separator } from '..';
import { Colors, Fonts, Images, Metrics } from '../../theme';
import styles from './styles';

LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

const renderArrow = direction => {
  const icon =
    direction === 'left'
      ? Images.icons.calendarLeft
      : Images.icons.calendarRight;
  return (
    <Image
      source={icon}
      style={direction === 'left' ? { marginLeft: 8 } : { marginRight: 8 }}
    />
  );
};

const Calendar = (
  { initialDate, count, style, bottomItem, onDayPress, disableTouch, ...rest },
  ref
) => {
  return (
    <>
      <CalendarProvider date={initialDate} onDateChanged={onDayPress}>
        <ExpandableCalendar
          staticHeader={false}
          enableSwipeMonths={false}
          // disableArrowLeft={}
          // hideExtraDays={true}
          // disabledDaysIndexes={[0, 6]}
          // showSixWeeks
          // scrollEnabled={false}
          // disableAllTouchEventsForDisabledDays={true}
          minDate={'2012-06-10'}
          firstDay={1}
          allowShadow={false}
          disablePan={true}
          // hideExtraDays
          // disableWeekScroll
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#000000',
            textSectionTitleDisabledColor: 'red',
            selectedDayBackgroundColor: '#50c80e',
            // selectedDayTextColor: '#ffffff',
            todayTextColor: '#000000',
            textDisabledColor: '#000000',
            dayTextColor: '#000000',
            dotColor: '#50c80e',
            selectedDotColor: '#ffffff',
            monthTextColor: '#000000',
            textMonthFontSize: 18,
            textDayHeaderFontSize: 10,

            textMonthFontFamily: Fonts.type.regular,
            textDayHeaderFontFamily: Fonts.type.bold,
            textDayStyle: {
              marginTop: Platform.OS === 'android' ? 4 : 4.5,
              fontSize: Metrics.ratio(18),
              fontWeight: Platform.OS === 'android' ? '600' : '400',
            },
            textMonthStyle: {
              backgroundColor: 'red',
            },
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 0,
                paddingRight: 0,
                marginBottom: 10,
                marginTop: 0,
                alignItems: 'center',
              },
              monthText: {
                fontSize: Fonts.size.size_18,
                fontFamily: Fonts.type.regular,
                color: Colors.black,
                margin: 20,
              },
              week: {
                marginTop: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },

            'stylesheet.calendar.main': {
              week: {
                //marginTop: 0,
                //marginBottom: 7,
                //flexDirection: 'row',
                //justifyContent: 'space-around',
                //paddingRight: 20,
              },
            },
            'stylesheet.calendar-list.main': {
              // container: {
              //   backgroundColor: 'red',
              // },
              calendar: {
                paddingLeft: 0,
                paddingRight: 0,
              },
              staticHeader: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            'stylesheet.day.basic': {
              selectedText: {
                fontFamily: Fonts.type.bold,
                color: 'white',
                fontWeight: 'bold',
              },
              base: {
                //marginTop: 4,
                //bottom: 6,
                width: 32,
                height: 32,
                alignItems: 'center',
                // marginHorizontal: 10,
                // zIndex: 1,
              },
              container: {
                alignItems: 'stretch',
              },
            },
          }}
          renderArrow={renderArrow}
          hideKnob={true}
          //disablePan={true} //we need this
          //disableWeekScroll={true}
          // {...rest}
        />
        <Separator
          style={{
            marginBottom: 24,
            marginHorizontal: 20,
            marginTop: Platform.OS === 'android' ? 4 : 0,
          }}
        />
        {bottomItem()}
      </CalendarProvider>
    </>
  );
};

/*
textMonthFontFamily: Fonts.type.regular,
          textDayHeaderFontFamily: Fonts.type.bold,
          textDayStyle: {
            marginTop: Platform.OS === 'android' ? 2 : 4.5,
            fontFamily: Fonts.type.bold,
            fontSize: Metrics.ratio(18),
            fontWeight: '500',
          },
          textMonthStyle: {
            backgroundColor: 'red',
          },
*/

/*
'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
              // backgroundColor: 'red',
              //height: 100,
              //paddingBottom: 20,
            },
            dayHeader: {
              // paddingHorizontal: 0,
              width: 100,
              textAlign: 'center',
              fontSize: 10,
              fontFamily: Fonts.type.bold,
              color: '#000000',
            },

            arrow: {
              padding: 10,
            },

            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              //height: 100,
              backgroundColor: '#fff',
              padding: 5,
            },
            weekdays: {
              backgroundColor: 'red',
            },
            weekday: {
              backgroundColor: 'red',
            },
            headerContainer: {
              // backgroundColor: 'red',
            },
          },
          'stylesheet.day.basic': {
            selectedText: {
              fontFamily: Fonts.type.bold,
              color: 'white',
              fontWeight: 'bold',
            },
            base: {
              bottom: 6,
              width: 32,
              height: 32,
              alignItems: 'center',
              // marginHorizontal: 10,
              // zIndex: 1,
            },
            container: {
              alignItems: 'stretch',
            },
          },
          'stylesheet.expandable.main': {
            knob: {
              width: Metrics.screenWidth - 40,
              borderTopWidth: 1,
              borderColor: Colors.lightBlueGrey,
              // paddingHorizontal: 20,
              bottom: 15,
            },
            header: {},
            headerTitle: {
              // paddingHorizontal: 0,
            },
          },
          'stylesheet.calendar-list.main': {
            // container: {
            //   backgroundColor: 'red',
            // },
            calendar: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            staticHeader: {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              paddingLeft: 0,
              paddingRight: 0,
            },
          },

*/

/*
'stylesheet.calendar-list.main': {
            calendar: { paddingLeft: 9, paddingRight: 9 },
            staticHeader: {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: 'white',
              paddingLeft: 9,
              paddingRight: 9,
            },
          },
*/

Calendar.propTypes = {
  count: PropTypes.number,
  style: ViewPropTypes.style,
  initialDate: PropTypes.string,
};
Calendar.defaultProps = {
  initialDate: new Date(),
};

export default React.forwardRef(Calendar);

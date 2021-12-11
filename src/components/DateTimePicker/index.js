// @flow
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import {Util} from '../../utils';
import styles from './styles';
import {strings} from '../../utils/i18n';
import {DATE_PICKER_TYPE} from '../../config/Constants';
import {Colors} from '../../theme';

export default class DateTimePicker extends React.PureComponent {
  static propTypes = {
    dateValue: PropTypes.string.isRequired,
    displayFormat: PropTypes.string.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    format: PropTypes.string.isRequired,
    mode: PropTypes.oneOf([
      DATE_PICKER_TYPE.TIME,
      DATE_PICKER_TYPE.DATE_TIME,
      DATE_PICKER_TYPE.DATE,
    ]),
  };

  static defaultProps = {
    mode: DATE_PICKER_TYPE.TIME,
  };

  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }

  state = {
    dateValue: this.props.dateValue,
  };

  getFormattedOutput = (date) => {
    const {mode} = this.props;
    if (mode === DATE_PICKER_TYPE.DATE) {
      return Util.formatDate(date, 'YYYY-MM-DD', 'DD MMM, YYYY');
    } else if (mode === DATE_PICKER_TYPE.TIME) {
      return Util.formatTime(date, 'HH:mm:ss', 'h:mm A');
    } else if (mode === DATE_PICKER_TYPE.DATE_TIME) {
      return Util.formatTime(
        date,
        'YYYY-MM-DD HH:mm:ss',
        'DD, MMM, YYYY h:mm A',
      );
    }
  };

  onDateChange = (date) => {
    const {format, displayFormat, onChangeDate, mode} = this.props;
    this.setState({
      dateValue: date,
    });
    if (this.props.onChangeDate) {
      const displayDate = this.getFormattedOutput(date);
      onChangeDate(displayDate, date);
    }
  };

  showDateTimePicker = () => {
    this.datePicker.onPressDate();
  };

  render() {
    const {dateValue} = this.state;
    const {mode, ...rest} = this.props;
    return (
      <DatePicker
        style={styles.datePicker}
        showIcon={false}
        date={dateValue}
        mode={mode}
        is24Hour={false}
        onDateChange={this.onDateChange}
        confirmBtnText={strings('app.confirm')}
        cancelBtnText={strings('app.cancel')}
        ref={(ref) => {
          this.datePicker = ref;
        }}
        hideText={true}
        customStyles={{
          btnTextCancel: {
            color: Colors.darkSlateBlue,
          },
          btnTextConfirm: {
            color: Colors.cerise,
          },
          datePicker: {
            marginTop: 24,
            borderTopWidth: 0,
          },
        }}
        {...rest}
      />
    );
  }
}

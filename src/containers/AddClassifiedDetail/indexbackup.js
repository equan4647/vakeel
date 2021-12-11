import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { ScrollView, Button, View, Platform } from 'react-native';
import React, { useState } from 'react';

import { ValidationUtil, IQKeyboardManager, DataHandler } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { FormGenerator, Text } from '../../components';
import { Tags, MultiSlider as MultiSlider2, SingleSlider } from '../../common';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';

const AddClassifiedDetail = ({ navigation }) => {
  /*
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');
  const [currentDate, setCurrentDate] = useState(
    moment().add(1, 'days').toDate()
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const setModeDate = () => {
    setMode('date');
    showDatePicker();
    setCurrentDate(moment().add(3, 'days').toDate());
  };

  const setModeTime = () => {
    setMode('time');
    showDatePicker();
  };
  */

  React.useEffect(() => {
    IQKeyboardManager.setToolbarEnable(false);
  });

  // header
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: strings('app.details') });
  }, [navigation]);

  return (
    <ScrollView style={AppStyles.container}>
      <Button
        title="Show Date Picker"
        onPress={() => {
          DataHandler.getDatePickerModalRef().show({
            mode: 'date',
            onSelected: date => {
              //console.log('date selected', date);
            },
          });
          //alert('Show Date picker');
        }}
      />
    </ScrollView>
  );

  /*
  import DateTimePickerModal from 'react-native-modal-datetime-picker';
  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={currentDate}
      />
  */

  /*
  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.signup),
    defaultValues: { tags: '', price_range: [], select_year: [], near_by: '' },
  });

  const tagsProps = useInputProps(formObj, 'tags');
  const priceRangeProps = useInputProps(formObj, 'price_range');
  const selectYearProps = useInputProps(formObj, 'select_year');
  const nearByProps = useInputProps(formObj, 'near_by');

  return (
    <ScrollView style={AppStyles.container}>
      <Text style={{ marginBottom: 20 }}>This is testing here</Text>

      <SingleSlider
        min={0}
        max={100}
        step={1}
        heading="Search Near By in Km"
        rightTitle="km"
        {...nearByProps}
      />
      <MultiSlider2
        min={0}
        max={100000}
        step={1000}
        heading="Price Range in USD"
        maxPlus
        {...priceRangeProps}
      />
      <MultiSlider2
        min={2000}
        max={2020}
        step={1}
        heading="Select Year"
        formatNumber={false}
        {...selectYearProps}
      />
      <Tags
        heading="Condition"
        data={[
          { id: 1, title: 'New' },
          { id: 2, title: 'Used' },
        ]}
        {...tagsProps}
      />
      <Text
        style={{ padding: 20 }}
        onPress={() => {
          formObj.reset();
        }}
      >
        Reset Form
      </Text>
    </ScrollView>
  );
  */
};

/*
data={['New', 'Old - Newest', 'High - Low Price', 'Low - High Price']}
*/

export default AddClassifiedDetail;

/*
 return (
    <ScrollView style={AppStyles.container}>
      <FormGenerator />
    </ScrollView>
  );
*/

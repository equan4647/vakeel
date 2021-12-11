import { useInputProps } from '../../utils/CustomHooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ScrollView, Button } from 'react-native';
import React from 'react';

import { FormGenerator, Text } from '../../components';
import {
  Tags,
  MultiSlider,
  BottomButton,
  DateRange,
  DatePickerInput,
  TextInput,
} from '../../common';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import { NavigationService, ValidationUtil, DataHandler } from '../../utils';
const AddClassifiedDetail = ({ navigation }) => {
  // set title
  NavigationService.setTitle(navigation, strings('app.details'));

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.signup),
    defaultValues: { tags: '' },
  });

  const emailProps = useInputProps(formObj, 'email');
  const dateInputProps = useInputProps(formObj, 'date');
  const startDateProps = useInputProps(formObj, 'start_date');
  const endDateProps = useInputProps(formObj, 'end_date');

  return (
    <>
      <ScrollView style={AppStyles.container}>
        <TextInput
          title={strings('app.email')}
          keyboardType="email-address"
          {...emailProps}
        />

        <DatePickerInput
          {...dateInputProps}
          title="Time From"
          required
          mode="date"
          defaultValue="2020-12-08"
        />
        <DateRange
          isFilter
          heading="Add Date Range"
          leftInputProps={{
            ...startDateProps,
          }}
          rightInputProps={{
            ...endDateProps,
          }}
        />
      </ScrollView>
      <BottomButton onPress={() => NavigationService.navigate('UploadPhoto')} />
    </>
  );
};

/*
<DatePickerInput
          {...dateInputProps}
          title="Time From"
          required
          mode="date"
          defaultValue="2020-12-08"
        />
*/

/*
const tagsProps = useInputProps(formObj, 'tags');
 <DateRange />
*/

/*
 <Button
          title="Show Date Picker"
          onPress={() => {
            DataHandler.getDatePickerModalRef().show({
              mode: 'time',
              date: '08:00:00',
              onSelected: date => {
                console.log('date selected', date);
              },
            });
            //alert('Show Date picker');
          }}
        /> 

*/

/*
 <MultiSlider min={0} max={50} />

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
*/

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

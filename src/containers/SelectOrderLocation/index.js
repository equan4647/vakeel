import React from 'react';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BottomButton, PickAndDropLocation, TextInput } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { AppStyles } from '../../theme';
import { NavigationService, ValidationUtil } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import myOrders from '../../data/myOrders';


const SelectOrderLocation = ({ navigation }) => {
  NavigationService.setTitle(navigation, strings('app.order_location'));

  const initialValues = { additional_notes: '' };

  // set form hooks
  const formObj = useForm({
    // resolver: yupResolver(ValidationUtil.report_ad),
    defaultValues: initialValues,
  });

  const additionalNotesProps = useInputProps(formObj, 'additional_notes');
  //submit
  const onPressSend = values => {
    const onPayment = () =>
      NavigationService.navigate('FoodOrderDetail', {
        withDelivery: false,
        ...myOrders.food[0],
      });
    NavigationService.navigate('PaymentMethod', { onPayment });
  };
  const submit = formObj.handleSubmit(onPressSend);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={AppStyles.container}
        contentContainerStyle={styles.container}
      >
        <PickAndDropLocation
          pickAddress="81 Greenleaf Ave Staten Island, NY"
          dropAddress="72 Greenleaf Ave Staten Island, NY"
          onPressDrop={() =>
            NavigationService.navigate('AddressScreen', {
              onProceed: () => NavigationService.goBack(),
            })
          }
        />

        <TextInput
          title={strings('app.additional_notes')}
          placeholder={strings('app.order_notes_placeholder')}
          {...additionalNotesProps}
          required
          multiline
        />
      </ScrollView>
      <BottomButton
        title={`${strings('app.proceed')} $${73.96}`}
        onPress={submit}
      />
    </>
  );
};
export default SelectOrderLocation;

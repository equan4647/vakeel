import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import {
  NavigationService,
  ValidationUtil,
  CCFieldFormatter,
} from '../../utils/';
import { TextInput, FormContainer } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { requestAddPaymentMethod } from '../../ducks/payment/actions';
import { Loader } from '../../components';

export default ({ navigation, route }) => {
  const isEdit = route?.params?.isEdit ?? false;
  const data = route?.params?.data ?? {};

  const dispatch = useDispatch();
  NavigationService.setHeader(
    navigation,
    strings(isEdit ? 'app.edit_card' : 'app.add_card')
  );

  const initialValues = {
    card_number: isEdit ? data.card_number : '',
    name_on_card: isEdit ? data.name_on_card : '',
    card_expiry: isEdit ? data.card_expiry : '',
    ccv: isEdit ? data.ccv : '',
  };

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.creditCardInput),
    defaultValues: initialValues,
  });

  const onPressSend = formObj.handleSubmit(
    values => {
      const payload = {
        number: values.card_number,
        expMonth: Number(values.card_expiry.split('/')[0]),
        expYear: Number(values.card_expiry.split('/')[1]),
        cvc: values.ccv,
        name: values.name_on_card,
        currency: 'usd',
      };
      dispatch(requestAddPaymentMethod(payload));
    },
    err => console.log(err, 'err hai')
  );

  const cardNumberProps = useInputProps(formObj, 'card_number');
  const nameOnCardProps = useInputProps(formObj, 'name_on_card');
  const cardExpiryProps = useInputProps(formObj, 'card_expiry');
  const ccvProps = useInputProps(formObj, 'ccv');

  const submit = formObj.handleSubmit(onPressSend);

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={onPressSend}>
      <TextInput
        title={strings('app.card_number')}
        keyboardType="numeric"
        nextFocusRef={nameOnCardProps.forwardRef}
        formatValueChange={CCFieldFormatter.formatNumber}
        required
        customPlaceholder="4242 4242 4242 4242"
        maxLength={19}
        {...cardNumberProps}
      />

      <TextInput
        title={strings('app.name_on_card')}
        keyboardType="default"
        nextFocusRef={cardExpiryProps.forwardRef}
        required
        {...nameOnCardProps}
      />

      <TextInput
        title={strings('app.card_expiry')}
        keyboardType="numeric"
        nextFocusRef={ccvProps.forwardRef}
        required
        formatValueChange={CCFieldFormatter.formatExpiry}
        customPlaceholder="03/22"
        maxLength={5}
        {...cardExpiryProps}
      />

      <TextInput
        title={strings('app.ccv')}
        keyboardType="numeric"
        onSubmit={submit}
        required
        formatValueChange={CCFieldFormatter.formatCVC}
        customPlaceholder="123"
        maxLength={3}
        {...ccvProps}
      />
      <Loader type="ADD_PAYMENT_METHOD" />
    </FormContainer>
  );
};

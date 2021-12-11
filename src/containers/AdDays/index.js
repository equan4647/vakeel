import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import React from 'react';

import { API_ADVERTISMENT_GET_DAYS } from '../../config/WebService';
import { NavigationService, ValidationUtil } from '../../utils';
import { advertisingActions } from '../../ducks/advertising';
import { SelectionInput, FormContainer } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { IDENTIFIERS } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { Loader } from '../../components';

export default ({ navigation, route }) => {
  NavigationService.setCrossBackHeader(navigation, strings('app.add_days'));

  const data = route?.params?.data;

  const dispatch = useDispatch();

  const initialValues = {};

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.addDays),
    defaultValues: initialValues,
  });

  const watchPostingDays = formObj.watch('posting_days', { amount: '' });
  // setAmount(watchPostingDays.amount);
  const totalAmount = watchPostingDays.amount
    ? `$${watchPostingDays.amount}`
    : '';

  const onPaymentSuccess = () => {
    NavigationService.reset('AdSuccess', { addDays: true });
  };

  //submit
  const onProceed = value => {
    const { amount, days } = value.posting_days;
    const { id } = data;
    const payload = {
      id,
      valid_days: days,
      package_amount: amount,
      update_package: 1,
    };

    NavigationService.navigate(
      'PaymentMethod',
      {
        onSubmit: paymentPayload =>
          dispatch(
            advertisingActions.requestCreateAdvertise(
              { ...paymentPayload, ...payload },
              IDENTIFIERS.ADD_ADVERTISMENT_DAYS,
              onPaymentSuccess
            )
          ),
        amountToCharge: amount,
      },
      'PaymentMethodStack'
    );
  };

  const postingDaysProps = useInputProps(formObj, 'posting_days');

  const submit = formObj.handleSubmit(onProceed);

  return (
    <>
      <FormContainer
        buttonText={`${strings('app.proceed')} ${totalAmount}`}
        buttonPress={submit}
      >
        <SelectionInput
          title={strings('app.posting_days')}
          idKey="days"
          titleKey="days"
          api={API_ADVERTISMENT_GET_DAYS}
          identifier={IDENTIFIERS.ADVERTISING_DAYS}
          payload={{}}
          hideSearch
          required
          {...postingDaysProps}
        />
        <Loader type="CREATE_ADVERTISE_ADD_ADVERTISMENT_DAYS" />
      </FormContainer>
    </>
  );
};

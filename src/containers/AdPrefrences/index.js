import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import React, { useState } from 'react';

import {
  ValidationUtil,
  NavigationService,
  DataHandler,
  Util,
  AppUtil,
} from '../../utils';
import { SelectionInput, FormContainer } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { getUser } from '../../ducks/auth/selectors';
import { adDays, adCategories } from '../../data';

import { strings } from '../../utils/i18n';
import { advertisingActions } from '../../ducks/advertising';
import { IDENTIFIERS } from '../../config/Constants';
import { API_ADVERTISMENT_GET_DAYS } from '../../config/WebService';
import { Loader } from '../../components';

export default ({ navigation, route }) => {
  NavigationService.setHeader(navigation, strings('app.ad_prefrences'));

  const advertisingInfo = DataHandler.getAdvertisingInfo();

  const [amount, setAmount] = useState(advertisingInfo.package_amount ?? '');

  const isEdit = advertisingInfo?.id ? true : false;

  const loaderIndentifier = isEdit
    ? 'CREATE_ADVERTISE_UPDATE_ADVERTISMENT'
    : 'CREATE_ADVERTISE_CREATE_ADVERTISMENT';

  const category = adCategories.findIndex(
    val => val.title === advertisingInfo?.module_type
  );

  const postingDays = adDays.findIndex(
    val => val.title === advertisingInfo?.valid_days?.toString()
  );

  const initialValues = {
    category: advertisingInfo?.module_type
      ? adCategories[category]
      : adCategories[0],
    posting_days: advertisingInfo?.valid_days
      ? { id: 1, days: advertisingInfo?.valid_days }
      : '',
  };

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const adInfo = DataHandler.getAdvertisingInfo();

  const creator_id = user._id;
  const user_id = user._id;
  const creator_type = user.user_type;

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.adPrefrences),
    defaultValues: initialValues,
  });

  const onPaymentSuccess = id => {
    if (isEdit) {
      NavigationService.popToTop();
      NavigationService.pop();
    } else {
      NavigationService.reset('AdSuccess', { id });
    }
  };

  const watchPostingDays = formObj.watch('posting_days', { amount: '' });

  const proceedAmout = watchPostingDays.amount
    ? watchPostingDays.amount
    : adInfo.package_amount
    ? adInfo.package_amount
    : '';

  if (watchPostingDays.amount) {
    DataHandler.setAdvertisingInfo({
      package_amount: watchPostingDays.amount,
      valid_days: watchPostingDays.days,
    });
  }

  //submit
  const onPressSave = data => {
    const valid_days = watchPostingDays.days;
    const module_type = data.category.title;
    const package_amount = proceedAmout;
    // const package_amount = data.posting_days.amount;
    const payload = {
      valid_days,
      module_type,
      creator_id,
      user_id,
      creator_type,
      package_amount,
    };

    DataHandler.setAdvertisingInfo(payload);

    isEdit && DataHandler.setAdvertisingInfo({ update_package: 0 });

    if (isEdit) {
      dispatch(
        advertisingActions.requestCreateAdvertise(
          { ...adInfo, update_package: 0 },
          IDENTIFIERS.UPDATE_ADVERTISMENT,
          onPaymentSuccess
        )
      );
    } else {
      NavigationService.navigate(
        'PaymentMethod',
        {
          amountToCharge: proceedAmout,
          onSubmit: (
            paymentPayload //console.log('Request CreateAdvertise'),
          ) => {
            Util.promptPayment(() => {
              dispatch(
                advertisingActions.requestCreateAdvertise(
                  { ...paymentPayload, ...adInfo, ...payload },
                  IDENTIFIERS.CREATE_ADVERTISMENT,
                  onPaymentSuccess
                )
              );
            });
          },
        },
        'PaymentMethodStack'
      );
    }
  };

  const submit = formObj.handleSubmit(onPressSave);

  const categoryProps = useInputProps(formObj, 'category');
  const productTypeProps = useInputProps(formObj, 'product_type');
  const postingDaysProps = useInputProps(formObj, 'posting_days');
  const { title: categoryType } = formObj.watch('category', adCategories[0]);
  return (
    <>
      <FormContainer
        buttonText={
          isEdit
            ? 'Save'
            : `${strings('app.proceed')} ${AppUtil.formatPrice(proceedAmout)} `
        }
        buttonPress={submit}
      >
        <SelectionInput
          customTitle={strings('app.related_category')}
          title={strings('app.category')}
          data={adCategories}
          hideSearch
          required
          bottomSpaceLarge
          {...categoryProps}
          disabled={isEdit}
        />

        {/* <SelectionInput
          customTitle={`Related ${categoryType} Type`}
          title={strings('app.product_type')}
          data={BuyingCatData}
          required
          bottomSpaceLarge
          {...productTypeProps}
        /> */}

        <SelectionInput
          title={strings('app.posting_days')}
          // data={adDays}
          idKey="days"
          titleKey="days"
          api={API_ADVERTISMENT_GET_DAYS}
          identifier={IDENTIFIERS.ADVERTISING_DAYS}
          payload={{}}
          hideSearch
          required
          {...postingDaysProps}
          disabled={isEdit}
        />

        <Loader type={loaderIndentifier} />
      </FormContainer>
    </>
  );
};

import { yupResolver } from '@hookform/resolvers/yup';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import React from 'react';

import { API_CLASSIFIED_REPORT_TYPE } from '../../config/WebService';
import { TextInput, AppButton, SelectionInput } from '../../common';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { IDENTIFIERS } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { Loader } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';

import { classifiedActions } from '../../ducks/classified';
import { advertisingActions } from '../../ducks/advertising';

export default ({ navigation, route }) => {
  // get item id
  const item_id = route?.params?.item_id ?? 0;

  // set header
  NavigationService.setHeader(
    navigation,
    route.params?.title ?? strings('app.report_ad')
  );

  // set inital values
  const initialValues = { description: '' };

  // init const dispatch
  const dispatch = useDispatch();

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.report_advertisment),
    defaultValues: initialValues,
  });
  const descriptionProps = useInputProps(formObj, 'description');
  //submit
  const onPressSend = values => {
    // const report_type = values?.type?.id ?? 0;
    const reason = values?.description ?? '';
    const advertisement_id = item_id;

    const payload = { reason, advertisement_id };
    console.log('payload', payload);
    dispatch(advertisingActions.requestReportAd(payload));

    // console.log(values);
    // NavigationService.goBack();
  };
  const submit = formObj.handleSubmit(onPressSend);

  return (
    <View style={AppStyles.container}>
      <ScrollView bounces={false}>
        <TextInput
          title={strings('app.describe_your_problem')}
          placeholder={strings('app.enter_description')}
          {...descriptionProps}
          required
          multiline
        />
      </ScrollView>
      <AppButton
        title={strings('app.send')}
        container={styles.appButtonContainer}
        onPress={submit}
      />
      <Loader type="REPORT_ADVERTISIEMENT" />
    </View>
  );
};

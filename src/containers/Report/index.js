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

export default ({ navigation, route }) => {
  // get item id
  const item_id = route?.params?.item_id ?? 0;
  const identifier = route?.params?.identifier ?? '';
  const idKey = route?.params?.idKey ?? '';
  const titleKey = route?.params?.titleKey ?? '';
  const typeUrl = route?.params?.reportTypeUrl ?? API_CLASSIFIED_REPORT_TYPE;
  const onSubmitting = route?.params?.onSubmitting ?? onSubmit;

  // set header
  NavigationService.setHeader(
    navigation,
    route.params?.title ?? strings('app.report_ad')
  );

  // set inital values
  const initialValues = { type: '', description: '' };

  // init const dispatch
  const dispatch = useDispatch();

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.report_ad),
    defaultValues: initialValues,
  });
  const typeProps = useInputProps(formObj, 'type');
  const descriptionProps = useInputProps(formObj, 'description');
  //submit
  const onSubmit = values => {
    const report_type = values?.type?.id ?? 0;
    const comment = values?.description ?? '';
    const product_id = item_id;

    const payload = { report_type, comment, product_id };
    dispatch(classifiedActions.requestReportProduct(payload));

    //console.log(values);
    //NavigationService.goBack();
  };
  const submit = formObj.handleSubmit(onSubmitting);

  return (
    <View style={AppStyles.container}>
      <ScrollView bounces={false}>
        <SelectionInput
          title={strings('app.problem_type')}
          idKey={idKey}
          titleKey={titleKey}
          payload={{}}
          hideSearch
          // api={API_CLASSIFIED_REPORT_TYPE}
          api={typeUrl}
          identifier={identifier}
          required
          {...typeProps}
        />
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
      <Loader
        type={[
          'REPORT_CLASSIFIED',
          'REPORT_SERVICE',
          'REPORT_DELIVERY_ORDER',
          'REPORT_FOOD_ORDER',
        ]}
      />
    </View>
  );
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput, DateRange, FormContainer } from '../../common';
import { NavigationService, Util, ValidationUtil } from '../../utils';
import { DATE_PICKER_TYPE } from '../../config/Constants';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { authActions } from '../../ducks/auth';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';
import { Loader } from '../../components';
import _ from 'lodash';

export default props => {
  const { navigation, route } = props;
  const data = route.params?.data;
  const dispatch = useDispatch();
  NavigationService.setHeader(navigation, strings('app.edit_employment_info'));

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.editEmploymentInfo),
    defaultValues: data ?? {},
  });
  const totalExpProps = useInputProps(formObj, 'total_work_exp');
  const companyProps = useInputProps(formObj, 'company');
  const jobTitleProps = useInputProps(formObj, 'job_title');
  const startDateProps = useInputProps(formObj, 'start_date');
  const endDateProps = useInputProps(formObj, 'end_date');

  const submit = formObj.handleSubmit(values => {
    if (
      values.end_date >= values.start_date ||
      (values.end_date == 'Present' &&
        new Date(values.start_date) <= new Date())
    ) {
      dispatch(
        authActions.requestUpdateProfile(
          { employment_info: values },
          NavigationService.goBack
        )
      );
    } else {
      Util.showMessage('app.invalid_date');
    }
    Keyboard.dismiss();
  });

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={submit}>
      <TextInput
        title={strings('app.total_work_exp_label')}
        keyboardType="numeric"
        containerStyle={styles.topSpace}
        nextFocusRef={companyProps.forwardRef}
        maxLength={2}
        {...totalExpProps}
      />

      <TextInput
        title={strings('app.company')}
        containerStyle={styles.topSpace}
        nextFocusRef={jobTitleProps.forwardRef}
        {...companyProps}
      />

      <TextInput
        title={strings('app.job_title')}
        containerStyle={styles.topSpace}
        {...jobTitleProps}
      />

      <DateRange
        leftInputProps={{
          ...startDateProps,
          title: strings('app.from'),
          mode: DATE_PICKER_TYPE.YEAR_MONTH,
          defaultValue: data?.start_date ?? '',
          extraProps: { maximumDate: new Date() },
        }}
        rightInputProps={{
          ...endDateProps,
          title: strings('app.to'),
          mode: DATE_PICKER_TYPE.YEAR_MONTH,
          defaultValue: data?.end_date ?? '',
          extraProps: { maximumDate: new Date() },
        }}
        isEmptySeparator
        presentCheckboxTitle={strings('app.currently_i_am_working')}
      />
      <Loader type={'UPDATE_PROFILE'} />
    </FormContainer>
  );
};

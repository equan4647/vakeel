import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { NavigationService, ValidationUtil, Util } from '../../utils';
import { TextInput, DateRange, FormContainer } from '../../common';
import { DATE_PICKER_TYPE } from '../../config/Constants';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { Loader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../ducks/auth';
import { Keyboard } from 'react-native';
import { getUser } from '../../ducks/auth/selectors';
import { UserUtil } from '../../DataUtils';

export default props => {
  const { navigation, route } = props;
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  let education = UserUtil.getEducation(user);

  const isEditable = route?.params?.isEditable ?? false;
  const index = route?.params?.index;
  const data = education[index];

  const onDeletePress = () => {
    Util.showAlertConfirm(
      strings('messages.education_remove_title'),
      '',
      strings('app.yes'),
      onConfirmDelete
    );
  };

  const requestUpdate = () =>
    dispatch(
      authActions.requestUpdateProfile({ education }, NavigationService.goBack)
    );

  const onConfirmDelete = () => {
    education.splice(index, 1);
    requestUpdate();
  };

  NavigationService.setDeleteHeader(
    navigation,
    strings(isEditable ? 'app.edit_education' : 'app.add_education'),
    isEditable && onDeletePress
  );

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.editEducation),
    defaultValues: isEditable ? data : {},
  });

  const schoolProps = useInputProps(formObj, 'school');
  const degreeProps = useInputProps(formObj, 'degree');
  const startDateProps = useInputProps(formObj, 'start_date');
  const endDateProps = useInputProps(formObj, 'end_date');

  const from = useWatch({
    control: startDateProps.control,
    name: startDateProps.name,
    defaultValue: startDateProps.defaultValues,
  });

  const to = useWatch({
    control: endDateProps.control,
    name: endDateProps.name,
    defaultValue: endDateProps.defaultValues,
  });

  const submit = formObj.handleSubmit(values => {
    isEditable ? education.splice(index, 1, values) : education.push(values);
    requestUpdate();
    Keyboard.dismiss();
  });

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={submit}>
      <TextInput
        title={strings('app.school')}
        containerStyle={styles.topSpace}
        nextFocusRef={degreeProps.forwardRef}
        {...schoolProps}
      />

      <TextInput title={strings('app.degree')} {...degreeProps} />

      <DateRange
        isEmptySeparator
        leftInputProps={{
          ...startDateProps,

          yearAdd:
            to && Number(to) <= new Date().getFullYear()
              ? Number(to) - new Date().getFullYear()
              : 0,

          title: strings('app.from'),
          mode: DATE_PICKER_TYPE.YEAR,
          defaultValue: isEditable ? data?.start_date : '',
        }}
        rightInputProps={{
          ...endDateProps,
          startFrom: Number(from) ? Number(from) + 1 : 1900,

          yearAdd:
            Number(from) + 8 > new Date().getFullYear()
              ? Math.abs(Number(from) + 8 - new Date().getFullYear())
              : 0,

          title: strings('app.to'),
          mode: DATE_PICKER_TYPE.YEAR,
          defaultValue: isEditable ? data?.end_date : '',
        }}
      />
      <Loader type={'UPDATE_PROFILE'} />
    </FormContainer>
  );
};

import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationService, ValidationUtil, Util } from '../../utils';
import { TextInput, DateRange, FormContainer } from '../../common';
import { DATE_PICKER_TYPE } from '../../config/Constants';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { authActions } from '../../ducks/auth';
import { Keyboard } from 'react-native';
import { Loader } from '../../components';
import { getUser } from '../../ducks/auth/selectors';
import { UserUtil } from '../../DataUtils';

export default props => {
  const { navigation, route } = props;
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const medical_info = UserUtil.getMedicalInfo(user);

  const isEditable = route?.params?.isEditable ?? false;
  const index = route?.params?.index;
  const data = medical_info[index];

  const onDeletePress = () => {
    Util.showAlertConfirm(
      strings('messages.medical_info_remove_title'),
      '',
      strings('app.yes'),
      onConfirmDelete
    );
  };

  const requestUpdate = () =>
    dispatch(
      authActions.requestUpdateProfile(
        { medical_info },
        NavigationService.goBack
      )
    );

  const onConfirmDelete = () => {
    medical_info.splice(index, 1);
    requestUpdate();
  };

  NavigationService.setDeleteHeader(
    navigation,
    strings(isEditable ? 'app.edit_medical_info' : 'app.add_medical_info'),
    isEditable && onDeletePress
  );

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.editMedicalInfo),
    defaultValues: isEditable ? data : {},
  });
  const diagonosisProps = useInputProps(formObj, 'diagonosis');
  const fromProps = useInputProps(formObj, 'from');
  const toProps = useInputProps(formObj, 'to');

  const from = useWatch({
    control: fromProps.control,
    name: fromProps.name,
    defaultValue: fromProps.defaultValues,
  });

  const to = useWatch({
    control: toProps.control,
    name: toProps.name,
    defaultValue: toProps.defaultValues,
  });

  const submit = formObj.handleSubmit(values => {
    isEditable
      ? medical_info.splice(index, 1, values)
      : medical_info.push(values);

    requestUpdate();
    Keyboard.dismiss();
  });

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={submit}>
      <TextInput
        title={strings('app.diagonosis')}
        containerStyle={styles.topSpace}
        {...diagonosisProps}
      />

      <DateRange
        isEmptySeparator
        leftInputProps={{
          ...fromProps,

          yearAdd:
            to && to <= new Date().getFullYear()
              ? to - new Date().getFullYear()
              : 0,

          title: strings('app.from'),
          mode: DATE_PICKER_TYPE.YEAR,
        }}
        rightInputProps={{
          ...toProps,

          startFrom: from ? from : 1900,

          title: strings('app.to'),
          mode: DATE_PICKER_TYPE.YEAR,
        }}
        separatorStyle={styles.dateRangeSeparator}
      />
      <Loader type="UPDATE_PROFILE" />
    </FormContainer>
  );
};

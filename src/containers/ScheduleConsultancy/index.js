import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextInput,
  BottomButton,
  DateRange,
  DatePickerInput,
  SwitchComponent,
} from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import styles from './styles';
import { DATE_PICKER_TYPE } from '../../config/Constants';
import { Text } from '../../components';

const timeInputProps = {
  title: '',
  arrowDown: false,
  required: true,
  mode: DATE_PICKER_TYPE.TIME,
};
const initialValues = {
  title: '',
  agenda: '',
  start_time: '',
  end_time: '',
  date: '',
  is_video_consultancy: false,
  is_paid_consultancy: false,
  charges: '',
};

export default ({ navigation, route }) => {
  const [validationObj, setValidationObj] = useState(
    ValidationUtil.scheduleConsultancyWithCharges
  );
  const isEdit = route.params?.isEdit ?? false;
  NavigationService.setCrossBackHeader(
    navigation,
    strings(isEdit ? 'app.edit_schedule' : 'app.schedule_consultancy')
  );

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(validationObj),
    defaultValues: initialValues,
  });
  // const categoryProps = useInputProps(formObj, 'category');
  const titleProps = useInputProps(formObj, 'title');
  const agendaProps = useInputProps(formObj, 'agenda');
  const startTimeProps = useInputProps(formObj, 'start_time');
  const endTimeProps = useInputProps(formObj, 'end_time');
  const dateProps = useInputProps(formObj, 'date');
  const isVideoProps = useInputProps(formObj, 'is_video_consultancy');
  const isPaidProps = useInputProps(formObj, 'is_paid_consultancy');
  const chargesProps = useInputProps(formObj, 'charges');

  //submit
  const onPressSend = values => {
    NavigationService.goBack();
  };
  const submit = formObj.handleSubmit(onPressSend, err => console.log(err));
  const isPaid = formObj.watch('is_paid_consultancy', false);

  useEffect(() => {
    if (isPaid) {
      setValidationObj(ValidationUtil.scheduleConsultancyWithCharges);
    } else {
      setValidationObj(ValidationUtil.scheduleConsultancy);
    }
  }, [isPaid]);
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TextInput
          title={strings('app.title')}
          containerStyle={styles.topSpace}
          nextFocusRef={agendaProps.forwardRef}
          {...titleProps}
          required
        />

        <TextInput
          title={strings('app.agenda')}
          {...agendaProps}
          maxLength={200}
          multiline
          showCharCount
          required
        />

        <DatePickerInput
          {...dateProps}
          customTitle={strings('app.select_date')}
          title=""
          showTitle
          required
        />

        <DateRange
          isFilter={false}
          leftInputProps={{
            ...startTimeProps,
            ...timeInputProps,
            customTitle: strings('app.time_from'),
          }}
          rightInputProps={{
            ...endTimeProps,
            ...timeInputProps,
            customTitle: strings('app.time_to'),
          }}
          separatorStyle={styles.dateRangeSeparator}
        />

        <SwitchComponent
          {...isVideoProps}
          title={strings('app.video_consultancy')}
        />

        <SwitchComponent
          {...isPaidProps}
          title={strings('app.paid_consultancy')}
          style={styles.paidConsultancy}
        />

        {isPaid ? (
          <TextInput
            title={strings('app.charges')}
            renderLeft={() => (
              <Text style={AppStyles.leftInputTextStyle}>$</Text>
            )}
            keyboardType="numeric"
            onSubmit={submit}
            {...chargesProps}
            required
          />
        ) : null}
      </ScrollView>
      <BottomButton title={strings('app.send_invite')} onPress={submit} />
    </>
  );
};

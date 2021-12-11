import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';

import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { TextInput, FormContainer } from '../../common';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { authActions } from '../../ducks/auth';
import { Loader } from '../../components';

// const initialValues = {
//   hobbies: 'Gaming, Movies, Novels, Eating Out',
//   interests:
//     'Games, Technology, Designs, Cars, Bikes, Sports, Health & Wellness',
// };

export default props => {
  const { navigation, route } = props;
  const data = route.params?.data;
  NavigationService.setHeader(
    navigation,
    strings('app.edit_recreational_activities')
  );

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.editRecreationalActivities),
    defaultValues: data ?? {},
  });

  const hobbiesProps = useInputProps(formObj, 'hobbies');
  const interestsrops = useInputProps(formObj, 'interests');
  const dispatch = useDispatch();

  const submit = formObj.handleSubmit(values => {
    dispatch(
      authActions.requestUpdateProfile(
        { recreational_activities: values },
        NavigationService.goBack
      )
    );
    Keyboard.dismiss();
  });

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={submit}>
      <TextInput
        multiline
        title={strings('app.hobbies')}
        containerStyle={styles.topSpace}
        nextFocusRef={interestsrops}
        {...hobbiesProps}
      />

      <TextInput
        multiline
        title={strings('app.interests')}
        containerStyle={styles.topSpace}
        {...interestsrops}
      />
      <Loader type={'UPDATE_PROFILE'} />
    </FormContainer>
  );
};

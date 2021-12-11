import React from 'react';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput, SelectionInput, BottomButton } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { TopicsData } from '../../data/topics';
import styles from './styles';
import { UPLOAD_PHOTOS_FOR } from '../../config/Constants';

const topic_data = TopicsData.list.map(({ title }, id) => ({ title, id }));

export default ({ navigation, route }) => {
  const isEdit = route.params?.isEdit ?? false;
  if (isEdit) {
    NavigationService.setTitle(navigation, strings('app.edit_topic'));
  } else {
    NavigationService.setCrossBackHeader(
      navigation,
      strings('app.create_topic')
    );
  }

  const initialValues = { category: '', topic_title: '' };

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.createTopic),
    defaultValues: initialValues,
  });
  const categoryProps = useInputProps(formObj, 'category');
  const topicTitleProps = useInputProps(formObj, 'topic_title');
  //submit
  const onPressSend = values => {
    NavigationService.navigate('UploadPhoto', {
      uploadPhotosFor: UPLOAD_PHOTOS_FOR.TOPIC,
    });
  };
  const submit = formObj.handleSubmit(onPressSend);

  return (
    <>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        style={AppStyles.container}
      >
        <SelectionInput
          title={strings('app.category')}
          data={topic_data}
          containerStyle={styles.topSpace}
          {...categoryProps}
          required
        />
        <TextInput
          title={strings('app.topic_title')}
          {...topicTitleProps}
          required
        />
      </ScrollView>
      <BottomButton title={strings('app.next')} onPress={submit} />
    </>
  );
};

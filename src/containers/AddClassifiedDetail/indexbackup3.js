import { useInputProps } from '../../utils/CustomHooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import React from 'react';

import { NavigationService, ValidationUtil, DataHandler } from '../../utils';
import { BottomButton, TextInput, Tags, SelectionInput } from '../../common';
import { FORM_TYPE } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';

import { AppStyles } from '../../theme';

const addFormArray = [
  {
    formType: FORM_TYPE.TAGS,
    name: 'condition',
    required: true,
    data: [
      { id: 1, title: 'New' },
      { id: 2, title: 'Used' },
    ],
    heading: 'Condition',
    defaultValue: {},
  },
  {
    formType: FORM_TYPE.INPUT,
    name: 'title',
    required: true,
    title: 'Add Title',
    showCharCount: true,
    maxLength: 70,
    defaultValue: '',
  },
  {
    formType: FORM_TYPE.INPUT,
    name: 'description',
    hint: 'Type in important features of your item',
    title: 'Item Name',
    required: true,
    customTitle: 'Describe your item',
    showCharCount: true,
    maxLength: 4096,
    multiline: true,
    defaultValue: '',
  },
];

const AddClassifiedDetail = ({ navigation }) => {
  // set title
  NavigationService.setTitle(navigation, strings('app.details'));

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.signup),
    defaultValues: { tags: '' },
  });

  const customHookArray = [];
  addFormArray.map((item, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    customHookArray[index] = useInputProps(formObj, item.name);
  });

  return (
    <>
      <ScrollView style={AppStyles.container}>
        {addFormArray.map((item, index) => {
          const { formType, name, ...rest } = item;
          const hookFormProps = customHookArray[index];
          if (formType === FORM_TYPE.TAGS) {
            return <Tags {...rest} {...hookFormProps} />;
          } else if (formType === FORM_TYPE.INPUT) {
            return <TextInput {...rest} {...hookFormProps} />;
          }
          return null;
        })}
      </ScrollView>
      <BottomButton onPress={() => NavigationService.navigate('UploadPhoto')} />
    </>
  );
};

export default AddClassifiedDetail;

/*
const tagsProps = useInputProps(formObj, 'tags');
  const titleProps = useInputProps(formObj, 'title');
  const descriptionProps = useInputProps(formObj, 'description');
<Tags
          heading="Condition"
          required
          data={[
            { id: 1, title: 'New' },
            { id: 2, title: 'Used' },
          ]}
          {...tagsProps}
        />
        <TextInput
          hint="Type in important feature of your item"
          title={'Add Title'}
          required
          showCharCount
          maxLength={70}
          {...titleProps}
        />
        <TextInput
          hint="Type in important features of your item"
          title={'Item Name'}
          required
          customTitle="Describe your item"
          showCharCount
          maxLength={4096}
          multiline
          {...descriptionProps}
        />
*/

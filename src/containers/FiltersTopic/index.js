import React from 'react';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import { useInputProps } from '../../utils/CustomHooks';
import { Tags, BottomButton } from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

const FiltersTopic = ({ navigation, route }) => {
  // set title
  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  const initialValues = { tags: '' };

  // set form hooks
  const formObj = useForm({
    defaultValues: initialValues,
  });

  const tagsProps = useInputProps(formObj, 'tags');

  //submit
  const submit = formObj.handleSubmit(() => {
    NavigationService.pop();
  });

  const onClearPress = () => formObj.reset();

  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <Tags
          title="Sorting"
          data={[
            { id: 1, title: 'Recent' },
            { id: 2, title: 'Old - Newest' },
            { id: 3, title: 'Most Popular' },
          ]}
          {...tagsProps}
        />
      </ScrollView>
      <BottomButton onPress={submit} title={strings('app.apply_filter')} />
    </>
  );
};

export default FiltersTopic;

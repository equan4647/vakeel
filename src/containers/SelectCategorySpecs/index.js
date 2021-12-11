import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Dropdown, BottomButton, HeaderRightText } from '../../common';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
// import styles from './styles';

const CategorySpecs = ({ navigation, route }) => {
  // header
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: route.params?.categoryName ,
    headerRight:()=><HeaderRightText text="SKIP"/>
    });
  }, [navigation, route]);

  // initial values
  // const initialValues = { make: '' };

  const { control, handleSubmit, errors, reset } = useForm({
    // resolver: yupResolver(ValidationUtil.categorySpecs),
    // defaultValues: initialValues,
  });

  //submit
  const submit = handleSubmit();

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AppStyles.container}
        bounces={false}
      >
        <Dropdown title="Make" {...{ control, errors }} />
      </ScrollView>
      <BottomButton title={strings('app.submit')} onPress={submit} />
    </>
  );
};
export default CategorySpecs;

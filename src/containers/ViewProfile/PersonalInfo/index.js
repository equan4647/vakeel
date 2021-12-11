import { View } from 'react-native';
import React from 'react';

import { Text } from '../../../components';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { HorizontalTitle } from '../../../common';
import { NavigationService } from '../../../utils';

const Field = React.memo(({ title, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
});

const PersonalInfo = ({ data }) => {
  const onEditPress = () => {
    NavigationService.navigate('EditProfile');
  };
  return (
    <View style={styles.container}>
      <HorizontalTitle
        title={strings('app.personal_info')}
        rightTitle={strings('app.editCaps')}
        rightTextStyle={styles.editBtn}
        onPress={onEditPress}
      />

      {data.map((item, index) => (
        <Field {...item} key={index} />
      ))}
    </View>
  );
};

export default React.memo(PersonalInfo);

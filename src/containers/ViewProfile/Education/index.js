import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../../../components';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { HorizontalTitle } from '../../../common';
import { NavigationService } from '../../../utils';
import EmptyView from '../EmptyView';

const EducationItem = React.memo(({ data, index }) => {
  const { school, degree, start_date, end_date } = data;
  const onEditPress = () =>
    NavigationService.navigate('EditEducation', { index, isEditable: true });

  return (
    <View style={styles.fieldContainer}>
      <HorizontalTitle
        title={school}
        rightTitle={strings('app.editCaps')}
        rightTextStyle={styles.editBtn}
        onPress={onEditPress}
      />
      <Text style={styles.degree}>{degree}</Text>
      <Text style={styles.year}>{`${start_date} - ${end_date}`}</Text>
    </View>
  );
});

const Education = ({ data }) => {
  const onAddPress = () => {
    NavigationService.navigate('EditEducation');
  };

  return (
    <View style={styles.container}>
      <HorizontalTitle
        title={strings('app.education')}
        rightTitle={strings('app.addCaps')}
        titleS
        rightTextStyle={styles.editBtn}
        leftTextStyle={styles.title}
        onPress={onAddPress}
      />

      {data.length ? (
        data.map((item, index) => (
          <EducationItem data={item} key={index.toString()} {...{ index }} />
        ))
      ) : (
        <EmptyView title={strings('app.education')} />
      )}
    </View>
  );
};

Education.propTypes = {
  data: PropTypes.array,
};
Education.defaultProps = {
  data: [],
};

export default React.memo(Education);

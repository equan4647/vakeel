import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../../components';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { HorizontalTitle } from '../../../common';
import { NavigationService } from '../../../utils';
import EmptyView from '../EmptyView';

const InfoItem = React.memo(({ data, index }) => {
  const { diagonosis, from, to } = data;
  const onEditPress = () => {
    NavigationService.navigate('EditMedicalInfo', { index, isEditable: true });
  };

  return (
    <View style={styles.fieldContainer}>
      <HorizontalTitle
        title={diagonosis}
        rightTitle={strings('app.editCaps')}
        rightTextStyle={styles.editBtn}
        onPress={onEditPress}
      />
      <Text style={styles.year}>{`${from} - ${to}`}</Text>
    </View>
  );
});

const MedicalInfo = ({ data }) => {
  const onAddPress = () => NavigationService.navigate('EditMedicalInfo');

  return (
    <View style={styles.container}>
      <HorizontalTitle
        title={strings('app.medical_info')}
        rightTitle={strings('app.addCaps')}
        titleS
        rightTextStyle={styles.editBtn}
        leftTextStyle={styles.title}
        onPress={onAddPress}
      />

      {data.length ? (
        data.map((item, index) => (
          <InfoItem data={item} key={index.toString()} {...{ index }} />
        ))
      ) : (
        <EmptyView title={strings('app.medical_info')} />
      )}
    </View>
  );
};

MedicalInfo.propTypes = {
  data: PropTypes.array,
};
MedicalInfo.defaultProps = {
  data: [],
};

export default React.memo(MedicalInfo);

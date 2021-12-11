import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../../components';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { HorizontalTitle } from '../../../common';
import { NavigationService } from '../../../utils';
import EmptyView from '../EmptyView';

const ActivityItem = React.memo(({ title, value }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
});

const RecreationalActivities = ({ data }) => {
  const onEditPress = () => {
    NavigationService.navigate('EditRecreationalActivities', { data });
  };

  return (
    <View style={styles.container}>
      <HorizontalTitle
        title={strings('app.recreational_activities')}
        rightTitle={data ? strings('app.editCaps') : strings('app.addCaps')}
        rightTextStyle={styles.editBtn}
        onPress={onEditPress}
      />
      {data ? (
        <>
          <ActivityItem title={strings('app.hobbies')} value={data.hobbies} />

          <ActivityItem
            title={strings('app.interests')}
            value={data.interests}
          />
        </>
      ) : (
        <EmptyView title={strings('app.recreational_activities')} />
      )}
    </View>
  );
};

RecreationalActivities.propTypes = {
  data: PropTypes.object,
};
RecreationalActivities.defaultProps = {};

export default React.memo(RecreationalActivities);

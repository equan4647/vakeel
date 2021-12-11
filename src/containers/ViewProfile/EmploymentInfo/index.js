import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../../components';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { HorizontalTitle } from '../../../common';
import { NavigationService } from '../../../utils';
import EmptyView from '../EmptyView';

const EmploymentItem = React.memo(({ data }) => {
  const { total_work_exp, company, job_title, start_date, end_date } = data;

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.experienceContainer}>
        <Text style={styles.fieldTitle}>{strings('app.total_work_exp')}</Text>
        <Text style={styles.fieldValue}>{total_work_exp}</Text>
      </View>

      <HorizontalTitle title={company} />
      <Text style={styles.degree}>{job_title}</Text>
      <Text style={styles.year}>{`${start_date} - ${end_date}`}</Text>
    </View>
  );
});

const Employment = ({ data }) => {
  const onEditPress = () => {
    NavigationService.navigate('EditEmploymentInfo', { data });
  };

  return (
    <View style={styles.container}>
      <HorizontalTitle
        title={strings('app.employment_info')}
        rightTitle={data ? strings('app.editCaps') : strings('app.addCaps')}
        titleS
        rightTextStyle={styles.editBtn}
        leftTextStyle={styles.title}
        onPress={onEditPress}
      />
      {data ? (
        <EmploymentItem {...{ data }} />
      ) : (
        <EmptyView title={strings('app.employment_info')} />
      )}
    </View>
  );
};

Employment.propTypes = {
  data: PropTypes.object,
};
Employment.defaultProps = {};

export default React.memo(Employment);

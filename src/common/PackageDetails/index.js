import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import { AppStyles } from '../../theme';
import { HorizontalTitle } from '..';
import styles from './styles';

const PackageDetails = ({ details, style, hasBar, onEditPress, title }) => {
  const customStyleBar = hasBar ? AppStyles.bar : {};
  return (
    <View style={[customStyleBar, style]}>
      <HorizontalTitle {...{ title, onEditPress }} />
      <Text style={styles.details}>{details}</Text>
    </View>
  );
};

PackageDetails.propTypes = {
  onEdit: PropTypes.func,
  hasBar: PropTypes.bool,
  details: PropTypes.string,
  style: ViewPropTypes.style,
  title: PropTypes.string,
};
PackageDetails.defaultProps = {
  onEditPress: undefined,
  hasBar: true,
  style: {},
  title: strings('app.package_details'),
  limitHeight: false,
};

export default PackageDetails;

import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, VehicleItem } from '..';
import { strings } from '../../utils/i18n';
import styles from './styles';

const DeliveryMethod = ({
  data,
  vehicleNumber,
  style,
  hasBar,
  onEditPress,
}) => {
  const customStyleBar = hasBar ? styles.bar : {};

  return (
    <View style={[customStyleBar, style]}>
      <HorizontalTitle
        title={strings('app.your_ride')}
        onEditPress={onEditPress}
      />

      <VehicleItem {...{ data, vehicleNumber }} style={styles.vehicleItem} />
    </View>
  );
};

DeliveryMethod.propTypes = {
  onEditPress: PropTypes.func,
  hasBar: PropTypes.bool,
  vehicleNumber: PropTypes.string,
  data: PropTypes.object,
  style: ViewPropTypes.style,
};
DeliveryMethod.defaultProps = {
  onEditPress: undefined,
  hasBar: true,
  vehicleNumber: '',
  style: {},
};

export default DeliveryMethod;

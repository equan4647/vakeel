import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ImageViewHttp, Text } from '../../components';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';
import { VehicleUtil } from '../../DataUtils';
import { VehicleNumber } from '..';

const VehicleItem = ({ style, isSmall, data, vehicleNumber }) => {
  const textSize = isSmall ? 'size_16' : 'size_17';

  return (
    <View style={[styles.itemContainer, style]}>
      {isSmall ? (
        <ImageViewHttp
          url={VehicleUtil.image(data)}
          style={styles.smallImage}
          borderRadius={Metrics.ratio(4)}
          placeholderStyle={styles.smallImagePlaceHolder}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.itemImageContainer}>
          <ImageViewHttp
            url={VehicleUtil.image(data)}
            borderRadius={Metrics.ratio(8)}
            placeholderStyle={styles.imgPlaceholderStyle}
            resizeMode="contain"
            style={styles.itemImage}
          />
        </View>
      )}

      <Text size={textSize} style={AppStyles.flex1}>
        {VehicleUtil.title(data)}
      </Text>

      {vehicleNumber ? <VehicleNumber number={vehicleNumber} /> : null}
    </View>
  );
};

VehicleItem.propTypes = {
  data: PropTypes.object.isRequired,
  vehicleNumber: PropTypes.string,
  style: ViewPropTypes.style,
  isSmall: PropTypes.bool,
};

VehicleItem.defaultProps = {
  style: {},
  isSmall: false,
  vehicleNumber: '',
  title: '',
};

export default VehicleItem;

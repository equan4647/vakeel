import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ViewPropTypes,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import { Images, Colors, Metrics } from '../../theme';
import styles from './styles';

const ActionButton = ({ containerStyle, onPress, type, badgeCount }) => {
  const image = () => {
    switch (type) {
      case 'add':
        return Images.icons.plusWhite;
      case 'cart':
        return Images.icons.cartFilled;
      case 'current-location':
        return Images.icons.currentLocationWhite;
      default:
        return Images.icons.cartFilled;
    }
  };
  return (
    <TouchableHighlight
      style={[styles.container, containerStyle]}
      underlayColor={Colors.frogGreen85}
      {...{ onPress }}
    >
      <>
        <Image
          resizeMode="contain"
          source={image()}
          style={{ marginRight: type === 'cart' ? Metrics.ratio(2) : 0 }}
        />

        {badgeCount > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.count}>{badgeCount}</Text>
          </View>
        )}
      </>
    </TouchableHighlight>
  );
};

ActionButton.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeCount: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  type: PropTypes.oneOf(['add', 'cart', 'current-location']),
};

ActionButton.defaultProps = {
  image: Images.icons.plusWhite,
  badgeCount: 0,
  type: 'cart',
};
export default React.memo(ActionButton);

import React from 'react';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../../components';
import { COMMUNICATION_MEDIUM } from '../../config/Constants';
import { Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const ConsultancyType = ({ type, textStyle, style }) => (
  <View style={[styles.container, style]}>
    <Image
      source={
        type === COMMUNICATION_MEDIUM.VIDEO
          ? Images.icons.video
          : Images.icons.callBlack
      }
      style={styles.icon}
    />
    <Text style={textStyle}>
      {strings(`app.${type}`)} {strings('app.consultancy')}
    </Text>
  </View>
);

ConsultancyType.propTypes = {
  display: PropTypes.oneOf(Object.values(COMMUNICATION_MEDIUM)).isRequired,
  style: ViewPropTypes.style,
};
ConsultancyType.defaultProps = {
  type: COMMUNICATION_MEDIUM.VIDEO,
};

export default React.memo(ConsultancyType);

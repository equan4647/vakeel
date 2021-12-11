import React from 'react';
import { View } from 'react-native';

import { Image, Text } from '../../components';
import { strings } from '../../utils/i18n';
import { Images } from '../../theme';
import styles from './styles';

const SuccessHeader = props => {
  const { description, containerStyle } = props;
  return (
    <View style={[styles.subContainer, containerStyle]}>
      <Image source={Images.icons.successful} />

      <Text style={styles.successfulTitleTextStyle}>
        {strings('app.congrats')}
      </Text>

      <Text style={styles.successfulDescriptionTextStyle}>{description}</Text>
    </View>
  );
};

export default SuccessHeader;

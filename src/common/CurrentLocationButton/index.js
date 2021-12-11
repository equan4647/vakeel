import { Image, View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text } from '../../components';
import { Images } from '../../theme';
import styles from './styles';

const CurrentLocationButton = ({ style, location, title, onPress }) => {
  return (
    <ButtonView
      style={StyleSheet.flatten([styles.container, style])}
      onPress={onPress}
    >
      <Image source={Images.icons.currentLocation} />

      <View style={styles.content}>
        <Text type="semiBold" size="size_16">
          {title.toUpperCase()}
        </Text>
        {location ? <Text style={styles.location}>{location}</Text> : null}
      </View>
    </ButtonView>
  );
};

CurrentLocationButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  location: PropTypes.string,
};
CurrentLocationButton.defaultProps = {
  style: {},
  location: '',
};

export default React.memo(CurrentLocationButton);

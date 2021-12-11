import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text, ButtonView, Image } from '../../../components';
import styles from './styles';

const ImageCircle = React.memo(props => {
  const { image, backgroundColor } = props;
  return (
    <View style={[styles.circleCenter, styles.gridCircle, { backgroundColor }]}>
      <Image source={image} />
    </View>
  );
});

const Item = props => {
  const { name, containerStyle, onPressItem } = props;

  const textProps = {
    numberOfLines: 2,
    textAlign: 'center',
    style: styles.textGrid,
  };

  return (
    <ButtonView
      style={[styles.gridContainer, containerStyle]}
      onPress={() => onPressItem(name)}
    >
      <ImageCircle {...props} />

      <Text {...textProps}>{name}</Text>
    </ButtonView>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};
Item.defaultProps = {
  containerStyle: [],
};

export default Item;

import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonView, Text } from '../../components';
import { Images } from '../../theme';
import styles from './styles';

const Item = props => {
  const { name, route, params, onPress } = props;
  const Container = onPress ? ButtonView : View;
  return (
    <Container
      style={styles.itemContainer}
      onPress={onPress ? () => onPress(route, params) : undefined}
    >
      <Text size="size_16">{name}</Text>
      <Image source={Images.icons.forwardArrow} />
    </Container>
  );
};
Item.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string,
  params: PropTypes.object,
  onPress: PropTypes.func,
};
Item.defaultProps = {
  name: 'PropTypes.string',
};
export default Item;

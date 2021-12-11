import React from 'react';
import { FlatList, Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonView, Text } from '../../components';
import { AppStyles, Images } from '../../theme';
import styles from './styles';

export const Item = ({ name, onPressItem, style }) => {
  const Container = onPressItem ? ButtonView : View;
  return (
    <Container
      style={[styles.itemContainer, style]}
      onPress={() => onPressItem?.(name)}
    >
      <Text size="size_16">{name}</Text>
      <Image source={Images.icons.forwardArrow} />
    </Container>
  );
};

const SimpleListing = props => {
  const { separatorStyle, onPressItem, data } = props;
  return (
    <FlatList
      style={AppStyles.flex}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Item {...{ onPressItem, ...item }} />}
      ItemSeparatorComponent={() => (
        <View style={StyleSheet.flatten([styles.separator, separatorStyle])} />
      )}
    />
  );
};
SimpleListing.propTypes = {
  data: PropTypes.array.isRequired,
  containerStyle: ViewPropTypes.style,
  separatorStyle: ViewPropTypes.style,
  onPressItem: PropTypes.func,
};
SimpleListing.defaultProps = {};
export default SimpleListing;

import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, ButtonView, ImageViewHttpRound } from '../../../components';
import { CategoriesUtil } from '../../../utils';
import styles from './styles';

const Item = props => {
  const { item, containerStyle, onPressItem } = props;

  return (
    <ButtonView
      style={[styles.gridContainer, containerStyle]}
      onPress={() => onPressItem(item)}
    >
      <ImageViewHttpRound url={CategoriesUtil.getCategoryImage(item)} />
      <Text numberOfLines={2} textAlign="center" style={styles.textGrid}>
        {CategoriesUtil.getCategoryName(item)}
      </Text>
    </ButtonView>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};
Item.defaultProps = {
  containerStyle: {},
};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

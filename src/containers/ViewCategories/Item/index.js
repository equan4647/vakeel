import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Text,
  ButtonView,
  Image,
  ImageViewHttpRound,
} from '../../../components';
import { CategoriesUtil } from '../../../utils';
import { Images } from '../../../theme';
import styles from './styles';

const Item = ({ item, _module, extraPropsClick }) => {
  return (
    <ButtonView
      style={styles.container}
      onPress={() => {
        CategoriesUtil.navigateCategoryItem(item, _module, extraPropsClick);
      }}
    >
      <ImageViewHttpRound
        url={CategoriesUtil.getCategoryImage(item)}
        size={40}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.text}>
          {CategoriesUtil.getCategoryName(item)}
        </Text>
        <Image source={Images.icons.arrowRight} />
      </View>
    </ButtonView>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  _module: PropTypes.string.isRequired,
  extraPropsClick: PropTypes.object.isRequired,
};
Item.defaultProps = {};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

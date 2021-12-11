import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ImageViewHttpRound, Loader, Text } from '../../components';
import { Metrics } from '../../theme';
import styles from './styles';
import { FoodUtil } from '../../DataUtils';
import { getFoodItemFromCart } from '../../ducks/foodCart/selectors';

const Detail = ({ data }) => (
  <View style={styles.detailContainer}>
    <Text>{FoodUtil.foodItemTitle(data)}</Text>

    <Text style={styles.priceTextStyle}>{FoodUtil.foodItemPrice(data)}</Text>

    <Text>{FoodUtil.foodItemQuantity(data)}x</Text>
  </View>
);

const FoodOrderSubItem = ({ data: _data, isData }) => {
  const orderItem = useSelector(getFoodItemFromCart(_data)),
    data = !isData ? orderItem : _data;

  return (
    <View style={styles.container}>
      <ImageViewHttpRound
        size={60}
        url={FoodUtil.getItemImage(data)}
        //style={styles.imageStyle}
        borderRadius={Metrics.ratio(12)}
        //placeholderStyle={styles.imgPlaceholderStyle}
      />

      <Detail {...{ data }} />

      <Loader type="ADD_REVIEW" />
    </View>
  );
};
FoodOrderSubItem.propTypes = {
  data: PropTypes.object,
  style: ViewPropTypes.style,
  isData: PropTypes.bool,
};

FoodOrderSubItem.defaultProps = {};

export default FoodOrderSubItem;

import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttp } from '../../../components';
import { FoodUtil } from '../../../DataUtils';
import { AppStyles, Images, Metrics } from '../../../theme';
import { QuantitySelector } from '../../../common';
import styles from './styles';
import { useFoodCartUtil } from '../../../utils/CustomHooks';
import { Util } from '../../../utils';
import { getFoodItemFromCart } from '../../../ducks/foodCart/selectors';
import { useSelector } from 'react-redux';

const Cross = ({ onPress }) => (
  <ButtonView {...{ onPress }} hitSlop={Metrics.hitSlop}>
    <Image source={Images.icons.crossGray} />
  </ButtonView>
);

const QuantityAndPrice = ({ data }) => {
  const { onIncrement, onDecrement } = useFoodCartUtil(Util.getID(data));

  return (
    <View style={styles.quantityPriceContainer}>
      <QuantitySelector
        {...{ onIncrement, onDecrement }}
        count={FoodUtil.foodItemQuantity(data)}
      />

      <Text style={styles.priceText}>{FoodUtil.foodItemPrice(data)}</Text>
    </View>
  );
};

const Title = React.memo(({ data }) => {
  const { onRemove } = useFoodCartUtil(Util.getID(data));

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.itemName}>{FoodUtil.foodItemTitle(data)}</Text>

      <Cross onPress={onRemove} />
    </View>
  );
});

const ItemImage = React.memo(({ data }) => (
  <ImageViewHttp
    url={FoodUtil.foodItemImage(data)}
    borderRadius={18}
    style={styles.image}
    placeholderStyle={styles.placehoderStyle}
  />
));

const Item = props => {
  const { id } = props;
  const data = useSelector(getFoodItemFromCart(id));

  return (
    <View style={styles.itemContainer}>
      <ItemImage {...{ data }} />

      <View style={AppStyles.flex1}>
        <Title {...{ data }} />

        <Text numberOfLines={1}>{FoodUtil.foodItemDescription(data)}</Text>

        <QuantityAndPrice {...{ data }} />
      </View>
    </View>
  );
};

Item.propTypes = { id: PropTypes.string.isRequired };

Item.defaultProps = { id: '' };

export default Item;

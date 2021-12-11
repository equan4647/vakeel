import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttpBackground } from '../../components';
import { useProductCartHandle } from '../../utils/CustomHooks';
import { BuyingCartUtil, OrderUtil, ProductUtil } from '../../DataUtils';
import { AppStyles, Images, Metrics } from '../../theme';
import { QuantitySelector } from '..';
import styles from './styles';

import { getProductCartItem } from '../../ducks/buyingCart/selectors';
import { getProductItem } from '../../ducks/products/selectors';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';

const Cross = ({ onPress }) => (
  <ButtonView {...{ onPress }} hitSlop={Metrics.hitSlop}>
    <Image source={Images.icons.crossGray} />
  </ButtonView>
);

const DisplayAttributes = React.memo(({ data }) => (
  <View style={styles.attributesContainer}>
    {OrderUtil.getAttributesByAttrId(data)?.map((attribute, i) => {
      return (
        <View style={AppStyles.rowAligned} key={i}>
          <Text>{attribute?.attribute_name ?? '_'}</Text>
          {/* <Text>{`${i === 0 ? '' : ','} ${
            attribute?.attribute_name ?? '_'
          }`}</Text> */}
          <Text type="bold" size="size_16" style={styles.titleText}>
            {attribute?.attribute_value ?? '_'}
          </Text>
        </View>
      );
    })}
  </View>
));

const QuantityAndPrice = ({ id, attrId, isAvailable }) => {
  const cartItem = useSelector(getProductCartItem(attrId));
  const { onIncrement, onDecrement, countInCart } = useProductCartHandle(
    id,
    attrId
  );

  const isDiscounted = ProductUtil.isDiscounted(cartItem.item_detail);

  return (
    <View style={styles.quantityPriceContainer}>
      {isAvailable ? (
        <QuantitySelector
          {...{ onIncrement, onDecrement, count: countInCart }}
        />
      ) : (
        <Text color="orangeRed">{strings('app.out_of_stock')}</Text>
      )}

      <Text type="bold" size="size_16" style={styles.priceText}>
        {isDiscounted
          ? BuyingCartUtil.getProductDiscountedPrice(cartItem)
          : BuyingCartUtil.getProductPrice(cartItem)}
      </Text>
    </View>
  );
};

const Title = React.memo(({ data, withCross = false, onRemove, attrId }) => {
  const onPress = () => {
    Util.showAlertConfirm(
      '',
      strings('app.remove_item_from_cart'),
      strings('app.delete'),
      () => onRemove(attrId)
    );
  };

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.itemName}>{ProductUtil.getProductTitle(data)}</Text>

      {withCross ? <Cross {...{ onPress }} /> : null}
    </View>
  );
});

const ItemImage = React.memo(
  ({ data, isSelected, withCross, attrId, onPress, isAvailable }) => {
    return (
      <ImageViewHttpBackground
        url={ProductUtil.getProductImageByAttr(data, attrId)}
        width={90}
        height={96}
        borderRadius={18}
        containerStyle={styles.image}
      >
        {withCross || !isAvailable ? null : (
          <ButtonView onPress={() => onPress(attrId)} hitSlop={Metrics.hitSlop}>
            <Image
              style={styles.unselectedImage}
              source={
                isSelected
                  ? Images.icons.selectedImage
                  : Images.icons.unselectedImage
              }
            />
          </ButtonView>
        )}
      </ImageViewHttpBackground>
    );
  }
);

const Item = props => {
  const { onPress, isSelected, itemData, onRemove } = props;
  const Container = onPress ? ButtonView : View;

  const productId = BuyingCartUtil.getProductId(itemData);
  const attrId = BuyingCartUtil.getAttrId(itemData);
  const isAvailable = BuyingCartUtil.isAvailable(itemData);

  const data = useSelector(getProductItem(productId));
  const onPressItem = () =>
    NavigationService.push('ViewBuyingProduct', {
      item: productId,
      selectedAttr: attrId,
    });

  return (
    <Container style={styles.itemContainer} onPress={onPressItem}>
      <ItemImage {...{ data, isSelected, attrId, onPress, isAvailable }} />

      <View style={AppStyles.flex1}>
        <Title {...{ data, onRemove, attrId }} withCross={!isAvailable} />

        <DisplayAttributes data={itemData} />

        <QuantityAndPrice {...{ attrId, isAvailable }} id={productId} />
      </View>
    </Container>
  );
};

Item.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  price: PropTypes.number,
  productID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  onRemove: PropTypes.func,
  isSelected: PropTypes.bool,
  withCross: PropTypes.bool,
};

Item.defaultProps = {
  name: '',
  quantity: 1,
  isSelected: false,
  withCross: false,
};

export default Item;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, View } from 'react-native';

import {
  AppButton,
  BottomButtonContainer,
  CartFooter,
  EmptyView,
  MyCartItem,
} from '../../common';
import { BuyingCartUtil, OrderUtil, ProductUtil } from '../../DataUtils';
import { ButtonView, Loader, ScrollViewApi, Text } from '../../components';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

import {
  requestDeleteFromBuyingCart,
  requestFreshBuyingCart,
  resetCart,
} from '../../ducks/buyingCart/actions';
import { getMyCart, getProductCart } from '../../ducks/buyingCart/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { requestCheckout } from '../../ducks/orders/actions';
import { AppStyles, Images, Metrics } from '../../theme';
import _ from 'lodash';

const SelectAll = ({ isSelected, onSelect }) => (
  <ButtonView
    style={AppStyles.rowAligned}
    onPress={onSelect}
    hitSlop={Metrics.hitSlop2}
  >
    <Text style={styles.selectAllText}>{strings('app.all')}</Text>

    <Image
      source={
        isSelected
          ? Images.images.selectedBordered
          : Images.images.unSelectedBordered
      }
      style={styles.selectAllImg}
    />
  </ButtonView>
);

const MyCart = ({ navigation }) => {
  const [selectedData, setSelectedData] = useState([]);
  const dispatch = useDispatch();

  const checkout = () =>
    dispatch(requestCheckout({ selected_item_ids: selectedData.toString() }));

  const requestDelete = () => {
    setSelectedData([]);
    dispatch(
      requestDeleteFromBuyingCart({
        product_attribute_ids: selectedData.toString(),
      })
    );
  };

  const onPressDelete = () => {
    Util.showAlertConfirm(
      strings('messages.buying_cart_remove_title'),
      '',
      strings('app.yes'),
      requestDelete
    );
  };

  NavigationService.setCrossBackHeader(navigation, '');
  NavigationService.setRightHeader(
    navigation,
    strings('app.my_cart'),
    strings('app.deleteCaps'),
    onPressDelete,
    { disabled: !selectedData.length },
    [selectedData]
  );

  const onPressItem = productID => {
    if (selectedData.includes(productID)) {
      setSelectedData(data => data.filter(item => item !== productID));
    } else {
      setSelectedData(data => [...data, productID]);
    }
  };

  const CartData = useSelector(getMyCart);
  const cartList = useSelector(getProductCart);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('GET_BUYING_CART')
  );

  const CalculateTotal = useCallback(() => {
    const selected_items = cartList.filter(item =>
      selectedData.includes(BuyingCartUtil.getAttrId(item))
    );

    const totalPrice = selected_items.reduce((acc, item) => {
      const isDiscounted = ProductUtil.isDiscounted(item.item_detail);
      const price = isDiscounted
        ? BuyingCartUtil.getProductDiscountedPrice(item, false)
        : BuyingCartUtil.getProductPrice(item, false);
      console.log('isDiscounted', isDiscounted);
      return acc + price * BuyingCartUtil.getQuantity(item);
    }, 0);

    return totalPrice ?? 0;
  }, [selectedData, cartList]);

  useEffect(() => () => dispatch(resetCart()), [dispatch]);

  const toggleSelectAll = () => {
    const attrIDs = cartList
      .filter(item => BuyingCartUtil.isAvailable(item))
      .map(cartItem => OrderUtil.getAttrId(cartItem));

    if (attrIDs.length === selectedData.length) {
      setSelectedData([]);
    } else {
      setSelectedData(attrIDs);
    }
  };

  const toggleSelectStore = id => {
    const attrIDs = cartList
      .filter(
        item =>
          BuyingCartUtil.isAvailable(item) &&
          id === BuyingCartUtil.getStoreId(item)
      )
      .map(cartItem => OrderUtil.getAttrId(cartItem));

    const selected = attrIDs.map(i => selectedData.includes(i));

    let isIncluded = selected.every(v => v === true);

    if (isIncluded) {
      const newSelectedData = [...selectedData];
      attrIDs.map(i => {
        const index = newSelectedData.indexOf(i);
        newSelectedData.splice(index, 1);
      });
      setSelectedData(newSelectedData);
    } else {
      setSelectedData(prev => {
        return _.uniq([...prev, ...attrIDs]);
      });
    }
  };

  const data = ProductUtil.getCartSortedByVendorName(cartList);

  return (
    <>
      <ScrollViewApi
        {...{ requestFlags }}
        data={CartData}
        requestAction={requestFreshBuyingCart}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        content={() =>
          data.length ? (
            data.map((item, i) => (
              <MyCartItem
                data={item}
                key={i}
                {...{ onPressItem, selectedData }}
                onSelectStore={toggleSelectStore}
              />
            ))
          ) : (
            <EmptyView
              withoutArrow
              image="cart"
              text={strings('app.mycart_empty_text')}
              containerStyle={styles.emptyContainerStyle}
            />
          )
        }
      />

      <BottomButtonContainer style={styles.bottomContainer}>
        <View>
          <SelectAll
            onSelect={toggleSelectAll}
            isSelected={
              selectedData.length > 0 &&
              selectedData.length ===
                cartList?.filter(item => BuyingCartUtil.isAvailable(item))
                  ?.length
            }
          />
          <CartFooter total={CalculateTotal()} />
        </View>

        <AppButton
          title={strings('app.checkout')}
          onPress={checkout}
          disabled={!selectedData.length}
          container={styles.checkoutButton}
        />
      </BottomButtonContainer>

      <Loader type={['CHECKOUT', 'DELETE_FROM_BUYING_CART']} />
    </>
  );
};
export default MyCart;

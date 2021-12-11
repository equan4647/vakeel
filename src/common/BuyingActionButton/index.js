import React from 'react';
import { useSelector } from 'react-redux';

import { ActionButton } from '..';
import { getProductCart } from '../../ducks/buyingCart/selectors';
import { AppUtil, NavigationService } from '../../utils';
import { ViewPropTypes } from 'react-native';

const BuyingActionButton = ({ containerStyle }) => {
  const buyingCart = useSelector(getProductCart);

  const badgeCount = buyingCart.reduce(
    (acc, value) => acc + Number(value?.quantity),
    0
  );

  const onPress = () =>
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('MyCart', {}, 'BuyingCartStack')
    );

  return <ActionButton {...{ badgeCount, containerStyle, onPress }} />;
};

BuyingActionButton.propTypes = {
  containerStyle: ViewPropTypes.style,
};

BuyingActionButton.defaultProps = {};

export default BuyingActionButton;

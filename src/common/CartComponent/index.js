import React from 'react';
import { Image, View } from 'react-native';

import { Images } from '../../theme';
import styles from './styles';
import { Text, ButtonView } from '../../components';
import { useProductCartHandle } from '../../utils/CustomHooks';

const CartComponent = ({ id }) => {
  const [onIncrement, onDecrement, quantity] = useProductCartHandle(id);

  return quantity === 0 ? (
    <ButtonView onPress={onIncrement} style={styles.circle}>
      <Image source={Images.icons.cartBorder} />
    </ButtonView>
  ) : (
    <View style={styles.counterContainer}>
      <ButtonView onPress={onDecrement} style={styles.derement}>
        <Image source={Images.icons.subtract} />
      </ButtonView>

      <View style={styles.countContainer}>
        <Text style={styles.count}>{quantity}</Text>
      </View>

      <ButtonView onPress={onIncrement} style={styles.increment}>
        <Image source={Images.icons.addition} />
      </ButtonView>
    </View>
  );
};

export default CartComponent;

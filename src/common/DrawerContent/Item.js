import React from 'react';
import { Image, View } from 'react-native';

import { ButtonView, Text } from '../../components';
import { AppStyles } from '../../theme';
import { Util } from '../../utils';
import Badge from '../Badge';
import styles from './styles';

const ListItem = ({
  name,
  image,
  onPress,
  route,
  params,
  stack,
  textStyle,
  badge,
}) => (
  <ButtonView
    style={[AppStyles.rowAligned, styles.itemSeparator]}
    onPress={
      onPress ? onPress : () => Util.navigateFromDrawer(route, params, stack)
    }
  >
    {image && (
      <View style={styles.listImageContainer}>
        <Image source={image} />
      </View>
    )}

    <View style={styles.badgeContainer}>
      <Text style={[styles.imageItemText, textStyle]}>{name}</Text>

      <Badge count={badge} />
    </View>
  </ButtonView>
);

export default ListItem;

import React from 'react';
import { Image, View } from 'react-native';
import { SearchInput } from '../../../common';
import { ButtonView, Text } from '../../../components';
import { Images, Metrics } from '../../../theme';

import styles from '../styles';

export const Item = React.memo(({ _data, selected, onPress }) => (
  <ButtonView style={styles.itemContainer} onPress={() => onPress(_data)}>
    <Text lineHeight={Metrics.ratio(16)} size="size_17">
      {_data?.name}
    </Text>
    {selected ? <Image source={Images.icons.selected} /> : null}
  </ButtonView>
));

export const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text type="semiBold" size="size_22">
      {title}
    </Text>
    <SearchInput style={styles.search} />
  </View>
);

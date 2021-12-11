import React from 'react';
import { Image, View } from 'react-native';

import { ButtonView, Text } from '../../../components';
import { NavigationService } from '../../../utils';
import { FavoriteButton } from '../../../common';
import { Images } from '../../../theme';
import styles from './styles';

const BottomBar = React.memo(({ location, date }) => (
  <View style={styles.bottomBar}>
    <Image source={Images.icons.location} style={styles.locationImg} />
    <Text style={styles.location} size="size_12">
      {location}
    </Text>
    <Text size="size_12">{date}</Text>
  </View>
));

const TitleAndPrice = React.memo(({ title, price }) => (
  <View>
    <Text style={styles.titleStyle} numberOfLines={2}>
      {title}
    </Text>
    <Text style={styles.priceStyleList}>{`$${price}`}</Text>
  </View>
));

const Item = props => {
  const { favorite = false, img } = props;

  return (
    <ButtonView
      style={styles.listContainer}
      onPress={() => NavigationService.push('ViewProduct')}
    >
      <Image source={img} style={styles.imgSmall} resizeMode="cover" />

      <View style={styles.contentStyle}>
        <View style={styles.titleRow}>
          <TitleAndPrice {...props} />

          <FavoriteButton {...{ favorite }} />
        </View>

        <BottomBar {...props} />
      </View>
    </ButtonView>
  );
};

export default React.memo(Item);

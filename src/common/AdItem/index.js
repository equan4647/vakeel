import React from 'react';
import { Image, View } from 'react-native';
import { FavoriteButton } from '..';
import { ButtonView, Text } from '../../components';
import { AppStyles, Images } from '../../theme';
import { NavigationService } from '../../utils';
import styles from './styles';

const BottomBar = React.memo(({ location, date, list }) => (
  <View style={styles.bottomBar}>
    <Image source={Images.icons.location} style={styles.locationImg} />
    <Text style={styles.location} size="size_12">
      {location}
    </Text>
    {list ? <Text size="size_12">{date}</Text> : null}
  </View>
));

const TitleAndPrice = React.memo(({ list, title, price }) => (
  <View>
    <Text style={styles.titleStyle} numberOfLines={list ? 2 : 1}>
      {title}
    </Text>
    <Text style={list ? styles.priceStyleList : styles.priceStyle}>
      {`$${price}`}
    </Text>
  </View>
));

const AdsItem = props => {
  const { list = false, favorite = false, img } = props;
  const containerStyle = list ? styles.listContainer : styles.gridContainer;
  const contentStyle = list ? styles.contentStyle : AppStyles.flex;

  return (
    <ButtonView
      style={containerStyle}
      onPress={() => NavigationService.push('ViewProduct')}
    >
      {!list ? (
        <FavoriteButton {...{ favorite }} style={styles.absFav} circle />
      ) : null}

      <Image
        source={img}
        style={list ? styles.imgSmall : styles.imgLarge}
        resizeMode="cover"
      />

      <View style={contentStyle}>
        <View style={styles.titleRow}>
          <TitleAndPrice {...props} />

          {list ? <FavoriteButton {...{ favorite }} /> : null}
        </View>

        <BottomBar {...props} />
      </View>
    </ButtonView>
  );
};

export default React.memo(AdsItem);

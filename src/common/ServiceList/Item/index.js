import React from 'react';
import { Image, View } from 'react-native';

import { FavoriteButton, StarRating } from '../../../common';
import { RATING_TYPE } from '../../../config/Constants';
import { ButtonView, ImageViewHttpBackground, Text } from '../../../components';
import { AppUtil, NavigationService, Util } from '../../../utils';
import styles from './styles';
import { ServicesUtil } from '../../../DataUtils';
import { useSelector } from 'react-redux';
import { servicesSelectors } from '../../../ducks/services';
import { Metrics } from '../../../theme';

const TitleAndPrice = React.memo(item => (
  <View style={{ flex: 1, marginRight: 16 }}>
    <Text style={styles.typeStyle} numberOfLines={1}>
      {ServicesUtil.category(item)}
    </Text>
    <Text style={styles.titleStyle} numberOfLines={1}>
      {ServicesUtil.title(item)}
    </Text>
    <Text style={styles.priceStyleList}>
      {AppUtil.formatPrice(ServicesUtil.price(item))}
    </Text>
  </View>
));

const Item = props => {
  const { item } = props;

  const onPressFavorite = isFavourite =>
    Util.addServiceToFavorites(item, isFavourite);

  const serviceItem = useSelector(servicesSelectors.getServicesItem(item));

  return (
    <ButtonView
      style={styles.listContainer}
      onPress={() =>
        NavigationService.push('ViewService', { service_id: item })
      }
    >
      <ImageViewHttpBackground
        url={ServicesUtil.coverImage(serviceItem)}
        width={Metrics.ratio(80)}
        height={Metrics.ratio(80)}
        containerStyle={{ marginTop: 2 }}
      />

      <View style={styles.contentStyle}>
        <View style={styles.titleRow}>
          <TitleAndPrice {...serviceItem} />

          <FavoriteButton
            favorite={ServicesUtil.isFavourite(serviceItem)}
            style={{ marginTop: 4 }}
            {...{ onPressFavorite }}
          />
        </View>

        <StarRating
          type={RATING_TYPE.RATING_WITH_COUNT}
          rating={ServicesUtil.rating(serviceItem)}
          count={ServicesUtil.ratingCount(serviceItem)}
        />
      </View>
    </ButtonView>
  );
};

export default React.memo(Item);

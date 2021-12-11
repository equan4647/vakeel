import React from 'react';
import PropTypes from 'prop-types';

import { FavoriteButton, StarRating } from '..';
import { ButtonView, ImageViewHttpBackground, Text } from '../../components';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import styles from './styles';
import { Metrics } from '../../theme';
import { AppUtil, NavigationService, Util } from '../../utils';
import { useSelector } from 'react-redux';
import { ServicesUtil } from '../../DataUtils';
import { servicesSelectors } from '../../ducks/services';

const ServiceItem = ({ item, size: _size }) => {
  const serviceItem = useSelector(servicesSelectors.getServicesItem(item));

  const size = { width: _size ?? Metrics.scale(150) };

  const onPressFavorite = isFavourite =>
    Util.addServiceToFavorites(item, isFavourite);

  const onPress = () =>
    NavigationService.push('ViewService', { service_id: item });

  return (
    <ButtonView
      debounceTime={700}
      style={[styles.container, size]}
      {...{ onPress }}
    >
      <ImageViewHttpBackground
        url={ServicesUtil.coverImage(serviceItem)}
        width={Metrics.classifiedImageWidthCarousel}
        height={Metrics.classifiedImageHeightCarousel}
      >
        <FavoriteButton
          favorite={ServicesUtil.isFavourite(serviceItem)}
          circle
          style={styles.favorite}
          {...{ onPressFavorite }}
        />
      </ImageViewHttpBackground>

      <Text
        size="size_14"
        type="bold"
        numberOfLines={1}
        style={{ marginTop: 10 }}
      >
        {ServicesUtil.category(serviceItem)}
      </Text>

      <Text size="size_16" numberOfLines={1} style={{ marginTop: 2 }}>
        {ServicesUtil.title(serviceItem)}
      </Text>

      <Text style={styles.price}>
        {AppUtil.formatPrice(ServicesUtil.price(serviceItem))}
      </Text>

      <StarRating
        type={RATING_TYPE.RATING_WITH_COUNT}
        size={STAR_SIZE.SMALL}
        rating={ServicesUtil.rating(serviceItem)}
        count={ServicesUtil.ratingCount(serviceItem)}
      />
    </ButtonView>
  );
};
ServiceItem.propTypes = {
  title: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
  rating: PropTypes.number,
  onItemPress: PropTypes.func,
};
ServiceItem.defaultProps = {
  title: '',
  favorite: false,
  rating: 0,
};
export default ServiceItem;

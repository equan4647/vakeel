import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { FavoriteButton, StarRating } from '..';
import { ButtonView, ImageViewHttpBackground, Text } from '../../components';
import { FOOD_COST_LEVEL_LIMIT, RATING_TYPE } from '../../config/Constants';
import { Metrics } from '../../theme';
import styles from './styles';
import { NavigationService } from '../../utils';
import { getRestaurantItem } from '../../ducks/restaurants/selectors';
import { FoodUtil } from '../../DataUtils';
import { useFavToggleRestaurant } from '../../utils/CustomHooks';
import ResturantTags from '../ResturantTags';

const Tags = React.memo(({ data, size }) => (
  <View style={[styles.tagsContainer, size]}>
    {_.range(FOOD_COST_LEVEL_LIMIT)?.map(num => (
      <Text size="size_14" key={num} color={FoodUtil.getDollarColor(data, num)}>
        $
      </Text>
    ))}

    <Text numberOfLines={1} style={{ maxWidth: size.width * 0.85 }}>
      {FoodUtil.cuisinesAssociated(data).map((item, i) => (
        <Text key={i} size="size_14">
          {` ● ${FoodUtil.getCuisineName(item)}`}
        </Text>
      ))}
    </Text>
  </View>
));

const EstimatedTime = ({ time }) =>
  time ? (
    <View style={styles.estimatedTime}>
      <Text type="semiBold">{time}</Text>
    </View>
  ) : null;

const FoodItem = ({ id, horizontal }) => {
  const size = { width: horizontal ? Metrics.scale(248) : Metrics.scale(335) },
    data = useSelector(getRestaurantItem(id)),
    onPressFavorite = useFavToggleRestaurant(data._id);

  return (
    <View style={size}>
      <ButtonView
        onPress={() =>
          NavigationService.navigate('ResturantDetail', { id: data._id })
        }
      >
        <ImageViewHttpBackground
          url={FoodUtil.getIcon(data)}
          height={Metrics.scaleVertical(161)}
          width={size.width}
          containerStyle={styles.imgContainer}
        >
          <FavoriteButton
            favorite={FoodUtil.isLiked(data)}
            style={styles.favorite}
            {...{ onPressFavorite }}
            circle
          />

          <EstimatedTime time={FoodUtil.estTime(data)} />
        </ImageViewHttpBackground>
      </ButtonView>

      <Text size="size_16">{FoodUtil.getRestaurantName(data)}</Text>

      {/* <Tags {...{ data, horizontal, size }} /> */}
      <ResturantTags {...{ data }} />

      <StarRating
        type={RATING_TYPE.RATING_WITH_COUNT}
        count={FoodUtil.ratingCount(data)}
        rating={FoodUtil.avgRating(data)}
      />
    </View>
  );
};

FoodItem.propTypes = {
  horizontal: PropTypes.bool,
  id: PropTypes.string.isRequired,
};
FoodItem.defaultProps = {
  horizontal: true,
};

export default FoodItem;

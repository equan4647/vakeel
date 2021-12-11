import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  FavoriteButton,
  ResturantTags,
  EstimatedTime,
  StarRating,
  ParallaxImage,
  ParallaxScrollViewWithTabs,
  FoodActionButton,
  Separator,
} from '../../common';
import { ButtonView, ScrollViewApi, Text } from '../../components';
import styles from './styles';
import { requestRestaurantDetail } from '../../ducks/restaurants/actions';
import { getRestaurantItem } from '../../ducks/restaurants/selectors';
import { API_GET_RESTAURANT_RATING } from '../../config/WebService';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { useFavToggleRestaurant } from '../../utils/CustomHooks';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import { NavigationService } from '../../utils';
import CategoryDetail from './CategoryDetail';
import { FoodUtil } from '../../DataUtils';

const ResturantDetail = ({ navigation, route }) => {
  const id = route.params?.id ?? '',
    data = useSelector(getRestaurantItem(id)),
    onPressFavorite = useFavToggleRestaurant(id),
    requestFlag = useSelector(getRequestFlag('RESTAURANTS_DETAIL')),
    { loading, failure } = requestFlag;

  // set navbar

  React.useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: loading === false && failure === false ? false : true,
    });
  }, [loading, failure, data, navigation]);

  // renderImage header
  const renderHeader = () => (
    <>
      <ParallaxImage url={FoodUtil.getIcon(data)} />
      <EstimatedTime
        style={styles.estimatedTime}
        time={FoodUtil.estTime(data)}
      />
    </>
  );

  // render scroll content
  const renderHeaderBottomContent = () => (
    <View style={styles.resturantInfo}>
      <Text type="semiBold" size="size_25">
        {FoodUtil.getRestaurantName(data)}
      </Text>

      <ResturantTags {...{ data }} />

      <ButtonView
        onPress={() =>
          NavigationService.navigate('RatingsAndReviews', {
            _id: id,
            ratingCount: FoodUtil.ratingCount(data),
            averageRating: FoodUtil.avgRating(data),
            url: API_GET_RESTAURANT_RATING,
            payload: { resturant_id: id },
          })
        }
      >
        <StarRating
          count={FoodUtil.ratingCount(data)}
          rating={FoodUtil.avgRating(data)}
          type={RATING_TYPE.RATING_WITH_COUNT}
          size={STAR_SIZE.MEDIUM}
        />
      </ButtonView>
    </View>
  );

  // render scroll content
  const renderTabItem = item => <CategoryDetail data={item} />;

  // render right
  const headerRight = () => (
    <FavoriteButton
      circle
      favorite={FoodUtil.isLiked(data)}
      {...{ onPressFavorite }}
    />
  );

  const footerView = () =>
    FoodUtil.mapCuisines(data)?.length > 0 ? (
      <Separator style={styles.footer} />
    ) : null;

  const renderContent = () => {
    /*
    if (loading && Util.isNotEmpty(data.detail)) {
      return <LoaderViewApi />;
    }
    */
    return (
      <ParallaxScrollViewWithTabs
        data={FoodUtil.mapCuisines(data)}
        footerView={() =>
          data?.length > 0 ? <Separator style={styles.footer} /> : null
        }
        labelKey="name"
        {...{
          renderHeaderBottomContent,
          footerView,
          renderTabItem,
          renderHeader,
          headerRight,
        }}
      />
    );
  };

  return [
    <ScrollViewApi
      requestAction={requestRestaurantDetail}
      requestFlags={requestFlag}
      data={data.detail ?? null}
      payload={{ resturant_id: id }}
      content={renderContent}
      isContentOnly
      style={styles.main}
    />,

    <FoodActionButton containerStyle={styles.actionButton} />,
  ];
};

export default ResturantDetail;

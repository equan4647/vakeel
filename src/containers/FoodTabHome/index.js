import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  EmptyView,
  FoodCarousel,
  HorizontalTitle,
  SearchInput,
} from '../../common';
import { IDENTIFIERS, MODULE } from '../../config/Constants';
import { AppStyles } from '../../theme';
import { AppUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { FoodOrderProgress, useMyStyles } from './Components';
import { ScrollViewApi } from '../../components';

import { getLastLocation } from '../../ducks/location/selectors';
import { getRadius } from '../../ducks/radius/selectors';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { requestFoodHome } from '../../ducks/home/actions';
import { homeSelectors } from '../../ducks/home';
import { requestCurrentFoodOrder } from '../../ducks/foodCart/actions';
import { useUserRole } from '../../utils/CustomHooks';

const FoodTabHome = ({ navigation }) => {
  // header
  NavigationService.setTabHeader(navigation, MODULE.FOOD);
  const myStyles = useMyStyles(),
    lastLocation = useSelector(getLastLocation(MODULE.FOOD)),
    radius = useSelector(getRadius(MODULE.FOOD)),
    requestFlag = useSelector(getRequestFlag('GET_HOME_FOOD')),
    homeData = useSelector(homeSelectors.getFoodHome),
    isGuest = useUserRole();

  const onSearchItemSelected = item => {
    NavigationService.navigate('SearchedFood', { searchItem: item });
  };

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (!isGuest) {
        dispatch(requestCurrentFoodOrder);
      }
    }, [isGuest]),
    [dispatch]
  );

  const renderContent = () => {
    const reducer = 'restaurants';
    const top_rated_products = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.TOP_RATED_RESTAURANTS_HOME
    );

    const all_restaurants = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.ALL_RESTAURANTS_HOME
    );

    const isEmpty = top_rated_products && all_restaurants;

    return isEmpty ? (
      <EmptyView
        image="food"
        arrowTowards="left"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.food_empty_text')}
      />
    ) : (
      <>
        <SearchInput
          style={styles.searchInput}
          onPress={() =>
            NavigationService.navigate('SearchScreen', {
              _module: MODULE.FOOD,
              onItemSelected: onSearchItemSelected,
            })
          }
        />
        {!top_rated_products && (
          <>
            <HorizontalTitle
              title={strings('app.top_rated_products_Caps')}
              leftTextStyle={AppStyles.subHeadLeftText}
              rightTitle={strings('app.see_all')}
              containerStyle={styles.headingContainer}
              onPress={() =>
                NavigationService.navigate('SeeAllFood', {
                  title: strings('app.top_rated_products'),
                  payload: { top_rated: 1 },
                  hideSorting: true,
                  identifier: IDENTIFIERS.TOP_RATED_RESTAURANTS,
                })
              }
            />

            <FoodCarousel
              contentContainerStyle={styles.listContainer}
              identifier={IDENTIFIERS.TOP_RATED_RESTAURANTS_HOME}
            />
          </>
        )}
        {!all_restaurants && (
          <>
            <HorizontalTitle
              title={strings('app.all_restaurants_Caps')}
              leftTextStyle={AppStyles.subHeadLeftText}
              rightTitle={strings('app.see_all')}
              containerStyle={styles.headingContainer}
              onPress={() =>
                NavigationService.navigate('SeeAllFood', {
                  title: strings('app.all_restaurants'),
                  identifier: IDENTIFIERS.ALL_RESTAURANTS,
                })
              }
            />

            <FoodCarousel
              style={styles.bottom}
              contentContainerStyle={styles.listContainer}
              identifier={IDENTIFIERS.ALL_RESTAURANTS_HOME}
            />
          </>
        )}
      </>
    );
  };

  return [
    <>
      {_.isEmpty(lastLocation) ? (
        <View style={AppStyles.flex}>
          <EmptyView
            text={strings('app.empty_text_view_buying')}
            arrowTowards="left"
          />
        </View>
      ) : (
        <ScrollViewApi
          requestFlags={requestFlag}
          requestAction={requestFoodHome}
          data={homeData}
          showsVerticalScrollIndicator={false}
          style={AppStyles.flex}
          payload={{ lat: lastLocation?.lat, long: lastLocation?.lng, radius }}
          contentContainerStyle={myStyles.container}
          content={renderContent}
        />
      )}
    </>,

    <FoodOrderProgress />,
  ];
};

export default FoodTabHome;

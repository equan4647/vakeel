import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import React, { useEffect } from 'react';
import _ from 'lodash';

import {
  BuyingCarousel,
  SearchInput,
  GridCategoriesApi,
  EmptyView,
  BuyingActionButton,
  Advertise,
} from '../../common';
import { ADS_CATEGORIES, IDENTIFIERS, MODULE } from '../../config/Constants';
import { Loader, ScrollViewApi } from '../../components';
import { AppUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

import { requestFreshBuyingCart } from '../../ducks/buyingCart/actions';
import { getLastLocation } from '../../ducks/location/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { homeActions, homeSelectors } from '../../ducks/home';
import { getRadius } from '../../ducks/radius/selectors';
import { useUserRole } from '../../utils/CustomHooks';

const BuyingTabHome = ({ navigation }) => {
  // header
  NavigationService.setTabHeader(navigation, MODULE.BUYING);
  const dispatch = useDispatch();

  const isGuest = useUserRole(),
    homeData = useSelector(homeSelectors.getMarketPlaceHome),
    radius = useSelector(getRadius(MODULE.BUYING)),
    lastLocation = useSelector(getLastLocation(MODULE.BUYING)),
    requestFlags = useSelector(
      requestFlagSelectors.getRequestFlag('GET_HOME_MARKETPLACE')
    );

  useEffect(() => {
    if (!isGuest) {
      dispatch(requestFreshBuyingCart());
    }
  }, [dispatch, isGuest]);

  const onSearchItemSelected = item => {
    NavigationService.navigate('SearchedBuyingItems', { searchItem: item });
  };

  const renderContent = () => {
    const reducer = 'products';
    const popular_products = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.POPULAR_PRODUCTS_HOME
    );

    const top_rated_products = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.TOP_RATED_PRODUCTS_HOME
    );

    const isEmpty = popular_products && top_rated_products;

    return isEmpty ? (
      <EmptyView
        image="buying"
        arrowTowards="left"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.buying_empty_text')}
      />
    ) : (
      <>
        <SearchInput
          style={styles.searchInput}
          onPress={() =>
            NavigationService.navigate('SearchScreen', {
              _module: MODULE.BUYING,
              onItemSelected: onSearchItemSelected,
            })
          }
        />

        <GridCategoriesApi
          identifier={IDENTIFIERS.POPULAR_CATEGORIES_MARKETPLACE_HOME}
          onPressItem={item => {
            NavigationService.navigate('SearchedBuyingCats', { item });
          }}
          headerTitle={strings('app.popular_categories')}
          rightPress={() => {
            NavigationService.navigate('ViewCategories', {
              _module: MODULE.BUYING,
            });
          }}
        />

        {!popular_products && (
          <BuyingCarousel
            identifier={IDENTIFIERS.POPULAR_PRODUCTS_HOME}
            headerTitle={strings('app.popular_products_Caps')}
            rightPress={() => {
              NavigationService.navigate('SeeAllBuyingProducts', {
                title: strings('app.popular_products'),
                identifier: IDENTIFIERS.POPULAR_PRODUCTS_MARKETPLACE,
                payload: { popular: 1 },
              });
            }}
          />
        )}
        <Advertise
          module={ADS_CATEGORIES.PRODUCT}
          location={lastLocation}
          radius={radius}
          style={styles.searchInput}
        />

        {!top_rated_products && (
          <BuyingCarousel
            identifier={IDENTIFIERS.TOP_RATED_PRODUCTS_HOME}
            headerTitle={strings('app.top_rated_products_Caps')}
            rightPress={() => {
              NavigationService.navigate('SeeAllBuyingProducts', {
                title: strings('app.top_rated_products'),
                identifier: IDENTIFIERS.TOP_RATED_PRODUCTS_MARKETPLACE,
                payload: { rating_sort: 'DESC' },
                hideSorting: true,
              });
            }}
          />
        )}
      </>
    );
  };

  return (
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
          data={homeData}
          requestAction={homeActions.requestMarketPlaceHome}
          contentContainerStyle={styles.contentContainerStyle}
          requestFlags={requestFlags}
          payload={{ lat: lastLocation.lat, long: lastLocation.lng, radius }}
          content={renderContent}
        />
      )}

      <BuyingActionButton />

      <Loader type="ADD_TO_BUYING_CART" />
    </>
  );
};

export default BuyingTabHome;

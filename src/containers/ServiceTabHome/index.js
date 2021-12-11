import React from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import {
  SearchInput,
  ServiceCarousel,
  EmptyView,
  GridCategoriesApi,
  Advertise,
} from '../../common';
import { IDENTIFIERS, MODULE } from '../../config/Constants';

import { serviceData } from '../../data/serviceData';
import { AppUtil, CategoriesUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getLastLocation } from '../../ducks/location/selectors';
import { getRadius } from '../../ducks/radius/selectors';
import { homeActions, homeSelectors } from '../../ducks/home';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { ScrollViewApi } from '../../components';

const ServiceTabHome = ({ navigation }) => {
  // header
  NavigationService.setTabHeader(navigation, MODULE.SERVICE);

  const lastLocation = useSelector(getLastLocation(MODULE.SERVICE));
  const radius = useSelector(getRadius(MODULE.SERVICE));

  const servicesData = useSelector(homeSelectors.getServicesHome);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('GET_HOME_SERVICES')
  );

  const onSearchItemSelected = item => {
    NavigationService.navigate('SearchedServiceItems', {
      item,
    });
  };

  const renderContent = () => {
    const reducer = 'services';
    const recently_added_services = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.RECENTLY_ADDED_SERVICES_HOME
    );

    const most_booked_services = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.MOST_BOOKED_SERVICES_HOME
    );

    const isEmpty = recently_added_services && most_booked_services;

    return isEmpty ? (
      <EmptyView
        image="servicePending"
        arrowTowards="left"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.services_empty_text')}
      />
    ) : (
      <>
        <SearchInput
          style={styles.searchInput}
          onPress={() =>
            NavigationService.navigate('SearchScreen', {
              _module: MODULE.SERVICE,
              onItemSelected: onSearchItemSelected,
            })
          }
        />

        <GridCategoriesApi
          identifier={IDENTIFIERS.POPULAR_CATEGORIES_SERVICES_HOME}
          onPressItem={item => {
            CategoriesUtil.navigateCategoryItem(item, MODULE.SERVICE);
          }}
          headerTitle={strings('app.popular_categories')}
          rightPress={() => {
            NavigationService.navigate('ViewCategories', {
              _module: MODULE.SERVICE,
            });
          }}
        />

        {!recently_added_services && (
          <ServiceCarousel
            identifier={IDENTIFIERS.RECENTLY_ADDED_SERVICES_HOME}
            headerTitle={strings('app.recently_added_services_Caps')}
            rightTitle={strings('app.see_all')}
            rightPress={() =>
              NavigationService.navigate('SeeAllServices', {
                title: strings('app.recently_added_services'),
                identifier: IDENTIFIERS.RECENTLY_ADDED_SERVICES_LIST,
                payload: {},
                // hideSorting: true,
              })
            }
            // data={serviceData}
            contentContainerStyle={styles.listContainer}
            style={styles.adsList}
          />
        )}

        <Advertise
          location={lastLocation}
          radius={radius}
          style={styles.searchInput}
        />

        {!most_booked_services && (
          <ServiceCarousel
            identifier={IDENTIFIERS.MOST_BOOKED_SERVICES_HOME}
            headerTitle={strings('app.most_booked_Caps')}
            data={serviceData}
            contentContainerStyle={styles.listContainer}
            style={[styles.adsList, styles.bottom]}
            rightTitle={strings('app.see_all')}
            rightPress={() =>
              NavigationService.navigate('SeeAllServices', {
                title: strings('app.most_booked_services'),
                identifier: IDENTIFIERS.MOST_BOOKED_SERVICES_LIST,
                payload: { this_month: true },
                // hideSorting: true,
              })
            }
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
          data={servicesData}
          requestAction={homeActions.requestServicesHome}
          requestFlags={requestFlags}
          content={renderContent}
          // contentContainerStyle={styles.contentContainerStyle}
          payload={{
            lat: lastLocation.lat,
            long: lastLocation.lng,
            // location: `${lastLocation.lat},${lastLocation.lng}`,
            //radius: 100000,
            radius,
          }}
        />
      )}
    </>
  );
};

export default ServiceTabHome;

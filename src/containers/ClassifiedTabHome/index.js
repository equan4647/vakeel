import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';
import _ from 'lodash';

import {
  ActionButton,
  AdsCarousel,
  SearchInput,
  GridCategoriesApi,
  EmptyView,
  Advertise,
} from '../../common';
import {
  NavigationService,
  CategoriesUtil,
  DataHandler,
  AppUtil,
} from '../../utils';
import { IDENTIFIERS } from '../../config/Constants';
import { MODULE } from '../../config/Constants';
import { ScrollViewApi } from '../../components';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

import { getLastLocation } from '../../ducks/location/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { homeActions, homeSelectors } from '../../ducks/home';
import { getRadius } from '../../ducks/radius/selectors';

const ClassifiedTabHome = ({ navigation }) => {
  // header
  NavigationService.setTabHeader(navigation, MODULE.CLASSIFIED);

  // dispatch const
  //const dispatch = useDispatch();

  // get radius and location
  const lastLocation = useSelector(getLastLocation(MODULE.CLASSIFIED));
  const radius = useSelector(getRadius(MODULE.CLASSIFIED));
  const payloadRequest = {
    location: `${lastLocation.lat},${lastLocation.lng}`,
    radius,
  };

  // get home data
  const homeData = useSelector(homeSelectors.getClassifiedHome);
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('GET_HOME_CLASSIFIED')
  );

  const onSearchItemSelected = item => {
    NavigationService.navigate('SearchedClassified', {
      item,
    });
  };

  const onPressActionButton = () =>
    AppUtil.doIfAuthorized(() => {
      DataHandler.resetClassifiedAdInfo({});
      NavigationService.navigate('ClassifiedAddStack');
    });

  const renderContent = () => {
    const reducer = MODULE.CLASSIFIED;
    const recently_added_ads = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.RECENTLY_ADDED_CLASSIFIED_HOME
    );

    const help_wanted = AppUtil.isReducerItemEmpty(
      reducer,
      IDENTIFIERS.HELP_WANTED_CLASSIFIED_HOME
    );

    const isEmpty = recently_added_ads && help_wanted;

    return isEmpty ? (
      <EmptyView
        image="classified"
        arrowTowards="left"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.classifieds_empty_text')}
      />
    ) : (
      <>
        <SearchInput
          style={styles.searchInput}
          onPress={() =>
            NavigationService.navigate('SearchScreen', {
              _module: MODULE.CLASSIFIED,
              onItemSelected: onSearchItemSelected,
            })
          }
        />

        <GridCategoriesApi
          identifier={IDENTIFIERS.POPULAR_CATEGORIES_CLASSIFIED_HOME}
          onPressItem={item => {
            CategoriesUtil.navigateCategoryItem(item, MODULE.CLASSIFIED);
          }}
          headerTitle={strings('app.popular_categories')}
          rightPress={() => {
            NavigationService.navigate('ViewCategories', {
              _module: MODULE.CLASSIFIED,
            });
          }}
        />

        {!recently_added_ads && (
          <AdsCarousel
            identifier={IDENTIFIERS.RECENTLY_ADDED_CLASSIFIED_HOME}
            headerTitle={strings('app.recently_added_ads_Caps')}
            rightPress={() => {
              NavigationService.navigate('SeeAllClassifieds', {
                title: strings('app.recently_added_ads'),
                identifier: IDENTIFIERS.RECENTLY_ADDED_CLASSIFIED_LIST,
                payload: { sort: { createdAt: '-1' } },
                hideSorting: true,
              });
            }}
          />
        )}

        <Advertise
          location={lastLocation}
          style={styles.searchInput}
          {...{ radius }}
        />

        {!help_wanted && (
          <AdsCarousel
            identifier={IDENTIFIERS.HELP_WANTED_CLASSIFIED_HOME}
            headerTitle={strings('app.help_wanted_Caps')}
            rightPress={() => {
              NavigationService.navigate('SeeAllClassifieds', {
                title: strings('app.help_wanted'),
                identifier: IDENTIFIERS.HELP_WANTED_CLASSIFIED_LIST,
                payload: { type: 'help_wanted' },
                //url: API_CLASSIFIED_HELP_WANTED_LIST,
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
          requestAction={homeActions.requestClassifiedHome}
          requestFlags={requestFlags}
          content={renderContent}
          contentContainerStyle={styles.contentContainerStyle}
          payload={payloadRequest}
        />
      )}

      <ActionButton type="add" onPress={onPressActionButton} />
    </>
  );
};

export default ClassifiedTabHome;

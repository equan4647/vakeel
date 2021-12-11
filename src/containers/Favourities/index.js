import { View } from 'react-native';
import React from 'react';

import {
  ScrollableTabView,
  AdsList,
  BuyingList,
  FoodList,
  ServiceList,
} from '../../common';
import { serviceData2 } from '../../data/serviceData';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { KeyboardSpacer } from '../../components';
import {
  API_GET_PRODUCT_WISHLIST,
  API_FAVOURITE_CLASSIFIED,
  API_FAVOURITE_SERVICES,
  API_GET_FAVORITE_RESTAURANT,
} from '../../config/WebService';
import { IDENTIFIERS } from '../../config/Constants';

const Favorites = ({ navigation }) => {
  NavigationService.setHeader(navigation, strings('app.favorites'));
  // const [searchText, setSearchText] = useState('');

  /*
  <AdsList {...{ payload, identifier, url, hideSorting, hideFilters }} />
  */

  return (
    <View style={AppStyles.flex}>
      <ScrollableTabView prerenderingSiblingsNumber={2}>
        <AdsList
          tabLabel={strings('app.classifieds')}
          payload={{ my_like: 1 }}
          hideFilters={true}
          url={API_FAVOURITE_CLASSIFIED}
          identifier={IDENTIFIERS.FAVOURITE_CLASSIFIED}
          addLocationRadius={false}
        />

        <BuyingList
          tabLabel={strings('app.buying')}
          identifier={IDENTIFIERS.FAVORITE_PRODUCTS}
          url={API_GET_PRODUCT_WISHLIST}
          hideFilters
        />

        <FoodList
          tabLabel={strings('app.food')}
          identifier={IDENTIFIERS.FAVORITE_RESTAURANTS}
          hideFilters
          url={API_GET_FAVORITE_RESTAURANT}
        />

        <ServiceList
          tabLabel={strings('app.services')}
          data={serviceData2}
          hideFilters={true}
          payload={{}}
          identifier={IDENTIFIERS.FAVOURITE_SERVICES}
          url={API_FAVOURITE_SERVICES}
        />
      </ScrollableTabView>
      <KeyboardSpacer />
    </View>
  );
};

export default Favorites;

/*

        <TopicsList
          tabLabel={strings('app.topics')}
          data={TopicsData.list.map(item => {
            return { ...item, favorite: true };
          })}
        />
        <ServiceList
          tabLabel={strings('app.services')}
          data={serviceData2.map(item => {
            return { ...item, favorite: true };
          })}
        />
*/

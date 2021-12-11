import React from 'react';
import { View } from 'react-native';

import { CATEGORY_SCREEN_PARAMS } from '../../config/Constants';
import { serviceData2 } from '../../data/serviceData';
import {
  SearchInput,
  FilterBar,
  ScrollableTabView,
  BuyingList,
} from '../../common';
import ServiceList from '../../common/ServiceList';
import { CategoriesUtil, NavigationService } from '../../utils';
import { AppStyles } from '../../theme';
import styles from './styles';
import {
  API_MARKETPLACE_PRODUCT_LIST_CATEGORIES,
  API_SERVICES_LIST_CATEGORIES,
} from '../../config/WebService';

const SearchedServiceCats = ({ navigation, route }) => {
  // get item
  const category = route.params?.item ?? {};
  console.log('category', category);

  // set title
  NavigationService.setTitle(
    navigation,
    CategoriesUtil.getCategoryName(category)
  );

  const onFilterPress = () => {
    NavigationService.navigate('FilterService');
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput
        style={styles.search}
        value={category.title}
        onPress={() =>
          NavigationService.navigate(
            'SearchScreen',
            CATEGORY_SCREEN_PARAMS.SEARCH_SERVICE
          )
        }
      />
      <ServiceList
        data={serviceData2}
        payload={{ category_id: category._id }}
        identifier={`${category._id}`}
        url={API_SERVICES_LIST_CATEGORIES}
      />
    </View>
  );
};

export default SearchedServiceCats;
/* <BuyingList
        tabLabel={CategoriesUtil.getCategoryName(item)}
        key={item._id}
        payload={{ parent_id: category._id, child_id: item._id }}
        identifier={`${category._id}_${item._id}`}
        url={API_MARKETPLACE_PRODUCT_LIST_CATEGORIES}
      /> */

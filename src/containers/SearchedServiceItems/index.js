import { View } from 'react-native';
import React, { useState } from 'react';

import { SearchInput, FilterBar, ServiceList } from '../../common';
import {
  CATEGORY_SCREEN_PARAMS,
  IDENTIFIERS,
  MODULE,
} from '../../config/Constants';
import { serviceData2 } from '../../data/serviceData';
import { NavigationService } from '../../utils';
import { AppStyles } from '../../theme';
import { API_SERVICES_LIST_CATEGORIES } from '../../config/WebService';

const SearchedServiceItems = ({ navigation, route }) => {
  NavigationService.hideHeader(navigation);

  // set search item
  console.log('route', route);
  const searchItem = route?.params?.item ?? {};
  const [searchObj, setSearchObj] = useState(searchItem);
  const tags = searchObj?.title ?? '';
  const payload = { tags };

  // set search value
  const searchValue = `${tags}`;

  const onSearchItemSelected = item => {
    setSearchObj(item);
  };

  const search = () => {
    NavigationService.navigate('SearchScreen', {
      _module: MODULE.SERVICE,
      onItemSelected: onSearchItemSelected,
    });
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput isHeader value={searchValue} onPress={search} />

      {/* <FilterBar onPress={onFilterPress} results={10} filters={1} /> */}

      <ServiceList
        payload={payload}
        identifier={IDENTIFIERS.SEARCHED_PRODUCTS}
        url={API_SERVICES_LIST_CATEGORIES}
      />
    </View>
  );
};

export default SearchedServiceItems;

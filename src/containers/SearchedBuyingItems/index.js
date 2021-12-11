import React, { useState } from 'react';
import { View } from 'react-native';

import { SearchInput, BuyingList, BuyingActionButton } from '../../common';
import { MODULE, IDENTIFIERS } from '../../config/Constants';
import { NavigationService } from '../../utils';

import { AppStyles } from '../../theme';

const SearchedBuyingItems = ({ navigation, route }) => {
  // hide header
  NavigationService.hideHeader(navigation);

  // set search item
  const searchItem = route?.params?.searchItem ?? {};
  const [searchObj, setSearchObj] = useState(searchItem);
  const tag = searchObj?.title ?? '';
  const payload = { tag };

  // set search value
  const searchValue = `${tag}`;

  const onSearchItemSelected = item => {
    setSearchObj(item);
  };

  const search = () => {
    NavigationService.navigate('SearchScreen', {
      _module: MODULE.BUYING,
      onItemSelected: onSearchItemSelected,
    });
  };

  /*
  const [filter, setFilter] = useState({});
  const onApplyFilter = filterData => setFilter(filterData);
  const onFilterPress = () =>
    NavigationService.navigate('FiltersBuying', {
      onApply: onApplyFilter,
      filter,
    });
  */

  /*
  const filterPayload = () => {
    let payload = {};
    if (filter.price_range?.length > 0) {
      payload.min_price = filter.price_range[0];
      payload.max_price = filter.price_range[1];
    }

    payload = { ...payload, ...filter.tags?.value };
    return payload;
  };
  ...filterPayload()
  */

  return (
    <View style={AppStyles.flex}>
      <SearchInput isHeader value={searchValue} onPress={search} />
      <BuyingList
        payload={payload}
        identifier={IDENTIFIERS.SEARCHED_PRODUCTS}
      />
      <BuyingActionButton />
    </View>
  );
};

/*
<FilterBar
        onPress={onFilterPress}
        results={10}
        filters={Util.getFilterCount(filterPayload())}
      />
*/

export default SearchedBuyingItems;

// get last location
//const lastLocation = useSelector(getLastLocation(MODULE.BUYING));
//const formattedAddress = lastLocation?.formattedAddress ?? '';
//const searchValue = `${tag} ${strings('app.in')} ${formattedAddress}`;

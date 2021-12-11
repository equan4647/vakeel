import React, { useState } from 'react';
import { View } from 'react-native';

import { SearchInput, FoodList, FoodActionButton } from '../../common';
import { IDENTIFIERS, MODULE } from '../../config/Constants';

import { AppStyles } from '../../theme';
import { NavigationService } from '../../utils';

const SearchedFood = ({ navigation, route }) => {
  NavigationService.hideHeader(navigation);

  // set search item
  const searchItem = route?.params?.searchItem ?? {};
  const [searchObj, setSearchObj] = useState(searchItem);
  const tag_search = searchObj?.title ?? '';
  const payload = { tag_search };

  const onSearchItemSelected = item => {
    setSearchObj(item);
  };

  const search = () => {
    NavigationService.navigate('SearchScreen', {
      _module: MODULE.FOOD,
      onItemSelected: onSearchItemSelected,
    });
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput isHeader value={tag_search} onPress={search} />

      <FoodList
        {...{ payload }}
        identifier={IDENTIFIERS.SEARCHED_RESTAURANTS}
      />

      <FoodActionButton />
    </View>
  );
};

export default SearchedFood;

import { View } from 'react-native';
import React from 'react';

import { API_MARKETPLACE_PRODUCT_LIST_CATEGORIES } from '../../config/WebService';
import { BuyingList, ScrollableTabView, SearchInput } from '../../common';
import { NavigationService, CategoriesUtil } from '../../utils';
import { MODULE } from '../../config/Constants';
import { AppStyles } from '../../theme';
import styles from './styles';

const SearchedBuyingCats = ({ navigation, route }) => {
  // get item
  const category = route.params?.item ?? {};

  // set title
  NavigationService.setTitle(
    navigation,
    CategoriesUtil.getCategoryName(category)
  );

  // categroies tabs
  const categoriesTabs = CategoriesUtil.getCategoriesTabs(category);

  // on item selected
  const onSearchItemSelected = item => {
    NavigationService.navigate('SearchedBuyingItems', { searchItem: item });
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput
        style={styles.search}
        onPress={() =>
          NavigationService.navigate('SearchScreen', {
            _module: MODULE.BUYING,
            onItemSelected: onSearchItemSelected,
          })
        }
      />
      <ScrollableTabView>
        {categoriesTabs.map((item, index) => (
          <BuyingList
            tabLabel={CategoriesUtil.getCategoryName(item)}
            key={item._id}
            payload={{ parent_id: category._id, child_id: item._id }}
            identifier={`${category._id}_${item._id}`}
            url={API_MARKETPLACE_PRODUCT_LIST_CATEGORIES}
          />
        ))}
      </ScrollableTabView>
    </View>
  );
};

export default SearchedBuyingCats;

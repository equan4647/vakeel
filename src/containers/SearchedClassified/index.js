import { View } from 'react-native';
import React from 'react';

import { IDENTIFIERS, MODULE } from '../../config/Constants';
import { SearchInput, AdsList } from '../../common';
import { ClassifiedUtil } from '../../DataUtils';
import { NavigationService } from '../../utils';
import { AppStyles } from '../../theme';

const SearchedClassified = ({ navigation, route }) => {
  const item = route.params?.item ?? {};

  const [searchItem, setSearchItem] = React.useState(item);

  const { title, payload, attributes } = React.useMemo(
    () => ClassifiedUtil.getSearchItemInfo(searchItem),
    [searchItem]
  );

  const searchValue = `${title}`;

  NavigationService.hideHeader(navigation);

  const onSearchItemSelected = itemSelectedSearch => {
    setSearchItem(itemSelectedSearch);
  };

  const onSearchInputPress = () => {
    NavigationService.navigate('SearchScreen', {
      _module: MODULE.CLASSIFIED,
      onItemSelected: onSearchItemSelected,
    });
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput isHeader value={searchValue} onPress={onSearchInputPress} />
      <AdsList
        payload={payload}
        identifier={IDENTIFIERS.SEARCH_CLASSIFIED_LIST}
        attributesFilter={attributes}
      />
    </View>
  );
};

export default SearchedClassified;

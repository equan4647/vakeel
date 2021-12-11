import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { SearchSuggestionList, SearchInput } from '../../common';
import { MODULE, SEARCH_INPUT_TYPE } from '../../config/Constants';

import { NavigationService, Util } from '../../utils';
import { KeyboardSpacer } from '../../components';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { requestSearchKeyword } from '../../ducks/searchKeyword/actions';
import styles from './styles';
import {
  clearSearchHistory,
  saveSearchHistory,
} from '../../ducks/searchHistory/actions';
import { getSearchHistory } from '../../ducks/searchHistory/selectors';
import { getSearchedItems } from '../../ducks/searchKeyword/selectors';

const SearchScreen = ({ navigation, route }) => {
  const module_type = route.params?._module;
  const [searchText, setSearchText] = useState('');
  const searchInput = React.useRef(null);

  const dispatch = useDispatch();
  const searchResult = useSelector(getSearchedItems(module_type));
  const searchHistory = useSelector(getSearchHistory(module_type));

  const saveHistory = keyword =>
    dispatch(saveSearchHistory(module_type, keyword));
  const requestSearch = keyword =>
    dispatch(requestSearchKeyword(module_type, { keyword }));

  const onSubmitSearch = ({ title }) => {
    const search_text = title ?? searchText;
    NavigationService.pop();
    saveHistory(search_text);
    setTimeout(() => {
      Util.navigateToSearchResult(
        search_text,
        module_type,
        route.params?._flow
      );
    }, 200);
  };

  const Data = _.isEmpty(searchText)
    ? searchHistory.map(item => ({ title: item }))
    : searchResult.map(item => ({ title: item }));

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const onClear = () => setSearchText('');
  const clearHistory = () => dispatch(clearSearchHistory(module_type));
  const onSearch = keyword => {
    setSearchText(keyword);
    requestSearch(keyword);
  };

  // const onSubmitSearch = () => {
  //   saveHistory(searchText);
  //   requestSearch(searchText);
  // };

  NavigationService.hideHeader(navigation);

  return (
    <>
      <SearchInput
        clearButton
        isHeader
        withClose
        value={searchText}
        forwardRef={searchInput}
        onSubmit={onSubmitSearch}
        blurOnSubmit={false}
        {...{ onSearch, onClear }}
      />
      <ScrollView
        style={AppStyles.backgroundColor}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={AppStyles.contentContainerStyle}
        bounces={false}
      >
        <SearchSuggestionList
          style={styles.flatlist1}
          bounces={false}
          type={SEARCH_INPUT_TYPE.HISTORY}
          title={searchText.length ? null : strings('app.search_history')}
          headerProps={{
            rightTitle: strings('app.clear'),
            onPress: clearHistory,
          }}
          data={Data}
          onPress={onSubmitSearch}
        />

        <KeyboardSpacer />
      </ScrollView>
    </>
  );
};

export default SearchScreen;

/*
{searchText.length ? null : (
          <SearchSuggestionList
            style={styles.flatlist2}
            bounces={false}
            headerProps={{ bar: true }}
            title={
              [MODULE.FOOD, MODULE.TOPICS, MODULE.SERVICE].includes(module_type)
                ? undefined
                : strings('app.popular_categories')
            }
            data={getData(module_type).categories}
            onPress={onSubmitSearch}
          />
        )}
*/

/*
const getData = type => {
  let data = {};
  if (type === MODULE.CLASSIFIED) {
    data.history = classifiedHistory;
    data.categories = classifiedCategories;
  } else if (type === MODULE.BUYING) {
    data.history = BuyingHistory;
    data.categories = BuyingCatData;
  } else if (type === MODULE.FOOD) {
    data.history = FoodSearchHistory;
    data.categories = [];
  } else if (type === MODULE.TOPICS) {
    data.history = TopicSearchHistory;
    data.categories = [];
  }
  if (type === MODULE.SERVICE) {
    data.history = ServiceSearchHistory;
    data.categories = [];
  }
  return data;
};
*/
/*
import {
  classifiedHistory,
  classifiedCategories,
  BuyingHistory,
  BuyingCatData,
  FoodSearchHistory,
  TopicSearchHistory,
  ServiceSearchHistory,
} from '../../data/Categories';
*/

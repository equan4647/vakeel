import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import _ from 'lodash';

import { SEARCH_INPUT_TYPE, SEARCH_KEY_INTERVAL } from '../../config/Constants';
import { SearchSuggestionList, SearchInput } from '../../common';
import { KeyboardSpacer } from '../../components';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

import {
  clearSearchHistory,
  saveSearchHistory,
} from '../../ducks/searchHistory/actions';
import { requestSearchKeyword } from '../../ducks/searchKeyword/actions';
import { getSearchHistory } from '../../ducks/searchHistory/selectors';

const SearchScreen = ({ navigation, route }) => {
  // hide navbar
  NavigationService.hideHeader(navigation);

  // get module type
  const module_type = route.params?._module;

  const onItemSelected = route.params?.onItemSelected ?? undefined;

  // define const
  const dispatch = useDispatch();
  const searchInput = React.useRef(null);
  const interval = React.useRef();

  // set local state
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const isSearchEmpty = _.isEmpty(searchText);

  const clearSearchInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  // set default focus on search input
  useEffect(() => {
    // set focus on search input
    searchInput.current.focus();
    return clearSearchInterval;
  }, []);
  // set data for serachHistory
  const searchHistory = useSelector(getSearchHistory(module_type));

  // set data for list with respect to type
  const dataList = isSearchEmpty ? searchHistory : searchResult;

  // on search input function
  const onSearch = keyword => {
    // remove old interval text
    clearSearchInterval();
    // set info and data list
    setLoading(keyword === '' ? false : true);
    setErrorMessage('');
    setSearchText(keyword);

    // if keyword empty set result empty
    if (keyword === '') {
      setSearchResult([]);
    }

    // send request for keyword
    if (keyword !== '') {
      // set interval for text seacrh request
      interval.current = setTimeout(() => {
        dispatch(
          requestSearchKeyword(module_type, { keyword }, (data, success) => {
            // if data is scucees
            if (success) {
              // set info and result data
              setErrorMessage('');
              setLoading(false);
              setSearchResult(data);
            } else {
              // set error message
              setLoading(false);
              setErrorMessage(data);
              setSearchResult([]);
            }
          })
        );
      }, SEARCH_KEY_INTERVAL);
    }
  };

  // on clear textinput function
  const onClear = () => {
    onSearch('');
  };

  // on clear history function
  const clearHistory = () => {
    dispatch(clearSearchHistory(module_type));
  };

  // on save history function
  const saveHistory = item => {
    dispatch(saveSearchHistory(module_type, item));
  };

  // onPressItem function
  const onPressItem = item => {
    // dismiss keyboard
    Keyboard.dismiss();

    setTimeout(() => {
      // pop screen
      NavigationService.pop();
      // save in history
      saveHistory(item);
      // call selected item event
      if (onItemSelected) {
        setTimeout(() => {
          onItemSelected(item);
        }, 200);
      }
    }, 200);
  };

  // on submit search function
  const onSubmitSearch = () => {
    if (searchText) {
      onPressItem({ title: searchText });
    }
  };

  // custom props
  const headerTitle = isSearchEmpty ? strings('app.search_history') : '';
  const typeList = isSearchEmpty
    ? SEARCH_INPUT_TYPE.HISTORY
    : SEARCH_INPUT_TYPE.SEARCH;
  const headerProps =
    isSearchEmpty && searchHistory.length > 0
      ? { rightTitle: strings('app.clear'), onPress: clearHistory }
      : {};
  headerProps.containerStyle = styles.headercontainerStyle;
  let emptyViewText = '';
  // if no history
  if (isSearchEmpty && searchHistory.length === 0) {
    emptyViewText = strings('app.no_history_found');
  }
  // if no data found search
  if (
    loading === false &&
    isSearchEmpty === false &&
    searchResult.length === 0 &&
    errorMessage === ''
  ) {
    emptyViewText = strings('app.no_data_found');
  }

  const showErrorMessage =
    loading === false &&
    isSearchEmpty === false &&
    errorMessage !== '' &&
    searchResult.length === 0;
  const errorProps = showErrorMessage
    ? {
        errorMessage: errorMessage,
        onPressRetry: () => {
          onSearch(searchText);
        },
      }
    : {};

  // main render function
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

      <SearchSuggestionList
        style={AppStyles.backgroundColor}
        contentContainerStyle={styles.contentContainerStyle}
        type={typeList}
        title={headerTitle}
        headerProps={headerProps}
        data={dataList}
        onPress={onPressItem}
        emptyViewText={emptyViewText}
        itemStyle={styles.itemStyle}
        {...errorProps}
      />
      <KeyboardSpacer />
    </>
  );
};

export default SearchScreen;

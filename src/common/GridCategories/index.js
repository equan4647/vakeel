import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, ViewPropTypes } from 'react-native';

import { NavigationService, Util } from '../../utils';
import { MODULE } from '../../config/Constants';
import styles from './styles';
import Item from './Item';

const GridCategories = props => {
  const { style, contentContainerStyle, data, _module, _flow } = props;

  const onPressItem = categoryName => {
    if (_module === MODULE.BUYING) {
      NavigationService.navigate('SearchedBuyingCats', {
        category: categoryName,
        _module,
        _flow,
      });
    } else if (_module === MODULE.TOPICS) {
      Util.navigateToSearchResult(categoryName, _module, _flow);
    } else if (_module === MODULE.SERVICE && _flow && 'category') {
      Util.navigateToSearchResult(categoryName, _module, _flow);
    } else {
      NavigationService.navigate('ViewSubCategories', {
        categoryName,
        _module,
        _flow,
      });
    }
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      {...{ style, contentContainerStyle }}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Item {...{ onPressItem, ...item }} />}
      ItemSeparatorComponent={() => <View style={styles.gridSeparator} />}
    />
  );
};

GridCategories.propTypes = {
  data: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
};
GridCategories.defaultProps = {
  data: [],
};

export default GridCategories;

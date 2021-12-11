import React, { useCallback } from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { CategoryItem } from '..';
import { CATEGORY_DISPLAY } from '../../config/Constants';
import { Categories } from '../../data/Categories';
import styles from './styles';
import { Images } from '../../theme';
import { strings } from '../../utils/i18n';
import { NavigationService } from '../../utils';

const getSepStyle = display => {
  switch (display) {
    case CATEGORY_DISPLAY.GRID_LARGE:
      return styles.gridLargeSeparator;
    case CATEGORY_DISPLAY.GRID:
      return styles.gridSeparator;
    case CATEGORY_DISPLAY.LIST:
      return styles.listSeparator;
  }
};

const CategoryList = ({
  display,
  data = Categories,
  style,
  contentContainerStyle,
  onPressItem,
  itemProps,
  separatorStyle,
  onPressStaticItem,
  ...rest
}) => {
  const defaultSeparator = useCallback(() => getSepStyle(display), [display]);
  const navigate = route => {
    onPressStaticItem();
    NavigationService.navigate(route);
  };
  return (
    <>
      <FlatList
        {...{
          data,
          style,
          contentContainerStyle,
          ...rest,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryItem
            type={display}
            {...{ onPressItem, ...item, ...itemProps }}
          />
        )}
        bounces={display !== CATEGORY_DISPLAY.GRID_LARGE}
        horizontal={display === CATEGORY_DISPLAY.GRID}
        numColumns={display === CATEGORY_DISPLAY.GRID_LARGE ? 2 : 1}
        ItemSeparatorComponent={() => (
          <View style={separatorStyle ?? defaultSeparator()} />
        )}
        ListFooterComponent={() =>
          display === CATEGORY_DISPLAY.GRID_LARGE ? (
            <View style={styles.footerContainer}>
              <CategoryItem
                type={display}
                name={strings('app.help_wanted')}
                image={Images.icons.HelpWanted}
                backgroundColor="#3BAFF0"
                onPressItem={() => navigate('ViewCategories')}
              />
              <CategoryItem
                type={display}
                name={strings('app.more_categories')}
                image={Images.icons.MoreCategories}
                backgroundColor="#50C810"
                onPressItem={() => navigate('ViewCategories')}
              />
            </View>
          ) : null
        }
      />
    </>
  );
};

CategoryList.propTypes = {
  display: PropTypes.oneOf(Object.values(CATEGORY_DISPLAY)).isRequired,
  data: PropTypes.array.isRequired,
  onPressItem: PropTypes.func,
  separatorStyle: ViewPropTypes.style,
};
CategoryList.defaultProps = {
  display: CATEGORY_DISPLAY.GRID,
};
export default CategoryList;

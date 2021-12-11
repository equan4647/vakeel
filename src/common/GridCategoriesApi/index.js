import { FlatList, View, ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, EmptyViewCarousel } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';

import { categoriesSelectors } from '../../ducks/categories';

const GridCategoriesApi = props => {
  const {
    headerTitle,
    rightTitle,
    rightPress,
    contentContainerStyle,
    listStyle,
    identifier,
    onPressItem,
    titleStyle,
  } = props;
  const categoriesList = useSelector(
    categoriesSelectors.getCategoriesList(identifier)
  );

  const customPropsTitle =
    categoriesList.length === 0
      ? {}
      : { onPress: rightPress, rightTitle: rightTitle };

  return (
    <>
      {headerTitle ? (
        <HorizontalTitle
          title={headerTitle}
          leftTextStyle={AppStyles.subHeadLeftText}
          containerStyle={[styles.headingContainer, titleStyle]}
          {...customPropsTitle}
        />
      ) : null}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        style={[styles.listContainer, listStyle]}
        data={categoriesList}
        keyExtractor={(item, index) => `${item._id || item.id}`}
        renderItem={({ item }) => <Item {...{ onPressItem, item }} />}
        ItemSeparatorComponent={() => <View style={styles.gridSeparator} />}
        ListEmptyComponent={() => <EmptyViewCarousel />}
      />
    </>
  );
};

GridCategoriesApi.propTypes = {
  listStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  identifier: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  rightPress: PropTypes.func,
};
GridCategoriesApi.defaultProps = {
  headerTitle: '',
  rightTitle: strings('app.see_all'),
  rightPress: undefined,
  listStyle: {},
  contentContainerStyle: {},
  titleStyle: {},
};

export default React.memo(GridCategoriesApi, (prevProps, nextProps) => {
  return prevProps.identifier === nextProps.identifier;
});

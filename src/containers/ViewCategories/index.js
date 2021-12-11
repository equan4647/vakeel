import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import { NavigationService, CategoriesUtil } from '../../utils';
import { FlatListApi } from '../../components';
import styles from './styles';
import Item from './Item';

import { categoriesSelectors, categoriesActions } from '../../ducks/categories';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const ViewCategories = ({ navigation, route }) => {
  // get attributes module
  const { _module } = route.params;
  const extraPropsClick = route?.params?.extraPropsClick ?? {};

  const {
    navigationTitle,
    identifier,
    url,
    payload,
  } = CategoriesUtil.viewCategoriesInfo(_module);

  // set title
  NavigationService.setTitle(navigation, navigationTitle);

  // categories list and request flag
  const categoriesList = useSelector(
    categoriesSelectors.getCategoriesList(identifier)
  );
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`CATEGORIES_LIST_${identifier}`)
  );

  return (
    <FlatListApi
      data={categoriesList}
      requestAction={categoriesActions.requestCategoryListing}
      contentContainerStyle={styles.contentContainerStyle}
      requestFlags={requestFlags}
      payload={payload}
      url={url}
      identifier={identifier}
      limit={100}
      keyExtractor={item => `${item._id || item.id}`}
      renderItem={({ item }) => {
        return (
          <Item
            item={item}
            _module={_module}
            extraPropsClick={extraPropsClick}
          />
        );
      }}
    />
  );
};

export default ViewCategories;

import { FlatList, View } from 'react-native';
import React from 'react';

import { NavigationService, CategoriesUtil } from '../../utils';
import { EmptyViewApi } from '../../components';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';

const ViewSubCategories = ({ navigation, route }) => {
  const categoryItem = route?.params?.categoryItem ?? {};

  const isAddClassified = route?.params?.isAddClassified ?? false;

  NavigationService.setTitle(
    navigation,
    CategoriesUtil.getCategoryName(categoryItem)
  );

  const subCategories = CategoriesUtil.getSubCategories(
    categoryItem,
    isAddClassified
  );

  if (subCategories.length === 0) {
    return <EmptyViewApi emptyMessage={strings('app.no_category_found')} />;
  }

  return (
    <FlatList
      style={AppStyles.flex}
      contentContainerStyle={AppStyles.contentContainerStyle3}
      data={subCategories}
      renderItem={({ item }) => (
        <Item data={item} isAddClassified={isAddClassified} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => `${item._id || item.id}`}
    />
  );
};

export default ViewSubCategories;

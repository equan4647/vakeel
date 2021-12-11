import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import {
  MODULE,
  MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD,
} from '../../config/Constants';
import { CategoriesUtil, NavigationService, Util } from '../../utils';
import { FlatListApi } from '../../components';
import { LargeHeader } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';

import { categoriesSelectors, categoriesActions } from '../../ducks/categories';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const CalssifiedCategory = ({ navigation }) => {
  NavigationService.setCrossBackHeader(navigation, '', () => {
    NavigationService.pop();
    /*
    Util.showAlertConfirm(
      strings('messages.quit_post_title'),
      '',
      strings('app.quit'),
      () => {
        NavigationService.pop();
      }
    );  
      */
  });

  const { identifier, url, payload } = CategoriesUtil.viewCategoriesInfo(
    MODULE.CLASSIFIED
  );

  // categories list and request flag
  const categoriesList = useSelector(
    categoriesSelectors.getCategoriesList(identifier)
  );
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`CATEGORIES_LIST_${identifier}`)
  );

  // filter list to show max 6 categroies
  const filterList = React.useMemo(() => {
    return categoriesList.length > MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD
      ? categoriesList.slice(0, MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD)
      : categoriesList;
  }, [categoriesList]);

  return (
    <View style={AppStyles.flex}>
      <LargeHeader
        title={strings('app.what_are_you_selling')}
        style={styles.title}
      />
      <FlatListApi
        data={filterList}
        requestAction={categoriesActions.requestCategoryListing}
        //bounces={false}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        requestFlags={requestFlags}
        url={url}
        payload={payload}
        identifier={identifier}
        limit={100}
        disableLoadMore={true}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        keyExtractor={item => item._id || item.id}
        renderItem={({ item, index }) => {
          const isMore =
            categoriesList.length > MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD &&
            index === MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD - 1;
          return <Item item={item} isMore={isMore} />;
        }}
      />
    </View>
  );
};

export default CalssifiedCategory;

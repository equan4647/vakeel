import { useSelector, useDispatch } from 'react-redux';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { API_MARKETPLACE_PRODUCT_LIST } from '../../config/WebService';
import { MODULE } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { FlatListApi } from '../../components';
import { ProductUtil } from '../../DataUtils';
import { FilterBar } from '../../common';
import { BuyingItem } from '..';
import styles from './styles';

import { productSelectors } from '../../ducks/products';
import { getLastLocation } from '../../ducks/location/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { getRadius } from '../../ducks/radius/selectors';
import {
  requestProductListing,
  resetListBuying,
} from '../../ducks/products/actions';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import EmptyView from '../EmptyView';

const BuyingList = props => {
  // get props
  const {
    listStyle,
    contentContainerStyle,
    identifier,
    payload,
    url,
    hideSorting,
    hideFilters,
  } = props;

  // get location and radius
  const radius = useSelector(getRadius(MODULE.BUYING));
  const lastLocation = useSelector(getLastLocation(MODULE.BUYING));

  // set filters object
  const [filter, setFilter] = React.useState({});

  const { filtersPayload, filterCount } = React.useMemo(
    () => ProductUtil.getFiltersInfoBuying(filter),
    [filter]
  );

  // dispatch const
  const dispatch = useDispatch();

  // reset list when unmount
  useEffect(() => () => dispatch(resetListBuying(identifier)), []);

  // product list and request flag
  //const radius = useSelector(getRadius);
  const productsList = useSelector(
    productSelectors.getProductsList(identifier)
  );
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`PRODUCT_LIST_${identifier}`)
  );

  const onApplyFilter = filterData => {
    setFilter(filterData);
  };

  const onFilterPress = () => {
    NavigationService.navigate('FiltersBuying', {
      onApply: onApplyFilter,
      filter: {},
      filterSelectedValues: filter,
      hideSorting: hideSorting,
    });
  };

  const renderFilterBar = () => {
    if (hideFilters) {
      return null;
    }

    const totalRecords = requestFlags?.totalRecords ?? 0;
    const hideFilter =
      requestFlags && requestFlags.loading && !requestFlags.isPullToRefresh;
    if (hideFilter) {
      return null;
    } else {
      return (
        <FilterBar
          onPress={onFilterPress}
          results={totalRecords}
          filters={filterCount}
        />
      );
    }
  };

  return (
    <>
      {renderFilterBar()}
      <FlatListApi
        data={productsList}
        requestAction={requestProductListing}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        directionalLockEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item}
        renderItem={({ item }) => <BuyingItem item={item} isList={true} />}
        emptyView={() => (
          <EmptyView
            withoutArrow
            image="buying"
            containerStyle={AppStyles.emptyContainerStyle}
            text={strings('app.no_buy_product')}
          />
        )}
        filters={{
          ...filtersPayload,
          radius,
          lat: lastLocation.lat,
          long: lastLocation.lng,
        }}
        {...{
          requestFlags,
          payload,
          url,
          listStyle,
          contentContainerStyle,
          identifier,
        }}
      />
    </>
  );
};

BuyingList.propTypes = {
  identifier: PropTypes.string.isRequired,
  listStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  payload: PropTypes.object,
  url: PropTypes.object,
  hideSorting: PropTypes.bool,
  hideFilters: PropTypes.bool,
};
BuyingList.defaultProps = {
  listStyle: {},
  contentContainerStyle: {},
  payload: {},
  url: API_MARKETPLACE_PRODUCT_LIST,
  hideSorting: false,
  hideFilters: false,
};

export default BuyingList;

import React, { useEffect } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FilterBar, FoodItem } from '..';
import styles from './styles';
import { FlatListApi } from '../../components';

import {
  requestRestaurantListing,
  resetListFood,
} from '../../ducks/restaurants/actions';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { getRadius } from '../../ducks/radius/selectors';
import { getLastLocation } from '../../ducks/location/selectors';
import { MODULE } from '../../config/Constants';
import { restaurantsSelectors } from '../../ducks/restaurants';
import { NavigationService } from '../../utils';
import { FoodUtil } from '../../DataUtils';
import { API_RESTAURANTS_LIST } from '../../config/WebService';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import EmptyView from '../EmptyView';

const FoodList = props => {
  const {
    listStyle,
    contentContainerStyle,
    identifier,
    url,
    payload,
    hideSorting,
    hideFilters,
  } = props;

  // get location and radius
  const radius = useSelector(getRadius(MODULE.FOOD));
  const lastLocation = useSelector(getLastLocation(MODULE.FOOD));

  // set filters object
  const [filter, setFilter] = React.useState({});

  const { filtersPayload, filterCount } = React.useMemo(
    () => FoodUtil.getFiltersInfoFood(filter),
    [filter]
  );

  const restaurantsList = useSelector(
    restaurantsSelectors.getRestaurants(identifier)
  );
  const requestFlags = useSelector(
    getRequestFlag(`RESTAURANTS_LIST_${identifier}`)
  );

  const onApplyFilter = filterData => {
    setFilter(filterData);
  };

  const onFilterPress = () => {
    NavigationService.navigate('FiltersFood', {
      onApply: onApplyFilter,
      filter: {},
      filterSelectedValues: filter,
      hideSorting,
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

  const dispatch = useDispatch();
  useEffect(() => () => dispatch(resetListFood(identifier)), [dispatch]);

  return (
    <>
      {renderFilterBar()}
      <FlatListApi
        requestAction={requestRestaurantListing}
        showsVerticalScrollIndicator={false}
        data={restaurantsList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <FoodItem id={item} horizontal={false} />}
        directionalLockEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        emptyView={() => (
          <EmptyView
            withoutArrow
            image="food"
            containerStyle={AppStyles.emptyContainerStyle}
            text={strings('app.no_restaurant_product')}
          />
        )}
        filters={{
          ...filtersPayload,
          radius,
          lat: lastLocation?.lat,
          long: lastLocation?.lng,
        }}
        {...{
          requestFlags,
          payload,
          url,
          listStyle,
          contentContainerStyle,
          identifier,
          ...props,
        }}
      />
    </>
  );
};

FoodList.propTypes = {
  data: PropTypes.array,
  identifier: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style,
  listStyle: ViewPropTypes.style,
  url: PropTypes.object,
};
FoodList.defaultProps = { identifier: '', url: API_RESTAURANTS_LIST };

export default FoodList;

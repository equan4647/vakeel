import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { getRadius } from '../../ducks/radius/selectors';
import { MODULE } from '../../config/Constants';
import { getLastLocation } from '../../ducks/location/selectors';
import { FlatListApi } from '../../components';
import { servicesActions, servicesSelectors } from '../../ducks/services';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { FilterBar } from '..';
import { NavigationService } from '../../utils';
import { ServicesUtil } from '../../DataUtils';
import EmptyView from '../EmptyView';
import { strings } from '../../utils/i18n';

const ServiceList = props => {
  const {
    listStyle,
    identifier,
    payload,
    url,
    hideSorting,
    hideFilters,
  } = props;

  // get location and radius
  const radius = useSelector(getRadius(MODULE.SERVICE));
  const lastLocation = useSelector(getLastLocation(MODULE.SERVICE));

  // set filters object
  const [filter, setFilter] = React.useState({});

  // dispatch const
  const dispatch = useDispatch();

  // reset list when unamount
  React.useEffect(() => {
    return () => {
      dispatch(servicesActions.resetListServices(identifier));
    };
  }, []);

  const { filtersPayload, filterCount } = React.useMemo(
    () => ServicesUtil.getFiltersInfoServices(filter),
    [filter]
  );

  const servicesList = useSelector(
    servicesSelectors.getServicesList(identifier)
  );

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`SERVICES_LIST_${identifier}`)
  );

  const onApplyFilter = filterData => {
    setFilter(filterData);
  };

  const onFilterPress = () => {
    NavigationService.navigate('FilterService', {
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
        data={servicesList}
        requestAction={servicesActions.requestServicesListing}
        style={[styles.list, props.style]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyles.listContainer,
          props.contentContainerStyle,
        ]}
        directionalLockEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item}
        renderItem={({ item }) => <Item item={item} onPressItem={() => {}} />}
        emptyView={() => (
          <EmptyView
            withoutArrow
            image="servicePending"
            containerStyle={AppStyles.emptyContainerStyle}
            text={strings('app.no_service')}
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
          identifier,
        }}
      />
    </>
  );
};

ServiceList.propTypes = {
  data: PropTypes.array,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
};
ServiceList.defaultProps = { data: [] };

export default ServiceList;

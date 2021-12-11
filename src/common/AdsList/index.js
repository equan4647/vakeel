import { useSelector, useDispatch } from 'react-redux';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { API_CLASSIFIED_LIST } from '../../config/WebService';
import { NavigationService } from '../../utils';
import { MODULE } from '../../config/Constants';
import { FlatListApi } from '../../components';
import { FilterBar } from '../../common';
import styles from './styles';
import Item from './Item';

import { classifiedSelectors, classifiedActions } from '../../ducks/classified';
import { getLastLocation } from '../../ducks/location/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { getRadius } from '../../ducks/radius/selectors';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import EmptyView from '../EmptyView';

const AdsList = props => {
  // get props
  const {
    listStyle,
    contentContainerStyle,
    identifier,
    payload,
    url,
    hideFilters,
    attributesFilter,
    hideSorting,
    addLocationRadius,
  } = props;

  // dispatch const
  const dispatch = useDispatch();

  // filters info
  const [filtersInfo, setFiltersInfo] = React.useState({
    filtersApplied: {},
    filtersPayload: {},
    filtersCount: 0,
  });

  // get radius and location
  const lastLocation = useSelector(getLastLocation(MODULE.CLASSIFIED));
  const radius = useSelector(getRadius(MODULE.CLASSIFIED));
  //const radius = 100000;
  const locationRadiusPayload = addLocationRadius
    ? { radius: radius, location: `${lastLocation.lat},${lastLocation.lng}` }
    : {};

  // reset list when unamount
  React.useEffect(() => {
    return () => {
      dispatch(classifiedActions.resetListClassified(identifier));
    };
  }, []);

  // classified list and request flag
  const classifiedList = useSelector(
    classifiedSelectors.getClassifiedList(identifier)
  );
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`CLASSIFIED_LIST_${identifier}`)
  );

  const onSelectFilters = filterInfo => {
    setFiltersInfo(filterInfo);
  };

  const onFilterPress = () => {
    NavigationService.navigate('FiltersClassified', {
      attributes: attributesFilter,
      hideSorting,
      onSelect: onSelectFilters,
      filtersApplied: filtersInfo.filtersApplied,
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
    }
    return (
      <FilterBar
        onPress={onFilterPress}
        results={totalRecords}
        filters={filtersInfo.filtersCount}
        //hideFilters={hideFilters}
      />
    );
  };

  // retturn list
  return (
    <>
      {renderFilterBar()}
      <FlatListApi
        data={classifiedList}
        requestAction={classifiedActions.requestClassifiedListing}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => `${item}`}
        renderItem={({ item }) => <Item {...{ item }} />}
        emptyView={() => (
          <EmptyView
            withoutArrow
            image="classified"
            containerStyle={AppStyles.emptyContainerStyle}
            text={strings('app.no_classified')}
          />
        )}
        filters={{
          ...locationRadiusPayload,
          ...filtersInfo.filtersPayload,
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

AdsList.propTypes = {
  identifier: PropTypes.string.isRequired,
  listStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  payload: PropTypes.object,
  url: PropTypes.object,
  hideFilters: PropTypes.bool,
  attributesFilter: PropTypes.array,
  hideSorting: PropTypes.bool,
  addLocationRadius: PropTypes.bool,
};
AdsList.defaultProps = {
  listStyle: {},
  contentContainerStyle: {},
  payload: {},
  url: API_CLASSIFIED_LIST,
  hideFilters: false,
  attributesFilter: [],
  hideSorting: false,
  addLocationRadius: true,
};

export default AdsList;

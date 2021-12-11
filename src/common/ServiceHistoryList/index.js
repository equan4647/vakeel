import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';
import { FlatListApi } from '../../components';
import { requestServiceHistory } from '../../ducks/serviceHistory/actions';
import { useSelector } from 'react-redux';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { serviceHistorySelectors } from '../../ducks/serviceHistory';
import { EmptyView } from '..';
import { strings } from '../../utils/i18n';

const ServiceHistoryList = ({
  emptyViewText,
  identifier,
  style,
  containerStyle,
  itemProps,
  payload,
}) => {
  const requestFlags = useSelector(
    getRequestFlag(`GET_SERVICE_HISTORY_${identifier}`)
  );

  const data = useSelector(
    serviceHistorySelectors.getServiceHistoryList(identifier)
  );
  // const data = [];

  React.useEffect(() => {}, [data]);

  return (
    <FlatListApi
      {...{ requestFlags, data, payload }}
      showsVerticalScrollIndicator={false}
      extraData={identifier}
      requestAction={requestServiceHistory}
      style={[styles.container, style]}
      identifier={identifier}
      contentContainerStyle={[containerStyle, styles.container]}
      renderItem={({ item }) => (
        <Item id={item} {...itemProps} type={identifier} />
      )}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="servicePending"
          text={emptyViewText ?? strings('app.pending_service_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

ServiceHistoryList.propTypes = {
  data: PropTypes.array,
  emptyViewText: PropTypes.string,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};
ServiceHistoryList.defaultProps = {
  data: [],
};
export default ServiceHistoryList;

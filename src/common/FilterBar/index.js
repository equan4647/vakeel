import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';

import { Badge } from '..';
import { ButtonView, Text } from '../../components';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const FilterIcon = React.memo(props => {
  const { filters, tintColor, locationFilter, onPress } = props;
  return (
    <ButtonView
      hitSlop={Metrics.hitSlop}
      style={AppStyles.rowAligned}
      {...{ onPress }}
    >
      {locationFilter ? <Image source={Images.icons.locationFilter} /> : null}

      <View style={styles.filterIcon}>
        <Image source={Images.icons.filterIcon} style={{ tintColor }} />

        {filters > 0 ? <Badge count={filters} style={styles.badge} /> : null}
      </View>

      <Text type="medium" color={tintColor}>
        {strings('app.filter')}
      </Text>
    </ButtonView>
  );
});
const FilterBar = props => {
  const tintColor = props.filters > 0 ? Colors.primary : Colors.black;
  return (
    <View style={styles.container}>
      <Text type="medium">{`${props.results}  ${strings('app.results')}`}</Text>
      {props.hideFilters ? null : <FilterIcon {...{ tintColor, ...props }} />}
    </View>
  );
};

FilterIcon.propTypes = {
  results: PropTypes.number,
  filters: PropTypes.number,
  locationFilter: PropTypes.bool,
  onPress: PropTypes.func,
  requestFlagIdentifier: PropTypes.string,
  hideFilters: PropTypes.bool,
};
FilterIcon.defaultProps = {
  results: 0,
  filters: 0,
  locationFilter: false,
  requestFlagIdentifier: '',
  hideFilters: false,
};

export default React.memo(FilterBar);

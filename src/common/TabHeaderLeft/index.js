import React from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getLastLocation } from '../../ducks/location/selectors';
import { setLastLocation } from '../../ducks/location/actions';
import { ButtonView, Text } from '../../components';
import { NavigationService } from '../../utils';
import { AppStyles, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

import { radiusSelectors, radiusActions } from '../../ducks/radius';
import { FILTER, MODULE } from '../../config/Constants';
import Badge from '../Badge';

const TabHeaderLeft = props => {
  const { module, width } = props;
  const dispatch = useDispatch(),
    selectedLocation = useSelector(getLastLocation(module)),
    radius = useSelector(radiusSelectors.getRadius(module));

  const onSelectLocation = location => {
    dispatch(setLastLocation(module, location));
  };

  const onSelectRadius = radiusSelected => {
    dispatch(radiusActions.setRadius(module, radiusSelected));
  };

  return (
    <View style={[AppStyles.spreadRowAligned, { width }]}>
      <ButtonView
        hitSlop={Metrics.hitSlop}
        style={styles.container}
        onPress={() =>
          NavigationService.navigate('LocationSearch', {
            onSelect: onSelectLocation,
          })
        }
      >
        <Image source={Images.icons.locationBlack} resizeMode="contain" />
        <Text
          style={[styles.text, { maxWidth: width * 0.78 }]}
          numberOfLines={1}
        >
          {selectedLocation?.formattedAddress ?? strings('app.select_location')}

          {/* {selectedLocation.areaAddress
            ? selectedLocation.areaAddress
            : selectedLocation?.formattedAddress ||
              strings('app.select_location')} */}
        </Text>
        <Image source={Images.icons.arrowDown} style={styles.arrowDown} />
      </ButtonView>

      <ButtonView
        hitSlop={Metrics.hitSlop2}
        onPress={() =>
          NavigationService.navigate('FiltersRadius', {
            radius,
            onSelect: onSelectRadius,
          })
        }
      >
        <Image source={Images.icons.filterRadius} resizeMode="contain" />

        {radius !== FILTER.DEFAULT_RADIUS ? (
          <Badge count={radius} style={styles.badge} />
        ) : null}
      </ButtonView>
    </View>
  );
};

TabHeaderLeft.propTypes = {
  module: PropTypes.oneOf(Object.values(MODULE)),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TabHeaderLeft.defaultProps = {};

export default React.memo(TabHeaderLeft);

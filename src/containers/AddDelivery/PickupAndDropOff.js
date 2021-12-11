import PropTypes from 'prop-types';
import React from 'react';

import { PickAndDropLocation } from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { Images } from '../../theme';
import _ from 'lodash';
import { Keyboard } from 'react-native';

const PickupAndDropOff = ({
  onPickUpSelected,
  onDropOffSelected,
  pickUpLocation,
  dropOffLocation,
}) => {
  // on press pick up
  const onPressPickUp = () => {
    Keyboard.dismiss();
    NavigationService.navigate(
      'LocationSearch',
      {
        title: strings('app.search_pickup_location'),
        searchPlaceholder: strings('app.add_pickup_location'),
        searchImageProps: {
          source: Images.icons.pickLocation,
          style: {},
        },
        onSelect: location => {
          onPickUpSelected(location);
        },
        locationOnMap: true,
        selectedLocation: pickUpLocation,
      },
      'LocationSearchStack'
    );
  };

  // on press pick up
  const onPressDropOff = () => {
    Keyboard.dismiss();
    NavigationService.navigate(
      'LocationSearch',
      {
        title: strings('app.search_dropoff_location'),
        searchPlaceholder: strings('app.add_dropoff_location'),
        searchImageProps: {
          source: Images.icons.locationBlack,
          style: {},
        },
        onSelect: location => {
          onDropOffSelected(location);
        },
        locationOnMap: true,
        selectedLocation: dropOffLocation,
      },
      'LocationSearchStack'
    );
  };

  return (
    <PickAndDropLocation
      pickAddress={
        pickUpLocation?.formattedAddress || strings('app.add_pickup_location')
      }
      dropAddress={
        dropOffLocation?.formattedAddress || strings('app.add_dropoff_location')
      }
      onPressPick={onPressPickUp}
      onPressDrop={onPressDropOff}
      isDropoffDisabled={_.isEmpty(pickUpLocation?.formattedAddress)}
      alwaysShowArrows
      disabledOpacity={0.2}
    />
  );
};

PickupAndDropOff.propTypes = {
  onPickUpSelected: PropTypes.func.isRequired,
  onDropOffSelected: PropTypes.func.isRequired,
  pickUpLocation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  dropOffLocation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

PickupAndDropOff.defaultProps = { pickUpLocation: '', dropOffLocation: '' };

export default PickupAndDropOff;

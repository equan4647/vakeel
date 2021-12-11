import { View, Image, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { AppStyles, Colors, Images, Metrics } from '../../theme';
import { ButtonView, Text } from '../../components';
import { Separator, OrderStatusTag } from '..';
import { strings } from '../../utils/i18n';
import styles from './styles';

const LocationImages = React.memo(
  ({ pickDisabled, dropDisabled, disabledOpacity }) => {
    const pickIconStyle = { opacity: pickDisabled ? disabledOpacity : 1 };
    const dropIconStyle = { opacity: dropDisabled ? disabledOpacity : 1 };

    return (
      <View style={styles.imagesContainer}>
        <Image source={Images.icons.pickLocation} style={pickIconStyle} />

        <View style={styles.imageSeparator} />

        <Image source={Images.icons.locationBlack} style={dropIconStyle} />
      </View>
    );
  }
);

const Input = ({
  withArrows,
  onPress,
  viewableOnly,
  value,
  disabled,
  alwaysShowArrows,
  disabledOpacity,
  containerStyle,
}) => {
  const Container = viewableOnly ? View : ButtonView;
  return (
    <Container
      style={[AppStyles.spreadRowAligned, containerStyle]}
      hitSlop={Metrics.hitSlop}
      disabledOpacity={disabledOpacity}
      {...{ disabled, onPress }}
    >
      <Text numberOfLines={2} style={styles.input}>
        {value}
      </Text>

      {alwaysShowArrows || (!viewableOnly && withArrows && !disabled) ? (
        <Image source={Images.icons.arrowRight} />
      ) : null}
    </Container>
  );
};

const PickAndDropLocation = props => {
  const {
    viewableOnly,
    style,
    onPressPick,
    onPressDrop,
    pickAddress,
    dropAddress,
    isPickupDisabled,
    isDropoffDisabled,
    rightEditClick,
    rightView,
    status,
    showSeparator,
  } = props;
  const container = viewableOnly ? styles.withoutBorder : styles.withBorder;
  const separator = {
    backgroundColor:
      !showSeparator && viewableOnly ? Colors.white : Colors.lightBlueGrey,
    marginVertical:
      !showSeparator && viewableOnly
        ? Metrics.smallMargin
        : Metrics.bigSmallMargin * 1.5,
  };
  const pickDisabled =
    (!viewableOnly && _.isUndefined(onPressPick)) || isPickupDisabled;
  const dropDisabled =
    (!viewableOnly && _.isUndefined(onPressDrop)) || isDropoffDisabled;

  const pickupLength = pickAddress?.length ?? 0;
  const dropOffLength = dropAddress?.length ?? 0;

  return (
    <View style={StyleSheet.flatten([container, styles.container, style])}>
      <LocationImages {...{ pickDisabled, dropDisabled, ...props }} />

      <View style={[AppStyles.flex1]}>
        <Input
          onPress={onPressPick}
          value={pickAddress}
          disabled={pickDisabled}
          containerStyle={pickupLength > 55 ? { top: -2 } : { paddingTop: 2 }}
          {...props}
        />

        <Separator style={StyleSheet.flatten([styles.separator, separator])} />

        <Input
          onPress={onPressDrop}
          value={dropAddress}
          disabled={dropDisabled}
          containerStyle={
            dropOffLength > 55 ? { bottom: -2 } : { paddingBottom: 2 }
          }
          {...props}
        />
      </View>

      {status ? <OrderStatusTag {...{ status }} /> : null}

      {rightEditClick ? (
        <ButtonView hitSlop={Metrics.hitSlop} onPress={rightEditClick}>
          <Text color="primary" type="semiBold" style={styles.rightEdit}>
            {strings('app.editCaps')}
          </Text>
        </ButtonView>
      ) : null}

      {rightView ? rightView() : null}
    </View>
  );
};

PickAndDropLocation.propTypes = {
  onPressPick: PropTypes.func,
  onPressDrop: PropTypes.func,
  viewableOnly: PropTypes.bool,
  withArrows: PropTypes.bool,
  pickAddress: PropTypes.string,
  dropAddress: PropTypes.string,
  style: ViewPropTypes.style,
  isPickupDisabled: PropTypes.bool,
  isDropoffDisabled: PropTypes.bool,
  alwaysShowArrows: PropTypes.bool,
  disabledOpacity: PropTypes.number,
  rightEditClick: PropTypes.func,
  rightView: PropTypes.func,
  status: PropTypes.string,
  showSeparator: PropTypes.bool,
};

PickAndDropLocation.defaultProps = {
  viewableOnly: false,
  withArrows: true,
  isPickupDisabled: false,
  isDropoffDisabled: false,
  alwaysShowArrows: false,
  disabledOpacity: 0.5,
  rightEditClick: undefined,
  rightView: undefined,
  status: '',
  showSeparator: false,
};

export default PickAndDropLocation;

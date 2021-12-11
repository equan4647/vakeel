import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  AddressItem,
  HorizontalTitle,
  PickAndDropLocation,
} from '../../common';
import { Colors } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const DisplayAddress = props => {
  const {
    data,
    pickAddress,
    title,
    editTextColor,
    rightTitle,
    onEdit,
    style,
  } = props;

  const editable = !_.isUndefined(onEdit);
  const getRightTitle = () => {
    if (editable && title) {
      if (rightTitle) {
        return rightTitle;
      } else {
        return _.isEmpty(data) ? strings('app.addCaps') : strings('app.change');
      }
    }
    return null;
  };

  if (pickAddress) {
    return (
      <PickAndDropLocation
        dropAddress={data}
        onPressDrop={onEdit}
        viewableOnly={!editable}
        {...{ style, pickAddress }}
      />
    );
  } else {
    return (
      <View {...{ style }}>
        <HorizontalTitle
          {...{ title }}
          rightTitle={getRightTitle()}
          onPress={onEdit}
          containerStyle={styles.headingStyle}
          rightTextStyle={{ color: editTextColor }}
        />

        {_.isEmpty(data) ? null : (
          <AddressItem
            {...{ data }}
            editable={false}
            badge={false}
            style={styles.addressItem}
          />
        )}
      </View>
    );
  }
};

DisplayAddress.propTypes = {
  data: PropTypes.object.isRequired,
  pickAddress: PropTypes.string,
  title: PropTypes.string,
  editable: PropTypes.bool,
  editTextColor: PropTypes.string,
  rightTitle: PropTypes.string,
  onEdit: PropTypes.func,
  style: ViewPropTypes.style,
};
DisplayAddress.defaultProps = {
  data: '',
  editable: false,
  editTextColor: Colors.black,
};

export default DisplayAddress;

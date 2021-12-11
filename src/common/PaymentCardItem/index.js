import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text, Image, ButtonView } from '../../components';
import { Pressable } from '../../common';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { PaymentUtil } from '../../DataUtils';
import { Util } from '../../utils';
import _ from 'lodash';

const PaymentCardItem = ({ data, onSelect, onDelete, isSelected, style }) => {
  const TagView = onSelect ? ButtonView : View;

  const onPressDelete = () =>
    Util.showAlertConfirm(
      strings('app.are_you_sure'),
      strings('app.delete_card_confirm'),
      strings('app.delete'),
      () => onDelete?.(PaymentUtil.getId(data))
    );

  if (_.isEmpty(data)) {
    return null;
  } else {
    return (
      <TagView
        onPress={() => onSelect?.(PaymentUtil.getId(data))}
        style={[AppStyles.flex1, style]}
      >
        <View style={AppStyles.spreadRowAligned}>
          <Image source={Util.getCardImage(PaymentUtil.getBrand(data))} />

          <Text style={styles.cardNumber}>
            {PaymentUtil.getCardNumber(data)}
          </Text>

          {isSelected ? <Image source={Images.icons.selected} /> : null}
        </View>

        {onDelete ? (
          <Pressable onPress={onPressDelete} style={styles.bottomContainer}>
            <Text style={styles.deleteText}>
              {strings('app.delete').toUpperCase()}
            </Text>
          </Pressable>
        ) : null}
      </TagView>
    );
  }
};

PaymentCardItem.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  isSelected: PropTypes.bool,
  style: ViewPropTypes.style,
};
PaymentCardItem.defaultProps = {
  data: {},
  isSelected: false,
};

export default PaymentCardItem;

import React from 'react';
import { StyleSheet, ViewPropTypes, Keyboard, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { HorizontalTitle, PaymentCardItem } from '..';
import styles from './styles';
import { strings } from '../../utils/i18n';
import { Colors, Images } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { Text } from '../../components';

const WalletAmount = ({ isWalletCharged }) => {
  if (!isWalletCharged) {
    return null;
  } else {
    return (
      <View style={styles.walletContainer}>
        <Image source={Images.cards.bizadwallet} />

        <Text style={styles.walletText}>{strings('app.bizad_wallet')}</Text>
      </View>
    );
  }
};

const DisplayPaymentMethod = props => {
  const {
    title,
    barOnTop,
    titleContainerStyle,
    barStyle,
    editable,
    rightTitle,
    cardInfo,
    editTextColor,
    isCardCharged,
    isWalletCharged,
    onSubmit,
    paymentScreenParams,
    rightTitleButtonProps,
  } = props;

  const rightText =
    isCardCharged || isWalletCharged
      ? strings('app.change')
      : strings('app.addCaps');

  return (
    <>
      <HorizontalTitle
        rightTitle={!editable ? undefined : rightTitle ?? rightText}
        {...{ title, rightTitleButtonProps }}
        barStyle={StyleSheet.flatten([styles.barStyle, barStyle])}
        containerStyle={StyleSheet.flatten([
          styles.horizontalTitle,
          titleContainerStyle,
        ])}
        rightTextStyle={{ color: editTextColor }}
        bar={barOnTop}
        onPress={() => {
          Keyboard.dismiss();
          NavigationService.navigate(
            'PaymentMethod',
            { showCross: true, onSubmit, ...paymentScreenParams },
            'PaymentMethodModal'
          );
        }}
      />

      {!isWalletCharged && !isCardCharged ? null : (
        <>
          {isCardCharged ? (
            <PaymentCardItem data={cardInfo} style={styles.card} />
          ) : null}
          <WalletAmount {...{ isWalletCharged }} />
        </>
      )}
    </>
  );
};

DisplayPaymentMethod.propTypes = {
  onSubmit: PropTypes.func,
  cardInfo: PropTypes.object,
  barStyle: ViewPropTypes.style,
  titleContainerStyle: ViewPropTypes.style,
  barOnTop: PropTypes.bool,
  editable: PropTypes.bool,
  isCardCharged: PropTypes.bool,
  isWalletCharged: PropTypes.bool,
  title: PropTypes.string,
  editTextColor: PropTypes.string,
};
DisplayPaymentMethod.defaultProps = {
  barOnTop: true,
  title: strings('app.payment_method'),
  editable: true,
  editTextColor: Colors.black,
  // rightTitle: strings('app.editCaps'),
};

export default DisplayPaymentMethod;

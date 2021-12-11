import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';
import { Switch, Text } from '../../components';
import { AppUtil } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { getWalletAmount } from '../../ducks/payment/selectors';

const WalletView = ({
  allowTransaction,
  setAllowTransaction,
  showSwitch,
  priceToCharge,
  hideDeductionAmount,
}) => {
  const walletAmount = useSelector(getWalletAmount),
    deductAmount =
      Number(priceToCharge) <= Number(walletAmount)
        ? priceToCharge
        : walletAmount;

  return (
    <View style={styles.container}>
      <View style={AppStyles.spreadRowAligned}>
        <Text style={styles.title}>
          {showSwitch
            ? strings('app.use_biz_ad_wallet')
            : strings('app.bizad_wallet')}
        </Text>

        {showSwitch ? (
          <Switch
            onChange={setAllowTransaction}
            disabled={walletAmount < 1}
            value={walletAmount > 0}
          />
        ) : null}
      </View>

      <View style={AppStyles.spreadRowAligned}>
        <Text style={styles.amount}>{AppUtil.formatPrice(walletAmount)}</Text>
        {showSwitch && allowTransaction && !hideDeductionAmount ? (
          <Text style={styles.deductAmount}>
            -$
            {Math.abs(deductAmount)}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default WalletView;

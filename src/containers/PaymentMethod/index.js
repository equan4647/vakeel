import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomButton, PaymentCardItem, WalletView } from '../../common';
import { AppUtil, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import { Item } from '../../common/SimpleListing';
import { AppStyles } from '../../theme';
import { View } from 'react-native';
import { ButtonView, ScrollViewApi } from '../../components';
import styles from './styles';
import {
  getCardItem,
  getLastUsedCardId,
  getWalletAmount,
  getWalletUpdate,
} from '../../ducks/payment/selectors';
import _ from 'lodash';
import { requestGetWallet, resetWallet } from '../../ducks/payment/actions';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { getStripeCustomerID } from '../../ducks/auth/selectors';

const PaymentMethod = ({ navigation, route }) => {
  const fromMenu = route.params?.fromMenu ?? false,
    onSubmit = route.params?.onSubmit,
    amountToCharge = route.params?.amountToCharge ?? 0,
    showCross = route.params?.showCross ?? false,
    payLater = route.params?.payLater ?? false,
    allowDefaultCard = route.params?.allowDefaultCard ?? true;

  const lastUsedCard = useSelector(getLastUsedCardId);
  const walletAmount = useSelector(getWalletAmount);
  const [defaultCardID, setDefaultCardID] = useState(
    allowDefaultCard ? lastUsedCard : ''
  );

  const [useWallet, setUseWallet] = useState(walletAmount > 0);

  const stripeCustomerID = useSelector(getStripeCustomerID);
  const selectedCard = useSelector(getCardItem(defaultCardID));
  const walletUpdate = useSelector(getWalletUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    setUseWallet(walletAmount > 0);
  }, [walletAmount]);

  if (showCross) {
    NavigationService.setCrossBackHeader(
      navigation,
      strings('app.payment_method')
    );
  } else {
    NavigationService.setTitle(navigation, strings('app.payment_method'));
  }

  useEffect(() => () => dispatch(resetWallet()), [dispatch]);

  const onSelectCard = () => {
    const onSelect = cardID => {
      setDefaultCardID(cardID);
      NavigationService.pop();
    };
    NavigationService.navigate('PaymentCardList', {
      onSelect: fromMenu ? undefined : onSelect,
    });
  };

  const shouldUseCard = () => {
    if (!useWallet || payLater) {
      return 1;
    } else {
      return Number(amountToCharge) <= Number(walletAmount) ? 0 : 1;
    }
  };

  const payNow = () => {
    onSubmit?.({
      use_wallet: useWallet ? 1 : 0,
      use_card: shouldUseCard(),
      card_token: defaultCardID,
      customer_id: stripeCustomerID,
    });
  };

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('GET_WALLET')
  );

  const disableProceedButton = () => {
    if (payLater) {
      return _.isEmpty(selectedCard);
    } else {
      if (useWallet) {
        return Number(amountToCharge) > Number(walletAmount)
          ? _.isEmpty(selectedCard)
          : false;
      } else {
        return _.isEmpty(selectedCard);
      }
    }
  };

  return (
    <>
      <ScrollViewApi
        data={walletUpdate}
        requestAction={requestGetWallet}
        requestFlags={requestFlags}
        content={() => (
          <View style={AppStyles.container}>
            <WalletView
              hideDeductionAmount={payLater}
              priceToCharge={amountToCharge}
              showSwitch={!fromMenu}
              allowTransaction={useWallet}
              setAllowTransaction={() => setUseWallet(isTrue => !isTrue)}
            />

            {!fromMenu &&
            useWallet &&
            Number(amountToCharge) <= Number(walletAmount) ? null : (
              <ButtonView onPress={onSelectCard}>
                <Item
                  name={strings('app.credit_debit_card')}
                  style={styles.selectCard}
                />

                {fromMenu ? null : (
                  <PaymentCardItem data={selectedCard} isSelected />
                )}
              </ButtonView>
            )}
          </View>
        )}
      />

      {fromMenu ? null : (
        <BottomButton
          onPress={payNow}
          disabled={disableProceedButton()}
          title={
            showCross
              ? strings('app.save')
              : `${strings('app.proceed')} ${AppUtil.formatPrice(
                  amountToCharge
                )}`
          }
        />
      )}
    </>
  );
};
export default PaymentMethod;

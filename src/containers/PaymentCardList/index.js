import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BottomButton, EmptyView, PaymentCardItem } from '../../common';
import { strings } from '../../utils/i18n';
import { NavigationService } from '../../utils/';
import styles from './styles';
import {
  requestCardList,
  requestDeletePaymentMethod,
  savePreferedCard,
} from '../../ducks/payment/actions';
import { FlatListApi, Loader } from '../../components';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { getCardsList } from '../../ducks/payment/selectors';
import { PaymentUtil } from '../../DataUtils';

export default ({ navigation, route }) => {
  const isSelectable = route?.params?.onSelect ?? false;

  NavigationService.setAddHeader(
    navigation,
    strings('app.credit_debit_card'),
    () =>
      NavigationService.navigate('AddPaymentMethod', {
        isEdit: false,
        data: null,
      })
  );

  const dispatch = useDispatch();
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('GET_CARD_LIST')
  );

  const data = useSelector(getCardsList);

  const [selectedID, setSelectedID] = useState(null);

  const onSelect = id => setSelectedID(id);

  const onDelete = card_token =>
    dispatch(requestDeletePaymentMethod({ card_token }));

  const onProceed = () => {
    route.params?.onSelect?.(selectedID);
    dispatch(savePreferedCard(selectedID));
  };

  const rest = isSelectable ? { onSelect } : {};

  return (
    <>
      <FlatListApi
        {...{ data, requestFlags }}
        requestAction={requestCardList}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        ListEmptyComponent={
          <EmptyView image="card" text={strings('app.add_card_empty_text')} />
        }
        renderItem={({ item }) => (
          <PaymentCardItem
            data={item}
            isSelected={PaymentUtil.getId(item) === selectedID}
            {...{ onDelete, ...rest }}
          />
        )}
      />

      {isSelectable ? (
        <BottomButton
          disabled={!selectedID}
          title={strings('app.done')}
          onPress={onProceed}
        />
      ) : null}

      <Loader type="DELETE_PAYMENT_METHOD" />
    </>
  );
};

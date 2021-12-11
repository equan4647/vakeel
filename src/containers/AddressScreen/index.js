import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { AddressItem, EmptyView, BottomButton } from '../../common';
import { FlatListApi } from '../../components';
import { AddressUtil } from '../../DataUtils';
import { adressActions } from '../../ducks/addresses';
import { getAddresses } from '../../ducks/addresses/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const AddressScreen = ({ navigation, route }) => {
  const isMyAddresses = route?.params?.isMine,
    defaultSelectedId = route.params?.id ?? '';

  const [selectedItem, selectItem] = useState(defaultSelectedId);

  const adressesData = useSelector(getAddresses),
    requestFlags = useSelector(
      requestFlagSelectors.getRequestFlag('GET_ADDRESSES')
    );

  const onAddAddress = () => {
    NavigationService.navigate('AddAddress', { isEdit: false });
  };

  const onProceed = () => {
    route.params?.onSave(selectedItem);
  };

  const ScreenTitle = strings(
    `app.${isMyAddresses ? 'my_address' : 'choose_address'}`
  );

  NavigationService.setAddHeader(navigation, ScreenTitle, onAddAddress);

  if (!isMyAddresses) {
    NavigationService.setCrossBackHeader(navigation, ScreenTitle);
  }

  const onSelect = id => selectItem(id);

  return (
    <>
      <FlatListApi
        data={adressesData}
        extraData={adressesData}
        limit={100}
        requestFlags={requestFlags}
        requestAction={adressActions.requestGetAddress}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <EmptyView
            text={strings('app.emptyAddress')}
            containerStyle={styles.emptyStyle}
          />
        }
        renderItem={({ item }) => (
          <AddressItem
            data={item}
            onPress={isMyAddresses ? undefined : onSelect}
            isSelected={!isMyAddresses && selectedItem === AddressUtil.id(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {!isMyAddresses && (
        <BottomButton
          title={strings('app.done')}
          onPress={onProceed}
          disabled={Util.isEmpty(selectedItem)}
        />
      )}
    </>
  );
};

export default AddressScreen;

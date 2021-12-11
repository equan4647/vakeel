import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  Text,
  ButtonView,
  Image,
  ErrorViewApi,
  LoaderViewApi,
} from '../../components';
import { IQKeyboardManager, Util } from '../../utils';
import { Images, Metrics } from '../../theme';
import { SearchInput } from '../../common';
import { strings } from '../../utils/i18n';
import styles from './styles';
import Item from './Item';

import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { requestDropdownData } from '../../ducks/dropdown/actions';
import { getDropdownData } from '../../ducks/dropdown/selectors';

const DropDown = (props, forwardedRef) => {
  //set state and ref
  const [modalInfo, setInfo] = useState({
    data: [],
    title: '',
    selectedItem: {},
    idKey: 'id',
    titleKey: 'title',
    onItemSelected: {},
    customItem: false,
    hideSearch: false,
    identifier: '',
    api: null,
    payload: null,
    freshData: false,
  });

  const modalizeRef = useRef(null);
  const [searchText, setSearchText] = React.useState('');
  const { identifier, api, payload, freshData = false } = modalInfo;
  const dropdown_data = useSelector(getDropdownData(identifier));
  const { loading, failure, errorMessage } = useSelector(
    getRequestFlag(`DROPDOWN_DATA_${identifier}`)
  );
  const dispatch = useDispatch();

  // hide modal function
  const hideModal = () => {
    modalizeRef.current.close();
    IQKeyboardManager.setEnable(true);
  };

  const requestData = () =>
    dispatch(requestDropdownData(api, identifier, payload));

  useEffect(() => {
    if (!_.isEmpty(api)) {
      if (_.isEmpty(dropdown_data || freshData)) {
        requestData();
      }
    }
  }, [modalInfo]);

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: info => {
      IQKeyboardManager.setEnable(false);
      setSearchText('');
      setInfo(info);
      setImmediate(() => {
        modalizeRef.current.open();
      });
    },
    hide: () => {
      hideModal();
    },
  }));

  // render header
  const renderHeader = () => {
    const customStyle = modalInfo.hideSearch ? {} : styles.searchHeaderStyle;
    return (
      <View style={[styles.headerContainer, customStyle]}>
        <View>
          <Text style={styles.headerText}>{`${strings('app.select')} ${
            modalInfo.title
          }`}</Text>

          <ButtonView
            hitSlop={Metrics.hitSlop}
            onPress={hideModal}
            style={styles.cross}
          >
            <Image source={Images.icons.cross} />
          </ButtonView>
        </View>

        {modalInfo.hideSearch ? null : (
          <SearchInput
            style={styles.searchInput}
            onSearch={setSearchText}
            value={searchText}
          />
        )}
      </View>
    );
  };

  // render item
  const renderItem = ({ item }) => {
    const { idKey, titleKey, selectedItem, customItem } = modalInfo;
    const isSelected =
      !Util.isEmpty(selectedItem) && selectedItem[idKey] === item[idKey];

    return (
      <Item
        titleKey={titleKey}
        selected={isSelected}
        customItem={customItem}
        data={item}
        onPress={data => {
          hideModal();
          const { onItemSelected } = modalInfo;
          if (onItemSelected) {
            onItemSelected(item);
          }
        }}
      />
    );
  };

  const dataArray = _.isEmpty(modalInfo.data) ? dropdown_data : modalInfo.data;

  const dataList =
    searchText === ''
      ? dataArray
      : _.filter(dataArray, item =>
          item[modalInfo.titleKey]
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );

  const renderEmptyView = () => {
    if (failure) {
      return (
        <ErrorViewApi
          containerStyle={{ marginTop: Metrics.screenHeight / 3.2 }}
          onPressRetry={requestData}
          errorMessage={errorMessage}
        />
      );
    } else if (loading) {
      return (
        <LoaderViewApi style={{ marginTop: Metrics.screenHeight / 3.2 }} />
      );
    } else {
      return null;
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      modalTopOffset={10}
      HeaderComponent={renderHeader}
      handlePosition="inside"
      modalStyle={styles.modalStyle}
      handleStyle={styles.handle}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled', bounces: false }}
    >
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyView}
        style={[styles.flatlist]}
        keyExtractor={(_, index) => index.toString()}
        data={dataList}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
      />
    </Modalize>
  );
};
export default React.forwardRef(DropDown);

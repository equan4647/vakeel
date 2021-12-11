import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import {
  Text,
  ButtonView,
  Image,
  EmptyViewApi,
  ErrorViewApi,
  LoaderViewApi,
} from '../../components';
import { Images, AppStyles } from '../../theme';
import { HorizontalTitle } from '../../common';
import styles from './styles';
import _ from 'lodash';
import { getDropdownData } from '../../ducks/dropdown/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { requestDropdownData } from '../../ducks/dropdown/actions';

const MultiSelectionCheckbox = props => {
  // get value from props
  const {
    title,
    data,
    value,
    idKey,
    titleKey,
    onSelectionChange,
    identifier,
    api,
    payload,
  } = props;

  const { loading, failure, errorMessage } = useSelector(
      getRequestFlag(`DROPDOWN_DATA_${identifier}`)
    ),
    dropdown_data = useSelector(getDropdownData(identifier)),
    dataList = _.isEmpty(data) ? dropdown_data : data;

  const onPressItem = item => {
    if (value.includes(item[idKey])) {
      // remove item
      const newValue = [...value];
      const index = newValue.indexOf(item[idKey]);
      newValue.splice(index, 1);
      if (onSelectionChange) {
        onSelectionChange(newValue);
      }
    } else {
      // add item
      const newValue = [...value, item[idKey]];
      if (onSelectionChange) {
        onSelectionChange(newValue);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = value.includes(item[idKey]);
    return (
      <ButtonView
        style={styles.item}
        onPress={() => {
          onPressItem(item);
        }}
      >
        <Text size="size_17" style={styles.itemTitle}>
          {item[titleKey]}
        </Text>
        {isSelected ? <Image source={Images.icons.selected} /> : null}
      </ButtonView>
    );
  };

  const dispatch = useDispatch();
  const requestData = () =>
    dispatch(requestDropdownData(api, identifier, payload));

  const ListEmptyComponent = () => {
    if (failure) {
      return (
        <ErrorViewApi
          containerStyle={styles.exceptionView}
          onPressRetry={requestData}
          errorMessage={errorMessage}
        />
      );
    } else if (loading) {
      return <LoaderViewApi styles={styles.exceptionView} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!_.isEmpty(api) && _.isEmpty(dropdown_data)) {
      requestData();
    }
  }, [dispatch]);

  return (
    <>
      <HorizontalTitle
        title={title}
        containerStyle={[AppStyles.horizontalTitle, styles.title]}
      />
      <FlatList
        data={dataList}
        {...{ renderItem, ListEmptyComponent }}
        keyExtractor={item => item[idKey]}
        extraData={value}
      />
    </>
  );
};

MultiSelectionCheckbox.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.array,
  idKey: PropTypes.string,
  titleKey: PropTypes.string,
  onSelectionChange: PropTypes.func,
  payload: PropTypes.object,
  identifier: PropTypes.string,
  api: PropTypes.string,
};
MultiSelectionCheckbox.defaultProps = {
  title: '',
  data: [],
  value: [],
  idKey: 'id',
  titleKey: 'title',
  onSelectionChange: undefined,
  payload: {},
};

export default MultiSelectionCheckbox;

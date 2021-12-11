import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard } from 'react-native';

import { DataHandler } from '../../utils';
import { TextInput } from '..';

const SelectionInput = props => {
  const {
    title,
    data,
    idKey,
    titleKey,
    hideSearch,
    customItem,
    api,
    identifier,
    payload,
    freshData,
    disabled,
    ...rest
  } = props;

  return (
    <TextInput
      {...rest}
      title={title}
      dropdownKey={titleKey}
      disablePress={disabled}
      onPress={(onItemSelected, selectedItem) => {
        Keyboard.dismiss();
        DataHandler.getDropDownModalRef().show({
          onItemSelected,
          data,
          idKey,
          titleKey,
          selectedItem,
          title,
          hideSearch,
          customItem,
          api,
          identifier,
          payload,
          freshData,
        });
      }}
    />
  );
};

SelectionInput.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  idKey: PropTypes.string,
  titleKey: PropTypes.string,
  hideSearch: PropTypes.bool,
  customItem: PropTypes.func,
  api: PropTypes.object,
  identifier: PropTypes.string,
  payload: PropTypes.object,
  freshData: PropTypes.bool,
  disabled: PropTypes.bool,
};
SelectionInput.defaultProps = {
  data: [],
  idKey: 'id',
  titleKey: 'title',
  hideSearch: false,
  customItem: undefined,
  freshData: false,
  disabled: false,
};

export default SelectionInput;

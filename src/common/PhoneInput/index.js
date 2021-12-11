import { Controller } from 'react-hook-form';
import { Image, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text } from '../../components';
import { countriesCodeData } from '../../data';
import { Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import { DataHandler } from '../../utils';
import { TextInput } from '..';
import styles from './styles';

const PhoneInput = props => {
  const { countryCode, editable, ...rest } = props;

  const renderLeft = () => {
    return (
      <Controller
        control={props.control}
        name="country_code"
        render={({ onChange, value }) => (
          <ButtonView
            disabled={!editable}
            style={styles.leftContainer}
            onPress={() => {
              Keyboard.dismiss();
              DataHandler.getDropDownModalRef().show({
                onItemSelected: onChange,
                data: countriesCodeData,
                idKey: 'code',
                titleKey: 'name',
                customItem: data => (
                  <Text
                    lineHeight={Metrics.ratio(16)}
                    size="size_17"
                  >{`${data.name} (${data.dial_code})`}</Text>
                ),
                selectedItem: value,
                title: strings('app.country_code'),
              });
            }}
          >
            <Text type="semiBold">{value?.dial_code ?? ''}</Text>
            <Image source={Images.icons.arrowDown} style={styles.arrowImage} />
          </ButtonView>
        )}
        defaultValue={countryCode}
      />
    );
  };

  return (
    <TextInput
      {...rest}
      {...{ editable, renderLeft }}
      maxLength={10}
      keyboardType="number-pad"
    />
  );
};

PhoneInput.propTypes = {
  countryCode: PropTypes.object,
  editable: PropTypes.bool,
};
PhoneInput.defaultProps = {
  countryCode: { dial_code: '+1', name: 'United States' },
  editable: true,
};

export default PhoneInput;

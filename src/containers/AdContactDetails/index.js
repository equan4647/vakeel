import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Image, Keyboard } from 'react-native';
import React from 'react';

import { TextInput, PhoneInput, FormContainer } from '../../common';
import { DataHandler, NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { Images } from '../../theme';
import styles from './styles';

export default ({ navigation }) => {
  // set header
  NavigationService.setTitle(navigation, strings('app.contact_details'));

  const advertisingInfo = DataHandler.getAdvertisingInfo();

  // init values
  const initialValues = {
    web_url: advertisingInfo.ref_url,
    phone: advertisingInfo.phone_number,
    country_code: {
      dial_code: advertisingInfo.country_code ?? '+1',
      code: advertisingInfo.country_dial_code ?? 'US',
    },
    address:
      advertisingInfo.address && advertisingInfo.lat && advertisingInfo.long
        ? { formattedAddress: advertisingInfo.address }
        : '',
  };

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.contactDetails),
    defaultValues: initialValues,
  });
  const addressProps = useInputProps(formObj, 'address');
  const webUrlProps = useInputProps(formObj, 'web_url');
  const phoneNumberProps = useInputProps(formObj, 'phone');

  const onSubmit = data => {
    const ref_url = data.web_url;
    const phone_number = data.phone;
    const country_code = data.country_code.code;
    const country_dial_code = data.country_code.dial_code;

    DataHandler.setAdvertisingInfo({
      ref_url,
      phone_number,
      country_code,
      country_dial_code,
    });

    Keyboard.dismiss();
    NavigationService.navigate('UploadAdPhoto');
  };

  //submit
  const submit = formObj.handleSubmit(onSubmit);

  const renderArrowDown = () => (
    <Image source={Images.icons.arrowDown} style={styles.arrowDown} />
  );

  return (
    <>
      <FormContainer buttonText={strings('app.next')} buttonPress={submit}>
        {/* <TextInput
          title={strings('app.address')}
          nextFocusRef={webUrlProps.forwardRef}
          {...addressProps}
          required
        /> */}
        <TextInput
          title={strings('app.address')}
          renderRight={renderArrowDown}
          multiline
          required
          setMultlineStyle={false}
          // onSubmit={submit}
          //editable={false}
          dropdownKey="formattedAddress"
          onPress={onSelect =>
            NavigationService.navigate('LocationSearch', {
              onSelect: locationSelected => {
                onSelect(locationSelected);
                DataHandler.setAdvertisingInfo({
                  address: locationSelected.formattedAddress,
                  lat: locationSelected.lat,
                  long: locationSelected.lng,
                });
              },
            })
          }
          {...addressProps}
        />
        <TextInput
          title={strings('app.web_url')}
          nextFocusRef={phoneNumberProps.forwardRef}
          keyboardType="url"
          {...webUrlProps}
          required
        />

        <PhoneInput
          title={strings('app.phone')}
          onSubmit={submit}
          {...phoneNumberProps}
          required
        />
      </FormContainer>
    </>
  );
};

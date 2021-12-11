import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import {
  TextInput,
  BottomButton,
  CurrentLocationButton,
  SwitchComponent,
} from '../../common';
import { ValidationUtil, NavigationService, Util } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { adressActions } from '../../ducks/addresses';
import { Loader } from '../../components';
import { AddressUtil } from '../../DataUtils';

function getData(data) {
  return {
    label: AddressUtil.label(data),
    country: AddressUtil.country(data),
    state: AddressUtil.state(data),
    city: AddressUtil.city(data),
    zip_code: AddressUtil.zipCode(data),
    address_detail: AddressUtil.addressDetail(data),
    note_to_rider: AddressUtil.noteToRider(data),
    is_default: AddressUtil.isDefault(data) ?? false,
  };
}

export default ({ navigation, route }) => {
  const data = route.params?.data;

  const dispatch = useDispatch();

  NavigationService.setHeader(
    navigation,
    !data ? strings('app.add_address') : strings('app.edit_address')
  );

  const selectedLocation = Util.isEmpty(data)
    ? {}
    : {
        formattedAddress: data?.address ?? '',
        lat: data?.lat ?? 0,
        lng: data?.lng ?? 0,
      };
  const [location, setLocation] = useState(selectedLocation);

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.address),
    defaultValues: getData(data),
  });

  const countryProps = useInputProps(formObj, 'country'),
    cityProps = useInputProps(formObj, 'city'),
    stateProps = useInputProps(formObj, 'state'),
    zipProps = useInputProps(formObj, 'zip_code'),
    addressDetailProps = useInputProps(formObj, 'address_detail'),
    noteToRiderProps = useInputProps(formObj, 'note_to_rider'),
    isDefaultProps = useInputProps(formObj, 'is_default'),
    labelProps = useInputProps(formObj, 'label');

  //submit
  const submit = formObj.handleSubmit(values => {
    const payload = {
      lat: location?.lat ?? AddressUtil.lat(data),
      lng: location?.lng ?? AddressUtil.lng(data),
      address: location?.formattedAddress ?? AddressUtil.address(data),
      ...values,
    };

    payload.is_default = values.is_default == 'true' ? 1 : 0;

    if (data) {
      payload.id = AddressUtil.id(data);
      dispatch(adressActions.requestUpdateAddress(payload));
    } else {
      dispatch(adressActions.requestAddAddress(payload));
    }
  });

  const onPressLocationButton = () => {
    NavigationService.navigate('CurrentLocationMap', {
      location,
      onSave: info => {
        setLocation(info);
        const formattedObj = Util.alterObjKeys(info, {
          formattedAddress: 'address',
        });

        setTimeout(() => {
          for (let key in formattedObj) {
            formObj.setValue(key, formattedObj[key]);
          }
          NavigationService.pop();
        }, 50);
      },
    });
  };

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CurrentLocationButton
          title={strings('app.set_location_on_map')}
          onPress={onPressLocationButton}
          location={
            location?.formattedAddress ??
            (AddressUtil.address(data) || strings('app.select_location'))
          }
        />

        {Util.isNotEmpty(location) && (
          <>
            <TextInput
              title={strings('app.label')}
              required
              {...labelProps}
              nextFocusRef={zipProps.forwardRef}
            />

            <TextInput
              title={strings('app.country')}
              required
              editable={false}
              {...countryProps}
            />

            <TextInput
              title={strings('app.state')}
              required
              editable={false}
              {...stateProps}
            />

            <TextInput
              title={strings('app.city')}
              required
              editable={false}
              {...cityProps}
            />

            <TextInput
              title={strings('app.zip_code')}
              maxLength={5}
              keyboardType="numeric"
              {...zipProps}
              nextFocusRef={addressDetailProps.forwardRef}
            />
            <TextInput
              title={strings('app.address_detail')}
              {...addressDetailProps}
              multiline
              customPlaceholder={strings('app.address_detail_placeholder')}
            />

            <TextInput
              title={strings('app.note_to_rider')}
              multiline
              {...noteToRiderProps}
            />

            <SwitchComponent
              {...isDefaultProps}
              title={strings('app.default_address')}
            />
          </>
        )}
      </ScrollView>

      <BottomButton
        title={strings('app.save')}
        onPress={submit}
        disabled={Util.isEmpty(location)}
      />

      <Loader type={['ADD_ADDRESS', 'UPDATE_ADDRESS']} />
    </>
  );
};

import { yupResolver } from '@hookform/resolvers/yup';
import { Image, View } from 'react-native';
import { useForm } from 'react-hook-form';
import React from 'react';

import { NavigationService, ValidationUtil, DataHandler } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { BottomButton, TextInput } from '../../common';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const ConfirmLocation = ({ navigation }) => {
  NavigationService.setTitle(navigation, strings('app.confirm_location'));

  const classifiedInfo = DataHandler.getClassifiedAddInfo();

  const initialValues = {
    location:
      classifiedInfo.address &&
      classifiedInfo.latitude &&
      classifiedInfo.longitude
        ? { formattedAddress: classifiedInfo.address }
        : '',
  };
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.confirmLocation),
    defaultValues: initialValues,
  });

  const locationProps = useInputProps(formObj, 'location');
  //submit
  const submit = formObj.handleSubmit(values => {
    NavigationService.navigate('ReviewDetails');
  });

  const renderArrowDown = () => (
    <Image source={Images.icons.arrowDown} style={styles.arrowDown} />
  );

  return (
    <>
      <View style={AppStyles.container}>
        <TextInput
          title={strings('app.location')}
          renderRight={renderArrowDown}
          onSubmit={submit}
          //editable={false}
          multiline
          setMultlineStyle={false}
          dropdownKey="formattedAddress"
          onPress={onSelect =>
            NavigationService.navigate('LocationSearch', {
              onSelect: locationSelected => {
                if (locationSelected.areaAddress) {
                  locationSelected.formattedAddress =
                    locationSelected.areaAddress;
                }
                onSelect(locationSelected);
                DataHandler.setClassifiedAdInfo({
                  address: locationSelected.formattedAddress,
                  latitude: locationSelected.lat,
                  longitude: locationSelected.lng,
                });
              },
            })
          }
          {...locationProps}
        />
      </View>
      <BottomButton onPress={submit} />
    </>
  );
};
export default ConfirmLocation;

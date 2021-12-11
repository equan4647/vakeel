import { useForm } from 'react-hook-form';
import React from 'react';
import _ from 'lodash';

import {
  TextInput,
  SelectionInput,
  FormContainer,
  VehicleItem,
} from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { NavigationService, Util } from '../../utils';
import PickupAndDropOff from './PickupAndDropOff';
import { strings } from '../../utils/i18n';

import { Loader, Text } from '../../components';
import { AppStyles } from '../../theme';
//import VehicleItem from './VehicleItem';
import styles from './styles';
import { API_GET_VEHICLES } from '../../config/WebService';
import { VEHICLES } from '../../config/Constants';
import { useDispatch } from 'react-redux';
import {
  requestCreateDelivery,
  updateDeliveryInfo,
} from '../../ducks/delivery/actions';

const AddDelivery = ({ navigation, route }) => {
  //dispatch
  const dispatch = useDispatch();

  // set header
  const onClose = () => {
    navigation.goBack();
    dispatch(updateDeliveryInfo());
  };
  NavigationService.setCrossBackHeader(navigation, '', onClose);

  // set form
  const formObj = useForm({ defaultValues: { details: '', vehicle: {} } });
  const detailsProps = useInputProps(formObj, 'details');
  const vehicleProps = useInputProps(formObj, 'vehicle');
  const { details, vehicle } = formObj.watch(['details', 'vehicle']);

  // set state
  const [pickUpLocation, setPickUpLocation] = React.useState({});
  const [dropOffLocation, setDropOffLocation] = React.useState({});

  // check button is disable and have all form inputs
  const isButtonDisable =
    _.isEmpty(pickUpLocation) ||
    _.isEmpty(dropOffLocation) ||
    details.trim() === '' ||
    Util.isEmpty(vehicle);

  // render text
  const renderText = text => <Text style={styles.text}>{text}</Text>;

  // on submit button
  const onSubmit = () => {
    // info
    const info = {
      pickup: pickUpLocation,
      dropOff: dropOffLocation,
      packageDetails: details.trim(),
      vehicle: vehicle,
      // deliveryCharges: '78.96',
    };
    const payload = {
      origin_lat: pickUpLocation.lat,
      origin_long: pickUpLocation.lng,
      dest_lat: dropOffLocation.lat,
      dest_long: dropOffLocation.lng,
      vehicle_type: vehicle.type,
    };

    const onSuccess = () =>
      NavigationService.navigate('AddDeliveryConfirmation', { info });
    dispatch(requestCreateDelivery(payload, onSuccess));
  };

  // main render
  return (
    <FormContainer
      style={AppStyles.container}
      buttonText={`${strings('app.continue')}`}
      buttonPress={onSubmit}
      isButtonDisabled={isButtonDisable}
    >
      {renderText(strings('app.where_to_send_and_recieve'))}
      <PickupAndDropOff
        {...{ pickUpLocation, dropOffLocation }}
        onPickUpSelected={setPickUpLocation}
        onDropOffSelected={setDropOffLocation}
      />

      {renderText(strings('app.package_details'))}
      <TextInput
        title={''}
        placeholder={strings('app.package_details_placeholder')}
        multiline
        showTitle={false}
        {...detailsProps}
        maxLength={700}
      />

      {renderText(strings('app.select_vehicle'))}
      <SelectionInput
        title={strings('app.vehicle')}
        // data={vehiclesData}
        idKey="_id"
        titleKey="type"
        payload={{}}
        identifier={VEHICLES}
        api={API_GET_VEHICLES}
        hideSearch
        required
        showTitle={false}
        customItem={data => <VehicleItem {...{ data }} />}
        {...vehicleProps}
      />

      <Loader type="CREATE_DELIVERY" />
    </FormContainer>
  );
};

export default AddDelivery;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  ID,
  FormContainer,
  PickAndDropLocation,
  PackageDetails,
  DisplayPaymentMethod,
  FeeContainer,
  DeliveryMethod,
  AdAuthor,
  Separator,
  RateBringer,
} from '../../common';
import { IDENTIFIERS, ID_TYPE, ORDER_STATUS } from '../../config/Constants';
import { DeliveryRoomHelper, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { getDeliveryHistoryItem } from '../../ducks/deliveryHistory/selectors';
import { DeliveryUtil } from '../../DataUtils';
import {
  requestAddDeliveryRating,
  requestReportDeliveryOrder,
} from '../../ducks/delivery/actions';
import { Loader } from '../../components';
import {
  API_ADD_DELIVERY_RATING,
  API_GET_DELIVERY_REPORT_TYPES,
  API_UPDATE_DELIVERY_RATING,
} from '../../config/WebService';
import ReviewUtil from '../../DataUtils/ReviewUtil';
import { Metrics } from '../../theme';

const DeliveryDetails = ({ navigation, route }) => {
  // get data
  const id = route?.params?.id ?? '',
    data = useSelector(getDeliveryHistoryItem(id)),
    status = Util.getStatus(data),
    isCompleted = status === ORDER_STATUS.DELIVERED,
    inProgress = status === ORDER_STATUS.IN_PROGRESS;

  const dispatch = useDispatch();

  const onSubmitting = ({ type, description }) =>
    dispatch(
      requestReportDeliveryOrder({
        problem_type: type?.type,
        problem_description: description,
        order_id: id,
      })
    );

  const onPressReport = () => {
    NavigationService.navigate('Report', {
      title: strings('app.report_a_problem'),
      reportTypeUrl: API_GET_DELIVERY_REPORT_TYPES,
      onSubmitting,
      identifier: IDENTIFIERS.REPORT_TYPE_DELIVERY,
      idKey: '_id',
      titleKey: 'type',
    });
  };

  const Options = { [strings('app.report_a_problem')]: onPressReport };

  NavigationService.setOptionsHeader(
    navigation,
    '',
    isCompleted ? Options : undefined,
    0,
    [isCompleted]
  );

  const onViewDeliveryPress = () =>
    NavigationService.navigate('ViewCurrentDelivery');

  const submitRating = values => {
    const payload = {
      rating: values.rating,
      review: values.description,
      driver_id: DeliveryUtil.driverID(data),
      order_id: DeliveryUtil.id(data),
      id: ReviewUtil.getId(DeliveryUtil.ratingObj(data)),
    };

    const url = DeliveryUtil.isReviewed(data)
      ? API_UPDATE_DELIVERY_RATING
      : API_ADD_DELIVERY_RATING;

    dispatch(requestAddDeliveryRating(payload, NavigationService.goBack, url));
  };

  return (
    <FormContainer
      buttonText={strings('app.view_delivery')}
      buttonPress={
        inProgress ? DeliveryRoomHelper.viewOngoingDelivery : undefined
      }
    >
      <Separator style={styles.topSeparator} />

      <ID
        id={DeliveryUtil.id(data)}
        time={Util.getFullDateTime(DeliveryUtil.updatedAt(data, false))}
        idType={ID_TYPE.DELIVERY}
        status={Util.getStatus(data)}
        style={styles.serviceIdContainer}
      />

      <PickAndDropLocation
        pickAddress={DeliveryUtil.orderPickupAddress(data)}
        dropAddress={DeliveryUtil.orderDropoffAddress(data)}
        viewableOnly
        style={styles.pickAndDrop}
      />

      <PackageDetails
        details={DeliveryUtil.packageDetail(data)}
        style={{ marginBottom: Metrics.ratio(15) }}
      />

      <DisplayPaymentMethod
        cardInfo={DeliveryUtil.cardInfo(data)}
        isCardCharged={DeliveryUtil.isCardCharged(data) || inProgress}
        isWalletCharged={DeliveryUtil.isWalletCharged(data)}
        editable={false}
      />

      <FeeContainer
        text={strings('app.delivery_charges')}
        price={DeliveryUtil.amountToCharge(data, true)}
      />

      <DeliveryMethod
        style={styles.delMethod}
        data={DeliveryUtil.vehicleTypeSelected(data)}
        vehicleNumber={DeliveryUtil.vehicleRegNum(data)}
      />

      <AdAuthor
        data={DeliveryUtil.driverInfo(data)}
        title={strings('app.bringer')}
        hasRightArrow={false}
        containerStyle={styles.bringer}
        rating
      />

      {isCompleted ? (
        <RateBringer
          isReviewed={DeliveryUtil.isReviewed(data)}
          rating={DeliveryUtil.ratingGiven(data)}
          reviewScreenParams={{
            submitRating,
            reviewData: DeliveryUtil.ratingObj(data),
          }}
          style={styles.rateBringer}
        />
      ) : (
        <Separator style={styles.bottomSeparator} />
      )}

      <Loader type={['ADD_DELIVERY_RATING', 'REPORT_DELIVERY_ORDER']} />
    </FormContainer>
  );
};

export default DeliveryDetails;

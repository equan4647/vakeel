import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TitleDescription,
  AdAuthor,
  DisplayAddress,
  ID,
  RateBringer,
  FormContainer,
  PackageDetails,
  FeeContainer,
} from '../../common';
import {
  SERVICE_ITEM_TYPE,
  ID_TYPE,
  IDENTIFIERS,
  BOOKING_CANCELATION_TIME,
} from '../../config/Constants';
import { AppUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { ServiceBookingUtil, ServicesUtil } from '../../DataUtils';
import { servicesActions } from '../../ducks/services';
import { serviceHistoryActions } from '../../ducks/serviceHistory';
import {
  API_ADD_SERVICE_REVIEW,
  API_SERVICE_REPORT_TYPE,
  API_UPDATE_SERVICE_REVIEW,
} from '../../config/WebService';
import { requestAddServiceRating } from '../../ducks/serviceHistory/actions';
import { getServiceHistoryItem } from '../../ducks/serviceHistory/selectors';
import { Loader, ScrollViewApi } from '../../components';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const ServiceBookingDetails = ({ navigation, route }) => {
  const booking_id = route?.params?.booking_id ?? '';
  console.log('params.booking_id', booking_id);
  const booking_details = useSelector(getServiceHistoryItem(booking_id));

  console.log('booking_details', booking_details);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_BOOKING_${booking_id}`)
  );

  const booking_status = booking_details?.status;

  const isCompleted = booking_status === SERVICE_ITEM_TYPE.COMPLETED;

  const dispatch = useDispatch();

  const serviceItem = booking_details?.service_obj;

  const bookingDateObj = booking_details;

  const address = ServiceBookingUtil.address(booking_details);

  const isReviewed = ServiceBookingUtil.isReviewed(booking_details);

  const bookingDate = bookingDateObj.booked_date;
  const bookingTime = bookingDateObj.start_time;

  const hours = AppUtil.getBookingHrsDiffFromNow(bookingDate, bookingTime);

  const currentTime = Date.parse(new Date());

  const bookTime = Date.parse(
    AppUtil.parseBookingDateTime(bookingDate, bookingTime)
  );

  const enableBtn = currentTime > bookTime;
  // const enableBtn = hours < BOOKING_ENABLED_TIME;

  const enableCancelation = hours > BOOKING_CANCELATION_TIME;

  const onSubmitting = values => {
    const type = values?.type?.id ?? 0;
    const description = values?.description ?? '';
    const service_id = ServicesUtil.id(serviceItem);
    const vendor_id = ServicesUtil.getVendorId(serviceItem);
    const payload = { type, description, service_id, booking_id, vendor_id };
    console.log('requestReportService', payload);
    dispatch(servicesActions.requestReportService(payload));

    //console.log(values);
    //NavigationService.goBack();
  };

  const onPressReport = () => {
    NavigationService.navigate('Report', {
      title: strings('app.report_a_problem'),
      reportTypeUrl: API_SERVICE_REPORT_TYPE,
      onSubmitting,
      identifier: IDENTIFIERS.REPORT_TYPE_SERVICES,
      idKey: '_id',
      titleKey: 'type',
    });
  };

  const onPressCancelOrder = () => {
    const status = 'CANCELLED_BY_CUSTOMER';
    requestUpdateBooking(status, SERVICE_ITEM_TYPE.CANCELLED);
    NavigationService.pop();
  };

  const CompletedOptions = {
    [strings('app.report_a_problem')]: onPressReport,
  };

  const PendingOptions = {
    [strings('app.report_a_problem')]: onPressReport,
    [strings('app.cancel_order')]: onPressCancelOrder,
  };

  const getOptions = () => {
    const { status } = booking_details;
    let options;
    if (status === SERVICE_ITEM_TYPE.COMPLETED) {
      options = CompletedOptions;
    } else if (status === SERVICE_ITEM_TYPE.PENDING) {
      !enableCancelation
        ? delete PendingOptions[strings('app.cancel_order')]
        : delete PendingOptions[strings('app.report_a_problem')];
      options = PendingOptions;
    } else {
      options = CompletedOptions;
    }
    return options;
  };

  NavigationService.setOptionsHeader(
    navigation,
    strings('app.booking_details'),
    getOptions(),
    0,
    [isCompleted]
  );

  const onDonePress = () => {
    const status = 'COMPLETED';
    requestUpdateBooking(status, SERVICE_ITEM_TYPE.COMPLETED);
  };

  const requestUpdateBooking = (status, identifier) => {
    const payload = { id: booking_details._id, status };
    dispatch(serviceHistoryActions.requestUpdateBooking(payload, identifier));
  };

  const submitRating = values => {
    let payload = {
      service_id: ServiceBookingUtil.getServiceId(serviceItem),
      rating: values.rating,
      review: values.description,
      order_id: ServiceBookingUtil.getId(booking_details),
    };
    if (isReviewed) {
      payload = {
        ...payload,
        id: ServiceBookingUtil.reviewId(booking_details),
      };
    }

    const url = isReviewed ? API_UPDATE_SERVICE_REVIEW : API_ADD_SERVICE_REVIEW;

    dispatch(requestAddServiceRating(payload, url));
  };

  const renderContent = () => {
    return (
      <>
        <ID
          rating={ServiceBookingUtil.rating(booking_details)}
          id={ServicesUtil.id(serviceItem)}
          idType={ID_TYPE.SERVICE}
          status={booking_status}
          style={styles.serviceIdContainer}
          data={booking_details}
          reviewButtonProps={{
            isUpdate: ServiceBookingUtil.isReviewed(booking_details),
          }}
          // showRating={ServiceBookingUtil.isReviewed(booking_details)}
        />
        <TitleDescription
          titleTextStyle={styles.serviceName}
          title={ServicesUtil.title(serviceItem)}
          // subText="24 Nov, 2021, 7:00 - 8:00 PM"
          subText={AppUtil.formatedBookingTime(bookingDateObj)}
        />
        <PackageDetails
          details={ServicesUtil.description(serviceItem)}
          title={strings('app.service_details')}
        />
        <AdAuthor
          data={ServicesUtil.getVendor(serviceItem)}
          title="Boomin User"
          onPress={() =>
            NavigationService.navigate('Publisher', {
              vendor: ServicesUtil.getVendor(serviceItem),
            })
          }
        />
        <DisplayAddress
          title={strings('app.address')}
          data={address}
          style={styles.address}
        />
        <FeeContainer
          text={strings('app.servie_fee')}
          price={AppUtil.formatPrice(ServicesUtil.price(serviceItem))}
        />

        {isCompleted ? (
          <RateBringer
            isReviewed={isReviewed}
            rating={ServiceBookingUtil.rating(booking_details)}
            reviewScreenParams={{
              submitRating,
              reviewData: ServiceBookingUtil.reviewData(booking_details),
            }}
          />
        ) : null}
      </>
    );
  };

  return (
    <FormContainer
      isButtonDisabled={!enableBtn}
      buttonText={strings('app.mark_as_done')}
      buttonPress={
        booking_status === SERVICE_ITEM_TYPE.PENDING ? onDonePress : undefined
      }
    >
      <ScrollViewApi
        identifier={booking_id}
        requestFlags={requestFlags}
        data={booking_details}
        payload={{ id: booking_id }}
        showsVerticalScrollIndicator={false}
        requestAction={serviceHistoryActions.requestGetBooking}
        content={renderContent}
      />

      <Loader type={['UPDATE_BOOKING_COMPLETED', 'UPDATE_BOOKING_CANCELLED']} />
    </FormContainer>
  );
};

export default ServiceBookingDetails;

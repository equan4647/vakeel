import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';

import {
  HorizontalTitle,
  ID,
  Separator,
  OrderStepper,
  FoodBringerInfo,
  AmountRow,
  DisplayAddress,
  DisplayPaymentMethod,
  FoodOrderSubItemList,
  HeaderBackImage,
  HeaderRightImage,
  RateBringer,
} from '../../common';
import { FoodOrderUtil, FoodUtil } from '../../DataUtils';
import { ButtonView, ScrollViewApi, Text } from '../../components';
import useFoodOrderStepperInfo from '../../DataUtils/FoodOrderUtil';
import { foodOrdersActions, foodOrdersSelectors } from '../../ducks/foodOrders';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { AppStyles, Images, Metrics } from '../../theme';
import { AppUtil, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import {
  API_GET_DELIVERY_REPORT_TYPES,
  API_RESTAURANT_REPORT_TYPE,
} from '../../config/WebService';
import { IDENTIFIERS } from '../../config/Constants';
import { requestReportDeliveryOrder } from '../../ducks/delivery/actions';
import { requestReportFoodOrder } from '../../ducks/foodOrders/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useFoodOrderRating } from '../../utils/CustomHooks';

const CallOption = React.memo(({ number }) => (
  <View style={styles.callOption}>
    <Text size="size_16">{number}</Text>

    <ButtonView hitSlop={Metrics.hitSlop} onPress={() => AppUtil.call(number)}>
      <Text size="size_14" type="bold">
        {strings('app.call_now').toUpperCase()}
      </Text>
    </ButtonView>
  </View>
));

const FoodOrderDetail = props => {
  const { navigation, route } = props,
    isCross = route.params?.showCross ?? false,
    isHistory = route.params?.isHistory ?? true,
    id = route.params?.id ?? '',
    data = useSelector(
      Util.isEmpty(id)
        ? foodOrdersSelectors.getOrderInProgress
        : foodOrdersSelectors.getOrderItem(id)
    ),
    stepperInfo = useFoodOrderStepperInfo(data);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_FOOD_ORDER_${id}`)
  );

  const time = Util.isStatusDelivered(data)
    ? FoodUtil.foodOrderDateUpdated(data)
    : FoodUtil.foodOrderDateCreated(data);

  const dispatch = useDispatch();

  const onSubmitBringerReport = ({ type, description }) =>
    dispatch(
      requestReportDeliveryOrder({
        problem_type: type?.type,
        problem_description: description,
        order_id: id,
      })
    );

  const onSubmitRestaurantReport = ({ type, description }) =>
    dispatch(
      requestReportFoodOrder({
        problem_type: type?.type,
        problem_description: description,
        order_id: id,
      })
    );

  const reviewFoodOrder = useFoodOrderRating(data);

  const onReport = (title, url, identifier, onSubmitting) =>
    NavigationService.navigate('Report', {
      title,
      reportTypeUrl: url,
      onSubmitting,
      identifier,
      idKey: '_id',
      titleKey: 'type',
    });

  const onReportRestaurant = () =>
    onReport(
      strings('app.report_a_restaurant'),
      API_RESTAURANT_REPORT_TYPE,
      IDENTIFIERS.REPORT_TYPE_RESTAURANTS,
      onSubmitRestaurantReport
    );

  const onReportBringer = () =>
    onReport(
      strings('app.report_a_bringer'),
      API_GET_DELIVERY_REPORT_TYPES,
      IDENTIFIERS.REPORT_TYPE_DELIVERY,
      onSubmitBringerReport
    );

  const getMenuOptions = () => {
    let options = {
      [strings('app.report_a_restaurant')]: onReportRestaurant,
      [strings('app.report_a_bringer')]: onReportBringer,
    };
    if (!FoodUtil.isBringerEnabled(data)) {
      delete options[strings('app.report_a_bringer')];
    }
    return options;
  };

  const headerLeft = () => (
      <ButtonView
        onPress={() =>
          isHistory
            ? NavigationService.pop()
            : NavigationService.navigate('FoodTabHome')
        }
        hitSlop={Metrics.hitSlop}
      >
        <HeaderBackImage {...{ isCross }} />
      </ButtonView>
    ),
    headerRight = () =>
      Util.isStatusDelivered(data) ? (
        <HeaderRightImage
          img={Images.icons.more}
          onPress={() => Util.showMoreOptions(getMenuOptions())}
        />
      ) : null;

  useLayoutEffect(() => {
    navigation.setOptions({ title: '', headerLeft, headerRight });
  }, [navigation, isCross, Util.getStatus(data)]);

  useBackHandler(() => {
    if (!isHistory) {
      NavigationService.navigate('FoodTabHome');
      return true;
    }
    // let the default thing happen
    return false;
  });

  const displayStepper =
      !isHistory &&
      (Util.isStatusInProgress(data) || Util.isStatusDelivered(data)),
    status =
      isHistory || Util.isStatusCancelled(data) ? Util.getStatus(data) : null;

  const displayCallOption = displayStepper && !FoodUtil.isBringerEnabled(data);
  console.log(FoodOrderUtil.getRatingData(data), 'dsfgdsfsdfdsfdsf');
  const renderContent = () => {
    return (
      <>
        {displayStepper && <OrderStepper {...stepperInfo} />}

        {displayCallOption && <CallOption number={FoodUtil.getContact(data)} />}

        <ID id={Util.getID(data)} {...{ time, status }} style={styles.id} />

        <Separator style={styles.barStyleTopBottom} />

        <DisplayAddress
          data={FoodUtil.getDropOffData(data)}
          title={strings('app.delivery_address')}
        />

        <FoodBringerInfo {...{ data }} style={styles.bringerInfo} />

        <DisplayPaymentMethod
          isCardCharged={Util.isCardCharged(data)}
          isWalletCharged={Util.isWalletCharged(data)}
          cardInfo={FoodUtil.getCardInfo(data)}
          editable={false}
        />

        <HorizontalTitle
          title={strings('app.itemsCaps')}
          bar
          containerStyle={styles.horizontalTitle}
          barStyle={styles.barStyleBottom}
        />

        <FoodOrderSubItemList
          data={FoodUtil.foodItems(data)}
          name={FoodUtil.getRestaurantName(data)}
        />

        <Separator style={styles.listSeparator} />

        <AmountRow
          title={strings('app.subtotal')}
          amount={FoodOrderUtil.getSubTotal(data)}
        />

        <AmountRow
          title={
            FoodUtil.isBringerEnabled(data)
              ? strings('app.bringer_charges')
              : strings('app.delivery')
          }
          amount={FoodOrderUtil.getDeliveryCharges(data)}
        />

        <Separator style={styles.listTotal} />

        <AmountRow
          title={strings('app.total')}
          amount={FoodOrderUtil.getDeliveryTotal(data)}
        />

        {isHistory && Util.isStatusDelivered(data) && (
          <RateBringer
            isReviewed={FoodOrderUtil.isRated(data)}
            rating={FoodOrderUtil.getRating(data)}
            onPressReviewButton={reviewFoodOrder}
          />
        )}
      </>
    );
  };
  if (isHistory) {
    return (
      <ScrollViewApi
        {...{ requestFlags, data }}
        identifier={id}
        payload={{ id }}
        checkDataEmpty
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainerStyle}
        requestAction={foodOrdersActions.requestGetOrder}
        content={renderContent}
      />
    );
  } else {
    return (
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {renderContent()}
      </ScrollView>
    );
  }
};

export default FoodOrderDetail;

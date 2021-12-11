import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { BottomButton, ConsultancyType, OrderStatusTag } from '../../../common';
import { COMMUNICATION_MEDIUM, COST_TYPE } from '../../../config/Constants';
import { NavigationService, Util } from '../../../utils';
import { ButtonView, Text } from '../../../components';
import { strings } from '../../../utils/i18n';
import { AppStyles } from '../../../theme';
import MessageTime from '../MessageTime';
import styles from './styles';

// TopicInfo
const TopicInfo = React.memo(({ topicName, time }) => (
  <View>
    <Text style={styles.topicName}>{topicName}</Text>
    <Text>{time}</Text>
  </View>
));

// Cost
const Cost = React.memo(({ costType, fee }) => (
  <View style={[AppStyles.spreadRowAligned, styles.cost]}>
    <Text type="semiBold" color="primary">
      {costType === COST_TYPE.FREE ? strings('app.free') : strings('app.paid')}
    </Text>

    {costType === COST_TYPE.PAID ? <Text type="bold">${fee}</Text> : null}
  </View>
));

// main
const InviteItem = props => {
  const { isMine, datetime, isRead, consultancyType } = props;
  return (
    <>
      <ButtonView
        style={StyleSheet.flatten([
          styles.container,
          isMine ? styles.alignRight : styles.alignLeft,
        ])}
        onPress={() =>
          NavigationService.navigate(
            'ConsultancyDetail',
            { viewableOnly: isMine, ProceedForPayment },
            'ConsultancyStack'
          )
        }
      >
        <View style={AppStyles.spreadRowStart}>
          <TopicInfo {...props} />
          {isMine && <OrderStatusTag status="scheduled" />}
        </View>

        <ConsultancyType type={consultancyType} />

        <Cost {...props} />
        <BottomButton
          onPressCancel={
            isMine
              ? undefined
              : () => {
                  Util.showAlertConfirm(
                    strings('messages.cancel_consultancy_title'),
                    strings('messages.cancel_consultancy_description'),
                    strings('app.yes'),
                    () => {}
                  );
                }
          }
          withContainer={false}
          title={isMine ? strings('app.edit') : strings('app.accept')}
          onPress={() => {
            isMine
              ? NavigationService.navigate(
                  'ScheduleConsultancy',
                  { isEdit: true },
                  'ConsultancyStack'
                )
              : ProceedForPayment(true);
          }}
        />
      </ButtonView>
      <MessageTime {...{ isMine, datetime, isRead }} />
    </>
  );
};

InviteItem.propTypes = {
  isMine: PropTypes.bool,
  costType: PropTypes.oneOf(Object.values(COST_TYPE)),
  fee: PropTypes.number,
  consultancyType: PropTypes.oneOf(Object.values(COMMUNICATION_MEDIUM)),
  status: PropTypes.string,
  topicName: PropTypes.string,
  time: PropTypes.string,
  datetime: PropTypes.string,
  isRead: PropTypes.bool,
};

InviteItem.defaultProps = {
  isMine: false,
  fee: 0,
  status: 'accepted',
  topicName: 'PropTypes.string',
  time: 'PropTypes.string',
};

export default InviteItem;
function ProceedForPayment(showCross) {
  NavigationService.navigate(
    'PaymentMethodStack',
    { screen: 'PaymentMethod', params: { onPayment, showCross } },
    'ConsultancyStack'
  );
}
function onPayment() {
  NavigationService.reset('ConsultancySuccess');
}

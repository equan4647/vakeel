import React from 'react';

import { OrderList, SegmentedControl } from '../../../common';
import styles from './styles';
import { strings } from '../../../utils/i18n';
import { IDENTIFIERS, ORDER_STATUS } from '../../../config/Constants';

const PendingOrders = () => (
  <OrderList
    identifier={[IDENTIFIERS.PENDING_ORDERS]}
    containerStyle={styles.listContainer}
    itemProps={{ showStatus: true }}
  />
);

const CompletedOrders = () => (
  <OrderList
    identifier={[IDENTIFIERS.DELIVERED_ORDERS, IDENTIFIERS.CANCELLED_ORDERS]}
    containerStyle={styles.listContainer}
    itemProps={{ showStatus: true }}
  />
);

const scenes = {
  [ORDER_STATUS.COMPLETED]: CompletedOrders,
  [ORDER_STATUS.PENDING]: PendingOrders,
};

const titles = [
  { title: strings('app.pending'), key: ORDER_STATUS.PENDING },
  { title: strings('app.completed'), key: ORDER_STATUS.COMPLETED },
];

const Items = () => <SegmentedControl {...{ scenes, titles }} />;

export default Items;

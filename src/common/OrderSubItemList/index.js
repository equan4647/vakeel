import React, { Fragment } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';

import { OrderSubItem } from '..';
import { Text } from '../../components';
import { ProductUtil } from '../../DataUtils';
import styles from './styles';

const OrderSubItemList = ({ data, orderID, allowReview }) => {
  const sortedData = ProductUtil.getCartSortedByVendorName(data);

  return sortedData.map((store, i) => (
    <Fragment key={i}>
      <Text style={styles.storeName} type="semiBold" size="size_17">
        {store?.name}
      </Text>
      <FlatList
        data={store.items}
        style={styles.container}
        bounces={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderSubItem data={item} {...{ orderID, allowReview }} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
      />
    </Fragment>
  ));
};

OrderSubItem.propTypes = {
  data: PropTypes.object,
  orderID: PropTypes.string,
  allowReview: PropTypes.bool,
};

OrderSubItem.defaultProps = {
  allowReview: true,
};

export default OrderSubItemList;

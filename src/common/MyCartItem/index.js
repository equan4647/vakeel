import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonView, Text } from '../../components';
import styles from './styles';
import { CartItem } from '..';
import { BuyingCartUtil } from '../../DataUtils';
import { useDispatch } from 'react-redux';
import { requestDeleteFromBuyingCart } from '../../ducks/buyingCart/actions';
import { Images, Metrics } from '../../theme';

const MyCartItem = props => {
  const { onPressItem, onSelectStore, selectedData, data } = props;

  const dispatch = useDispatch();
  const deleteItem = id =>
    dispatch(requestDeleteFromBuyingCart({ product_attribute_ids: id }));

  const allIds = data.items
    .filter(item => data.store_id === BuyingCartUtil.getStoreId(item))
    .map(item => item.product_attribute_id);

  const selected = allIds.map(i => selectedData.includes(i));

  let isSelected = selected.every(v => v === true);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.listHeading}>{data.name}</Text>

        <ButtonView
          onPress={() => onSelectStore(data.store_id)}
          hitSlop={Metrics.hitSlop}
        >
          <Image
            style={styles.unselectedImage}
            source={
              isSelected
                ? Images.icons.selectedCircle
                : Images.icons.unselectedCircle
            }
          />
        </ButtonView>
      </View>
      {data?.items?.map((item, index) => (
        <CartItem
          key={index.toString()}
          itemData={item}
          onPress={onPressItem}
          isSelected={selectedData.includes(BuyingCartUtil.getAttrId(item))}
          onRemove={deleteItem}
        />
      ))}
    </View>
  );
};

MyCartItem.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.array,
  onPressItem: PropTypes.func,
};

MyCartItem.defaultProps = {
  data: [],
  selectedData: [],
};

export default React.memo(MyCartItem);

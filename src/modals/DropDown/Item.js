import React from 'react';
import PropTypes from 'prop-types';

import { Text, ButtonView, Image } from '../../components';
import { Images, Metrics } from '../../theme';

import styles from './styles';

const Item = props => {
  const { data, selected, onPress, titleKey, customItem } = props;
  return (
    <ButtonView style={styles.itemContainer} onPress={() => onPress(data)}>
      {customItem && customItem(data)}
      {!customItem && (
        <Text lineHeight={Metrics.ratio(16)} size="size_17">
          {typeof titleKey === 'function'
            ? titleKey(data)
            : data?.[titleKey] ?? ''}
        </Text>
      )}

      {selected ? <Image source={Images.icons.selected} /> : null}
    </ButtonView>
  );
};

Item.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  titleKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  customItem: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
Item.defaultProps = {
  data: {},
  selected: false,
};

export default Item;

import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, Image, ButtonView } from '../../components';
import { Images, Metrics } from '../../theme';
import { DataHandler } from '../../utils';
import styles from './styles';

const SelectAttributeProduct = ({ title, data, isColor, onSelect, value }) => {
  // set attribute state
  //const [value, setValue] = React.useState(defaultValue);

  const renderColorView = item => {
    return (
      <View style={styles.colorItem}>
        <View
          style={[
            styles.colorContainer,
            {
              backgroundColor: item.title,
              marginRight: Metrics.ratio(10),
            },
          ]}
        />
        <Text lineHeight={Metrics.ratio(16)} size="size_17">
          {item?.title ?? ''}
        </Text>
      </View>
    );
  };

  // onPressView
  const onPressView = () => {
    const customItem = isColor ? renderColorView : false;

    DataHandler.getDropDownModalRef().show({
      onItemSelected: item => {
        //setValue(item);
        onSelect?.(item);
      },
      data: data,
      idKey: 'id',
      titleKey: 'title',
      selectedItem: value,
      title: title,
      customItem,
      hideSearch: true,
    });
  };

  const renderContent = () => {
    if (isColor) {
      return (
        <View
          style={[styles.colorContainer, { backgroundColor: value?.title }]}
        />
      );
    }
    return (
      <Text size="size_16" type="bold">
        {value?.title ?? ''}
      </Text>
    );
  };

  return (
    <ButtonView
      style={styles.container}
      onPress={onPressView}
      hitSlop={Metrics.hitSlop}
    >
      <Text>{title}</Text>
      <View style={styles.valueContainer}>
        {renderContent()}
        <Image source={Images.icons.arrowDown} style={styles.arrow} />
      </View>
    </ButtonView>
  );
};

SelectAttributeProduct.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  data: PropTypes.array,
  isColor: PropTypes.bool,
  onSelect: PropTypes.func,
};
SelectAttributeProduct.defaultProps = {
  defaultValue: {},
  data: [],
  isColor: false,
};

export default SelectAttributeProduct;

import React from 'react';
import { FlatList } from 'react-native';
import { HorizontalTitle } from '..';

import { ButtonView, Text } from '../../components';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';

const defaultData = [
  { key: '1', value: '$' },
  { key: '2', value: '$$' },
  { key: '3', value: '$$$' },
];

const Item = React.memo(props => {
  const { item, onPress, isSelected, data } = props;
  const style = isSelected
    ? styles.tagItemSelectedContainer
    : styles.tagItemUnselectedContainer;
  const textStyle = isSelected
    ? styles.tagItemSelectedTextStyle
    : styles.tagItemUnselectedTextStyle;
  const width = { width: (Metrics.screenWidth - 40) / data.length - 5 };
  return (
    <ButtonView
      onPress={() => onPress(item.key)}
      style={[styles.itemContainer, style, width]}
      enableClick
    >
      <Text style={textStyle}>{item.value}</Text>
    </ButtonView>
  );
});

const PriceSelection = ({
  data = defaultData,
  onSelection,
  contentContainerStyle,
  title,
  value,
}) => {
  const onPress = item =>
    onSelection?.(
      value.includes(item) ? value.filter(id => id != item) : [...value, item]
    );

  const renderItem = ({ item, index }) => (
    <Item
      {...{ item, onPress, index, data }}
      isSelected={value.includes(item.key)}
    />
  );

  return [
    <HorizontalTitle
      title={title}
      containerStyle={[AppStyles.HorizontalTitle, styles.title]}
    />,
    <FlatList
      {...{ data, renderItem }}
      scrollEnabled={false}
      horizontal
      contentContainerStyle={[
        styles.contentContainerStyle,
        contentContainerStyle,
      ]}
    />,
  ];
};
export default PriceSelection;

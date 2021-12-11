import React from 'react';
import { FlatList, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import FoodOrderSubItem from '../FoodOrderSubItem';
import { AppStyles } from '../../theme';
import { Text } from '../../components';
import styles from './styles';

const Header = ({ name }) => <Text style={styles.header}>{name}</Text>;

const FoodOrderSubItemList = ({ data, name, style, isData }) => (
  <FlatList
    {...{ data }}
    style={[AppStyles.flex1, style]}
    bounces={false}
    ListHeaderComponent={<Header {...{ name }} />}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item }) => <FoodOrderSubItem data={item} {...{ isData }} />}
  />
);

FoodOrderSubItemList.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
  style: ViewPropTypes.style,
  isData: PropTypes.bool,
};

FoodOrderSubItemList.defaultProps = { data: [], isData: true };

export default FoodOrderSubItemList;

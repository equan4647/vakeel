import { FlatList, StyleSheet, View, ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, EmptyViewCarousel } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { BuyingItem } from '..';
import styles from './styles';

import { productSelectors } from '../../ducks/products';

const BuyingCarousel = props => {
  const {
    headerTitle,
    rightTitle,
    rightPress,
    style,
    contentContainerStyle,
    identifier,
    data,
    titleTextStyle,
    headerStyle,
  } = props;

  const productsList = useSelector(
    productSelectors.getProductsList(identifier)
  );

  const _data = data ?? productsList ?? [];
  const customPropsTitle =
    _data.length === 0 ? {} : { onPress: rightPress, rightTitle: rightTitle };

  return (
    <>
      {headerTitle ? (
        <HorizontalTitle
          title={headerTitle}
          leftTextStyle={StyleSheet.flatten([
            AppStyles.subHeadLeftText,
            titleTextStyle,
          ])}
          containerStyle={[styles.headingContainer, headerStyle]}
          {...customPropsTitle}
        />
      ) : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        style={[styles.listContainer, style]}
        data={_data}
        //data={dataLength ? _data.slice(0, dataLength) : _data}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => <BuyingItem {...{ item }} />}
        horizontal
        directionalLockEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <EmptyViewCarousel />}
      />
    </>
  );
};

BuyingCarousel.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  identifier: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  headerTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  rightPress: PropTypes.func,
  data: PropTypes.array,
  titleTextStyle: ViewPropTypes.style,
};
BuyingCarousel.defaultProps = {
  headerTitle: '',
  rightTitle: strings('app.see_all'),
  rightPress: undefined,
  titleTextStyle: {},
};

export default React.memo(BuyingCarousel, (prevProps, nextProps) => {
  return prevProps.identifier === nextProps.identifier;
});

import { Platform, StyleSheet } from 'react-native';
import React from 'react';

import { Images, Metrics, Fonts, Colors } from '../../theme';
import { SEARCH_INPUT_TYPE } from '../../config/Constants';
import { Text, ButtonView, Image } from '../../components';

export default ({ data, type, titleKey, onPress, itemStyle }) => {
  return (
    <ButtonView
      hitSlop={Metrics.hitSlop}
      style={[styles.container, itemStyle]}
      onPress={() => onPress(data)}
    >
      {type !== SEARCH_INPUT_TYPE.HISTORY ? (
        <Image
          resizeMode="contain"
          source={
            type === SEARCH_INPUT_TYPE.LOCATION
              ? Images.icons.location
              : Images.icons.search
          }
          style={
            type === SEARCH_INPUT_TYPE.LOCATION
              ? styles.locationIconStyle
              : styles.searchIconStyle
          }
        />
      ) : null}
      <Text style={styles.itemTextStyle}>{data[titleKey]}</Text>
    </ButtonView>
  );
};

/*
{type === SEARCH_INPUT_TYPE.HISTORY ? <Text>{category}</Text> : null}
const { category } = data;
*/

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(23),
    //alignItems: 'center',
  },
  locationIconStyle: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(14),
    tintColor: Colors.black,
    marginRight: Metrics.ratio(10),
    marginTop: Metrics.ratio(3),
  },
  searchIconStyle: {
    width: Metrics.ratio(13),
    height: Metrics.ratio(13),
    tintColor: Colors.black,
    marginRight: Metrics.ratio(10),
    marginTop: Metrics.ratio(3),
  },
  itemTextStyle: {
    fontSize: Fonts.size.size_16,
    bottom: Platform.select({
      android: Metrics.ratio(2),
      ios: Metrics.ratio(1),
    }),
    flex: 1,
  },
});

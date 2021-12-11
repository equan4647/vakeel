import { Platform, StyleSheet } from 'react-native';

import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    paddingHorizontal: Metrics.ratio(12),
    height: Metrics.ratio(34),
    borderRadius: Metrics.ratio(10),
    borderWidth: Metrics.ratio(1),
    marginHorizontal: Metrics.ratio(2.5),
    marginBottom: Metrics.ratio(10),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  tagItemSelectedContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagItemUnselectedContainer: {
    borderColor: Colors.lightBlueGrey,
  },
  tagItemSelectedTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_15,
    color: Colors.white,
    marginBottom: Platform.select({ android: Metrics.ratio(2) }),
  },
  tagItemUnselectedTextStyle: {
    fontSize: Fonts.size.size_15,
    marginBottom: Platform.select({ android: Metrics.ratio(2) }),

  },
});

import { StyleSheet } from 'react-native';

import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: Metrics.ratio(20),
    paddingHorizontal: Metrics.ratio(20),
    borderRadius: Metrics.ratio(25),
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(25),
  },
  title: {
    color: Colors.white,
    fontSize: Fonts.size.size_14,
    marginBottom: Metrics.ratio(2),
  },
  amount: {
    color: Colors.white,
    fontSize: Fonts.size.size_44,
    fontFamily: Fonts.type.bold,
  },
  deductAmount: {
    color: Colors.primary,
    fontSize: Fonts.size.size_30,
    fontFamily: Fonts.type.bold,
  },
});

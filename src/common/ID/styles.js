import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  idText: {
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.ratio(6),
    marginRight: Metrics.smallMargin,
  },
  marginLeftMedium: { marginLeft: Metrics.mediumMargin },
});

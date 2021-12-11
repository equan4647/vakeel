import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  text: {
    marginTop: Metrics.ratio(30),
    width: '70%',
    lineHeight: Metrics.ratio(47),
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_34,
  },
  button: { marginBottom: Metrics.ratio(24) },
  vehicleItem: { marginTop: Metrics.smallMargin },
});

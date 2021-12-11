import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  textInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.ratio(4),
  },
  separatorTextStyle: {
    fontSize: Fonts.size.size_15,
    marginHorizontal: Metrics.ratio(6),
  },
  title: { marginBottom: Metrics.ratio(10) },
});

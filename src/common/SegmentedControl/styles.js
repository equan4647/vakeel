import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  selectedTextStyle: {
    fontSize: Fonts.size.size_13,
    fontFamily: Fonts.type.bold,
  },
  textStyle: {
    fontSize: Fonts.size.size_13,
    fontFamily: Fonts.type.regular,
  },
  main: {
    borderWidth: 1,
    borderColor: Colors.lightBlueGrey,
    borderRadius: Metrics.ratio(10),
  },
  tabbarContainer: {
    padding: Metrics.mediumMargin,
    backgroundColor: Colors.white,
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
});

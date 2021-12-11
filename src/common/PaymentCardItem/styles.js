import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    marginLeft: Metrics.ratio(9),
    flex: 1,
  },
  bottomContainer: {
    marginTop: Metrics.smallMargin,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
  },
});

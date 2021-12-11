import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
export default StyleSheet.create({
  nameContainer: {
    marginLeft: Metrics.ratio(15),
    flex: 1,
  },
  nameTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  memberSince: { lineHeight: 22 },
  rating: { marginTop: Metrics.ratio(6) },
  avatar: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(30),
    backgroundColor: Colors.whiteFour,
  },
});

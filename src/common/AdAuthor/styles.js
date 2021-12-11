import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../theme';
export default StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingTop: Metrics.ratio(25),
    marginTop: Metrics.ratio(25),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  nameContainer: {
    marginLeft: Metrics.ratio(15),
    flex: 1,
  },
  nameTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  userViewContainer: { flexDirection: 'row', alignItems: 'center' },
  arrow: { width: Metrics.ratio(7), height: Metrics.ratio(11) },
  title: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
    marginBottom: Metrics.ratio(16),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

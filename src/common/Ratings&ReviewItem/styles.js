import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(25),
    borderColor: Colors.lightBlueGrey,
    borderWidth: Metrics.ratio(1),
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.ratio(13),
    backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.smallMargin,
  },
  titleContainer: {
    marginLeft: Metrics.smallMargin,
    flex: 1,
  },
  avatar: {
    height: Metrics.ratio(44),
    width: Metrics.ratio(44),
    borderRadius: Metrics.ratio(22),
    borderWidth: 0,
  },
  rating: { marginTop: Metrics.ratio(4) },
  review: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(24),
    fontFamily: Fonts.type.regular,
  },
  seeMore: {
    color: Colors.black,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_16,
  },
});

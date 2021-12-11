import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  readMoreContainer: {
    position: 'absolute',
    opacity: 0,
  },
  textContainer: {
    flexDirection: 'row',
    marginHorizontal: Metrics.mediumMargin,
    marginBottom: Metrics.mediumMargin,
  },
  textStyle: {
    flex: 1,
  },
  moreContainer: {
    justifyContent: 'flex-end',
    paddingLeft: Metrics.ratio(4),
  },
  readMore: {
    marginTop: Metrics.ratio(10),
    color: Colors.black,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_16,
  },
  review: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(24),
    fontFamily: Fonts.type.regular,
    marginRight: Metrics.ratio(20),
  },
});

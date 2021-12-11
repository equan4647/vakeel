import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(12),
    borderColor: Colors.lightBlueGrey,
    flexDirection: 'row',
  },
  rightEdit: { marginTop: Metrics.ratio(3) },
  withoutBorder: { borderWidth: 0 },
  withBorder: {
    paddingHorizontal: Metrics.ratio(14),
    paddingVertical: Metrics.baseMargin,
    borderWidth: Metrics.ratio(1),
  },
  imagesContainer: {
    alignItems: 'center',
    width: Metrics.ratio(22),
    marginRight: Metrics.bigSmallMargin,
  },
  imageSeparator: {
    width: Metrics.ratio(1),
    backgroundColor: Colors.lightBlueGrey,
    flex: 1,
    marginVertical: Metrics.ratio(5),
  },
  input: {
    fontFamily: Fonts.type.semiBold,
    lineHeight: Metrics.ratio(18),
    color: Colors.black,
    maxWidth: '95%',
  },
  separator: { marginVertical: Metrics.bigSmallMargin },
});

import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: { marginBottom: Metrics.ratio(30), flexDirection: 'row' },
  image: { width: Metrics.ratio(44), height: Metrics.ratio(44) },
  detailsContainer: { flex: 1, marginLeft: Metrics.ratio(10) },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countContainer: {
    backgroundColor: Colors.frogGreen,
    width: Metrics.ratio(18),
    height: Metrics.ratio(18),
    borderRadius: Metrics.ratio(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: Fonts.size.size_12,
    fontFamily: Fonts.type.semiBold,
    color: Colors.white,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(6),
  },
  name: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
    maxWidth: '70%',
  },
});

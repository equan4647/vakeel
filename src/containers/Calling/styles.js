import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  userDetail: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  username: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_30,
    marginTop: Metrics.ratio(18),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Metrics.ratio(20),
  },
  userImage: {
    width: Metrics.ratio(113),
    height: Metrics.ratio(113),
    borderRadius: Metrics.ratio(113 / 2),
  },
});

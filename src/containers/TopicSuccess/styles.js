import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  topic: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.type.semiBold,
    marginBottom: Metrics.ratio(3),
    textAlign: 'center',
  },
  topicNameContainer: {
    marginTop: Metrics.ratio(11),
    paddingTop: Metrics.ratio(13),
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

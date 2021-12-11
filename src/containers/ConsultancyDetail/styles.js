import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  topic: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.type.semiBold,
    marginBottom: Metrics.ratio(3),
  },
  topicNameContainer: {
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    marginTop: Metrics.ratio(11),
    paddingTop: Metrics.ratio(13),
  },
  agendaText: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(24),
  },
  separator: {
    marginVertical: Metrics.ratio(14),
    // backgroundColor: 'red',
  },
  costType: {
    color: Colors.primary,
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.semiBold,
  },
  amountSeparator: { marginVertical: Metrics.baseMargin },
  userView: {
    paddingTop: Metrics.ratio(15),
  },
  content: { paddingVertical: Metrics.baseMargin },
  consultancyText: {
    fontSize: Fonts.size.size_16,
  },
  amountRow: {
    marginTop: 0,
  },
  consultancyType: {
    // backgroundColor: 'red',
    paddingBottom: Metrics.ratio(12),
  },
});

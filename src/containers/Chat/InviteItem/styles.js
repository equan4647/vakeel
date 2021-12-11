import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    borderRadius: Metrics.ratio(18),
    paddingHorizontal: Metrics.mediumMargin,
    paddingBottom: Metrics.mediumMargin,
    paddingTop: Metrics.baseMargin,
    width: Metrics.scale(281),
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  topicName: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_15,
    marginBottom: Metrics.ratio(3),
  },
  consultancyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.ratio(45),
  },
  consultancyIcon: { marginRight: Metrics.smallMargin },
  cost: { marginBottom: -Metrics.ratio(3) },
});

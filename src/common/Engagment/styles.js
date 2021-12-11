import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  engagmentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagementTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    flex: 1,
  },
  engamentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(18.5),
  },
  engamentDetail: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: Metrics.ratio(15),
    paddingBottom: Metrics.ratio(18.4),
    borderRadius: Metrics.ratio(25),
    borderColor: Colors.lightBlueGrey,
  },
  engamentDetailTitle: {
    marginBottom: Metrics.ratio(5),
  },
  seperato2: {
    marginLeft: 10,
  },
  engamentDetailTitle: {
    marginBottom: Metrics.ratio(5),
  },
  loader: { marginTop: Metrics.ratio(20) },
  errorView: { marginTop: Metrics.ratio(20) },
});

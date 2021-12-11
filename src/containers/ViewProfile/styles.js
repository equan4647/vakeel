import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {},
  textDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageStyle: {
    marginRight: Metrics.ratio(7),
  },
  separatorStyle: {},
  listStyle: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.ratio(30),
  },
  adsContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  content: {
    marginHorizontal: Metrics.mediumMargin,
    marginBottom: Metrics.mediumMargin,
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  listContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  emptyViewContainer: { marginTop: Metrics.ratio(18) },
});

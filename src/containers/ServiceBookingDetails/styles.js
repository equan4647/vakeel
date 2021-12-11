import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  serviceIdContainer: {
    marginTop: Metrics.ratio(15),
  },
  serviceId: {
    fontSize: Fonts.size.size_16,
    flex: 1,
  },

  boominUser: {
    paddingTop: Metrics.ratio(16),
  },
  address: {
    paddingTop: Metrics.ratio(15),
    marginTop: Metrics.ratio(19),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  serviceName: {
    fontSize: Fonts.size.size_20,
    marginBottom: Metrics.ratio(2),
  },
});

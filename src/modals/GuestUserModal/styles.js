import { StyleSheet } from 'react-native';

import { Metrics } from '../../theme';

export default StyleSheet.create({
  errorView: {
    flex: 0,
    width: Metrics.screenWidth - 80,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  block: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: Metrics.screenWidth - 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 30,
  },
  blockText: { lineHeight: 24, textAlign: 'center', marginTop: 8 },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components';
import { CONTENT_TYPE } from '../../config/Constants';
import { Metrics } from '../../theme';
import { NavigationService } from '../../utils';

import { strings } from '../../utils/i18n';
import styles from './styles';

const Link = React.memo(props => {
  const { title, identifier } = props;
  return (
    <Text
      lineHeight={20}
      type="semiBold"
      textAlign="center"
      hitSlop={Metrics.hitSlop}
      onPress={() =>
        NavigationService.navigate('Content', { title, identifier })
      }
    >
      {props.children}
    </Text>
  );
});

const PrivacyAndTermsLink = ({ style }) => {
  return (
    <Text
      lineHeight={20}
      textAlign="center"
      style={StyleSheet.flatten([styles.container, style])}
    >
      {'By creating account or logging in you agree to our '}
      {'\n'}
      <Link title={strings('app.t&c')} identifier={CONTENT_TYPE.TERMS}>
        {strings('app.t&c')}
      </Link>
      {' and '}
      <Link
        title={strings('app.privacy_policy')}
        identifier={CONTENT_TYPE.PRIVACY}
      >
        {strings('app.privacy_policy')}
      </Link>
    </Text>
  );
};
export default React.memo(PrivacyAndTermsLink);

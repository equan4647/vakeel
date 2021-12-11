import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import React from 'react';

import { getNotificationCount } from '../../ducks/notifications/selectors';
import { MODULE, NOTIFICATIONS } from '../../config/Constants';
import { AppUtil, NavigationService } from '../../utils';
import { ButtonView } from '../../components';
import { Images, Metrics } from '../../theme';
import styles from './styles';
import { Badge } from '..';

const NotificationIcon = ({ module }) => {
  const getIdentifier = () => {
    let identifier;
    if (module === MODULE.CLASSIFIED) {
      identifier = NOTIFICATIONS.CLASSIFIED;
    } else if (module === MODULE.BUYING) {
      identifier = NOTIFICATIONS.MARKETPLACE;
    } else if (module === MODULE.SERVICE) {
      identifier = NOTIFICATIONS.SERVICE;
    } else if (module === MODULE.FOOD) {
      identifier = NOTIFICATIONS.RESTAURANT;
    } else if (module === MODULE.ADVERTISMENT) {
      identifier = NOTIFICATIONS.ADVERTISMENT;
    } else {
      identifier = NOTIFICATIONS.GENERAL;
    }
    return identifier;
  };

  const count = useSelector(getNotificationCount(getIdentifier()));

  return (
    <ButtonView
      onPress={() => {
        NavigationService.navigate('Notifications', {
          identifier: getIdentifier(),
        });
      }}
      hitSlop={Metrics.hitSlop}
    >
      {count ? (
        <Badge count={count} style={styles.badge} showActualCount={false} />
      ) : null}
      <Image source={Images.icons.notificationBell} />
    </ButtonView>
  );
};

// NotificationIcon.propTypes = {
//   count: PropTypes.number,
// };
// NotificationIcon.defaultProps = { count: 2 };

export default NotificationIcon;

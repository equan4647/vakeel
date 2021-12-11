import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, Switch } from '../../components';
import styles from './styles';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import Item from './Item';
import { getUser } from '../../ducks/auth/selectors';
import { requestUpdateProfile } from '../../ducks/auth/actions';
import { UserUtil } from '../../DataUtils';
import { useUserRole } from '../../utils/CustomHooks';

const ListHeader = () => {
  const dispatch = useDispatch(),
    user = useSelector(getUser),
    isGuest = useUserRole();

  const onChange = notifications =>
    dispatch(
      requestUpdateProfile({
        send_notification: notifications ? 1 : 0,
        device_token: user?.device_token ?? '',
      })
    );

  const onPressPreference = () => {
    NavigationService.navigate('SideMenuPrefrence');
  };

  return (
    <>
      <Item
        name={strings('app.side_menu_preference')}
        onPress={onPressPreference}
      />

      {!isGuest && (
        <View style={styles.switchItem}>
          <Text size="size_16">{strings('app.notifications')}</Text>
          <Switch
            {...{ onChange }}
            value={UserUtil.notificationsEnabled(user)}
          />
        </View>
      )}
    </>
  );
};
export default React.memo(ListHeader);

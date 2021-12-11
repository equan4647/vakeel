import React from 'react';
import { useDispatch } from 'react-redux';

import { AppUtil, NavigationService } from '../../utils';
import { Loader } from '../../components';
import { authActions } from '../../ducks/auth';
import { strings } from '../../utils/i18n';
import ListItem from './Item';
import styles from './styles';
import { useUserRole } from '../../utils/CustomHooks';

const Footer = () => {
  const dispatch = useDispatch(),
    isGuest = useUserRole();

  const onPress = () => {
    NavigationService.closeDrawer();
    dispatch(authActions.requestLogout());
  };

  return (
    <>
      <ListItem
        name={strings('app.become_a_bringer')}
        textStyle={styles.primary}
        onPress={AppUtil.openStores}
      />
      <ListItem
        name={strings('app.create_boomin_Account')}
        textStyle={styles.primary}
        onPress={AppUtil.openStores}
      />
      {!isGuest && (
        <ListItem
          name={strings('app.logout')}
          textStyle={styles.secondary}
          {...{ onPress }}
        />
      )}
      <Loader type="LOGOUT" />
    </>
  );
};

export default React.memo(Footer);

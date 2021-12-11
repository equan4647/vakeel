import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonView, Text } from '../../components';
import { loginGuest } from '../../ducks/userRoles/actions';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const LoginGuest = () => {
  const dispatch = useDispatch();

  const loginAsGuest = () => {
    dispatch(loginGuest);
    NavigationService.reset('SideMenuPrefrence');
  };

  return (
    <ButtonView onPress={loginAsGuest} style={styles.container}>
      <Text size="size_16" lineHeight={20} type="semiBold">
        {strings('app.skip')}
      </Text>
    </ButtonView>
  );
};

export default LoginGuest;

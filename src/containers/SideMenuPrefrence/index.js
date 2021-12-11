import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, Image, ButtonView } from '../../components';
import { DRAWER_PREFERENCE } from '../../config/Constants';
import { Images, Colors, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppButton } from '../../common';
import styles from './styles';

import { drawerPreference } from '../../ducks/drawerPreference/actions';
import { getDrawerPreference } from '../../ducks/drawerPreference/selectors';

const SideMenuPrefrence = () => {
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        Util.setStatusBarStyle('light-content');
      }, 200);
      return () => {
        Util.setStatusBarStyle('dark-content');
      };
    }, [])
  );

  const preferenceSelected =
    useSelector(getDrawerPreference) ?? DRAWER_PREFERENCE.LEFT;
  const [preference, setPreference] = useState(preferenceSelected);
  const dispatch = useDispatch();

  const onRightPress = () => setPreference(DRAWER_PREFERENCE.RIGHT);

  const onLeftPress = () => setPreference(DRAWER_PREFERENCE.LEFT);

  const onContinue = () => {
    dispatch(drawerPreference(preference));
    NavigationService.reset('Main');
  };
  const getSelectionColor = (selection, type) => {
    if (type === 'image') {
      return {
        tintColor: preference === selection ? Colors.leafyGreen : Colors.white,
      };
    } else if (type === 'text') {
      return {
        color: preference === selection ? Colors.leafyGreen : Colors.white,
      };
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{strings('app.side_menu_perference')}</Text>
        <Text style={styles.description}>
          {strings('app.side_menu_perference_description')}
        </Text>
      </View>

      <View style={styles.selectionContainer}>
        <ButtonView
          onPress={onLeftPress}
          style={styles.directionContainer}
          hitSlop={Metrics.hitSlop}
        >
          <Image
            style={getSelectionColor(DRAWER_PREFERENCE.LEFT, 'image')}
            source={Images.icons.drawerRight}
          />
          <Text
            style={[
              styles.directionTextRight,
              getSelectionColor(DRAWER_PREFERENCE.LEFT, 'text'),
            ]}
          >
            {strings('app.left')}
          </Text>
        </ButtonView>

        <ButtonView
          onPress={onRightPress}
          style={styles.directionContainer}
          hitSlop={Metrics.hitSlop}
        >
          <Text
            style={[
              styles.directionTextLeft,
              getSelectionColor(DRAWER_PREFERENCE.RIGHT, 'text'),
            ]}
          >
            {strings('app.right')}
          </Text>
          <Image
            style={[getSelectionColor(DRAWER_PREFERENCE.RIGHT, 'image')]}
            source={Images.icons.drawerLeft}
          />
        </ButtonView>
      </View>
      <AppButton title={strings('app.continue')} onPress={onContinue} />
    </View>
  );
};

export default SideMenuPrefrence;

import React from 'react';
import { Image } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import { Images } from '../../theme';
import FontMenuOptions from './FontOptions';
import styles from './styles';
// import styles from './styles';

const { SlideInMenu } = renderers;

const FontSelector = ({ onSelect }) => {
  return (
    <Menu renderer={SlideInMenu} {...{ onSelect }}>
      <MenuTrigger>
        <Image source={Images.toolbar.fontFamily} resizeMode="contain" />
      </MenuTrigger>

      <MenuOptions optionsContainerStyle={styles.optionsContainer}>
        <FontMenuOptions />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(FontSelector);

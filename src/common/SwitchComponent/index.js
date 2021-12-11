import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import styles from './styles';
import { Util } from '../../utils';
import { View, ViewPropTypes } from 'react-native';
import { Text, Switch } from '../../components';

const SwitchComponent = props => {
  const { name: _name, title, control, style } = props;
  const name = useMemo(() => _name ?? Util.createSlug(title), [title, _name]);

  return (
    <Controller
      {...{ control, name }}
      render={({ onChange, value }) => (
        <View style={[styles.container, style]}>
          <Text>{title}</Text>
          <Switch {...{ onChange, value }} />
        </View>
      )}
    />
  );
};

SwitchComponent.propTypes = {
  style: ViewPropTypes.style,
};

SwitchComponent.defaultProps = {};

export default SwitchComponent;

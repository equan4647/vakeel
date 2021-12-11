import React, {
  useState,
  Fragment,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { View, ActivityIndicator } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import styles from './styles';
import { Colors } from '../../theme';
import { Text } from '../../components';
import { AppButton } from '..';
import { useSelector } from 'react-redux';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const Content = memo(({ title, text }) => (
  <>
    <Text style={styles.title}>{title}</Text>
    <Text numberOfLines={2} style={styles.text}>
      {text}
    </Text>
  </>
));

const BlurScreen = (props, forwardedRef) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  useBackHandler(() => {
    if (visible) {
      return true;
    }
    return false;
  });

  const hide = module => {
    if (module === data?.module) {
      setVisible(false);
    }
  };

  useImperativeHandle(forwardedRef, () => ({
    show: _data => {
      setData(_data);
      setImmediate(() => setVisible(true));
    },
    hide,
  }));

  const { title, text, onPressButton, buttonTitle, requestFlag } = data;
  const flag = useSelector(requestFlagSelectors.getRequestFlag(requestFlag));
  const _onPressButton = () => {
    onPressButton();
  };

  return visible ? (
    <Fragment>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={100}
        blurRadius={10}
      />

      <View style={styles.absolute}>
        <View style={styles.contentContainer}>
          <Content {...{ title, text }} />

          <ActivityIndicator color={Colors.white} size="large" />
        </View>

        <View style={styles.buttonConrainer}>
          {buttonTitle ? (
            <AppButton
              title={buttonTitle}
              onPress={_onPressButton}
              disabled={flag?.loading}
            />
          ) : null}
        </View>
      </View>
    </Fragment>
  ) : null;
};

export default forwardRef(BlurScreen);

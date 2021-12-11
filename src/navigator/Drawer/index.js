import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import { getDrawerPreference } from '../../ducks/drawerPreference/selectors';
import { NavigationService } from '../../utils';
import { DrawerContent } from '../../common';
import styles from '../styles';
import Tabs from '../Tabs';

const Drawer = createDrawerNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Tabs />
    </Animated.View>
  );
};

const CustomDrawer = ({ setProgress, ...props }) => {
  React.useEffect(() => {
    setProgress(props.progress);
  }, [props.progress]);

  return <DrawerContent {...props} />;
};

export default ({ navigation }) => {
  NavigationService.hideHeader(navigation);

  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const preference = useSelector(getDrawerPreference);
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.87],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View style={styles.drawerContainer}>
      <Drawer.Navigator
        // hideStatusBar
        drawerPosition={preference}
        edgeWidth={50}
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        drawerContentOptions={{}}
        sceneContainerStyle={styles.sceneContainerDrawer}
        drawerContent={props => {
          return <CustomDrawer setProgress={setProgress} {...props} />;
        }}
      >
        <Drawer.Screen name="Screens">
          {props => (
            <>
              <View style={styles.drawerShadow} />
              <Screens {...props} style={animatedStyle} />
            </>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

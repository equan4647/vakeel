import React from 'react';
import { View } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { TabView, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import { Colors, Metrics } from '../../theme';
import styles from './styles';

const SegmentedControl = props => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(props.titles);

  const getSwitchOptions = () =>
    props.titles.map(option => ({ label: option.title, value: option.key }));

  const renderScene = SceneMap(props.scenes);
  const renderTabBar = _props => (
    <View style={styles.tabbarContainer}>
      <SwitchSelector
        {..._props}
        initial={0}
        onPress={value => _props.jumpTo(value)}
        textColor={Colors.black}
        selectedColor={Colors.white}
        height={Metrics.ratio(29)}
        borderRadius={Metrics.ratio(10)}
        buttonColor={Colors.primary}
        borderColor={Colors.primary}
        backgroundColor={Colors.white}
        selectedTextStyle={styles.selectedTextStyle}
        textStyle={styles.textStyle}
        style={styles.main}
        hasPadding={false}
        options={getSwitchOptions()}
      />
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={styles.initialLayout}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
};

SegmentedControl.propTypes = {
  scenes: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
};

export default SegmentedControl;

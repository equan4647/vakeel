import React from 'react';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from 'react-native-tab-view';

import { ScrollableTabView } from '../../common';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import ItemsOrder from './ItemsOrder';
import FoodOrder from './FoodOrder';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';

const MyOrders = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: strings('app.my_orders') });
  }, [navigation]);

  return (
    <ScrollableTabView
      isUnderlineFull
      containerStyle={AppStyles.flex}
      prerenderingSiblingsNumber={2}
      customUnderLineWidth={Metrics.screenWidth / 2 - 60}
    >
      <ItemsOrder tabLabel={strings('app.itemsCaps')} />
      <FoodOrder tabLabel={strings('app.foods')} />
    </ScrollableTabView>
  );
  /*
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: strings('app.itemsCaps') },
    { key: 'second', title: strings('app.foods') },
  ]);

  const renderScene = SceneMap({
    first: ItemsOrder,
    second: FoodOrder,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabbarStyle}
      renderLabel={({ route }) => <Text size="size_16">{route.title}</Text>}
      renderIndicator={_props => (
        <TabBarIndicator {..._props} style={styles.tabbarIndicator} />
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={styles.initialLayout}
      renderTabBar={renderTabBar}
    />
  );
  */
};

export default MyOrders;

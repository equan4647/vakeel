import React from 'react';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from 'react-native-tab-view';

import { SERVICE_ITEM_TYPE } from '../../config/Constants';
import { ServiceHistoryList } from '../../common';
import { NavigationService } from '../../utils';
import { serviceHistory } from '../../data';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import styles from './styles';

const ServiceHistory = ({ navigation }) => {
  NavigationService.setHeader(navigation, strings('app.service_history'));

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: strings('app.pending') },
    { key: 'second', title: strings('app.completed') },
    { key: 'third', title: strings('app.cancelled') },
  ]);

  const renderScene = SceneMap({
    first: () => (
      <ServiceHistoryList
        data={serviceHistory.pending}
        type={SERVICE_ITEM_TYPE.PENDING}
      />
    ),
    second: () => (
      <ServiceHistoryList
        data={serviceHistory.completed}
        type={SERVICE_ITEM_TYPE.COMPLETED}
      />
    ),
    third: () => (
      <ServiceHistoryList
        data={serviceHistory.cancelled}
        type={SERVICE_ITEM_TYPE.CANCELLED}
      />
    ),
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
};

export default ServiceHistory;

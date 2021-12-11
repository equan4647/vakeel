import React from 'react';

import { AdsList } from '../../common';
import { transitionSpecDrawerStack } from '../../navigator/config';
import { strings } from '../../utils/i18n';

const MyClassifieds = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: strings('app.my_classifieds'),
      ...transitionSpecDrawerStack,
    });
  }, [navigation]);

  return <AdsList />;
};
export default MyClassifieds;

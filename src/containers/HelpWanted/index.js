import React from 'react';

import { SimpleListing } from '../../common';
import { CATEGORY_SCREEN_PARAMS } from '../../config/Constants';
import { NavigationService, Util } from '../../utils';
import helpWanted from '../../data/helpWanted';
import { strings } from '../../utils/i18n';

const HelpWanted = ({ navigation }) => {
  NavigationService.setTitle(navigation, strings('app.help_wanted'));
  return (
    <SimpleListing
      data={helpWanted}
      onPressItem={_keyword =>
        Util.navigateToSearchResult(
          _keyword,
          ...Object.values(CATEGORY_SCREEN_PARAMS.ADD_CLASSIFIED),
          { isService: true }
        )
      }
    />
  );
};
export default HelpWanted;

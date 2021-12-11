import React from 'react';
import PropTypes from 'prop-types';

import { EmptyView as EmptyViewComponent } from '../../../common';
import styles from '../styles';
import { strings } from '../../../utils/i18n';

const EmptyView = ({ title }) => (
  <EmptyViewComponent
    containerStyle={styles.emptyViewContainer}
    withoutImage
    text={strings('app.empty_text_view_profile', {
      key: 'info_type',
      value: title,
    })}
  />
);

EmptyView.propTypes = {
  title: PropTypes.string,
};
EmptyView.defaultProps = {
  title: '',
};

export default React.memo(EmptyView);
